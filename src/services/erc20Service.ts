import { Provider } from '@wagmi/core';
import { BigNumber, ethers, Signer } from 'ethers';
import { Contract } from 'ethers-multicall';

import IERC20 from '~/abis/IERC20.json';
import { MultiCallService, TxService } from '~/services';
import { Address, Token } from '~/types';
import { humanize } from '~/utils/format';

export class ERC20Service {
  signer: Signer | undefined;
  address: Address | undefined;
  multiCallService: MultiCallService;
  txService: TxService;
  provider: Provider;

  constructor(
    address: Address | undefined,
    signer: Signer | undefined,
    txService: TxService,
    multiCallService: MultiCallService,
    provider: Provider
  ) {
    this.address = address;
    this.signer = signer;
    this.txService = txService;
    this.multiCallService = multiCallService;
    this.provider = provider;
  }

  async fetchTokenSymbol(erc20Address: Address) {
    const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.provider);

    return await erc20Contract.callStatic.symbol();
  }

  async fetchTokenDecimals(erc20Address: Address) {
    const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.provider);

    return await erc20Contract.callStatic.decimals();
  }

  async fetchTokenBalance(erc20Address: Address, userAddress: Address | undefined = this.address) {
    const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.provider);

    return await erc20Contract.callStatic.balanceOf(userAddress);
  }

  async fetchTokenAllowance(erc20Address: Address, approveContract: Address, user: Address) {
    const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.provider);

    return await erc20Contract.allowance(user, approveContract);
  }

  async approveTokenAmount(erc20Address: Address, approveContract: Address, amount: BigNumber) {
    if (this.signer) {
      const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.signer);
      const tokenData = await this.fetchTokenData(erc20Address);

      const successMessage = `Succesfully approved ${humanize('amount', amount.toString(), tokenData.decimals, 2)} ${
        tokenData.symbol
      }`;
      const errorMessage = `Failed to approve ${humanize('amount', amount.toString(), tokenData.decimals, 2)} ${
        tokenData.symbol
      }`;

      return this.txService.handleTx(erc20Contract.approve(approveContract, amount), successMessage, errorMessage);
    }
  }

  async fetchTokenData(erc20Address: Address): Promise<Token> {
    const erc20Contract = new Contract(erc20Address, IERC20);

    const checkSummedAddress = ethers.utils.getAddress(erc20Address);
    const symbolCall = erc20Contract.symbol();
    const nameCall = erc20Contract.name();
    const decimalsCall = erc20Contract.decimals();

    const [symbol, name, decimals] = await this.multiCallService.multicall([symbolCall, nameCall, decimalsCall]);

    return {
      address: checkSummedAddress,
      name: name,
      symbol: symbol,
      decimals: decimals,
      logoURI: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${checkSummedAddress}/logo.png`,
    };
  }
}
