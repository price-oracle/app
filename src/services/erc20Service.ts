import { ethers } from 'ethers';
import { useProvider, useSigner, useAccount } from 'wagmi';
import { Contract } from 'ethers-multicall';

import IERC20 from '~/abis/IERC20.json';
import { humanize } from '~/utils/format';
import { MultiCallService, TxService } from '~/services';
import { Token, Address } from '~/types';

export class ERC20Service {
  txService = new TxService();
  multiCallService = new MultiCallService();
  provider = useProvider();
  account = useAccount();
  signer = useSigner();

  async fetchTokenSymbol(erc20Address: Address) {
    const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.provider);

    return await erc20Contract.callStatic.symbol();
  }

  async fetchTokenDecimals(erc20Address: Address) {
    const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.provider);

    return await erc20Contract.callStatic.decimals();
  }

  async fetchTokenBalance(erc20Address: Address, userAddress: Address | undefined = this.account.address) {
    const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.provider);

    return await erc20Contract.callStatic.balanceOf(userAddress);
  }

  async fetchTokenAllowance(erc20Address: Address, approveContract: Address, user: Address) {
    const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.provider);

    return await erc20Contract.allowance(user, approveContract);
  }

  async approveTokenAmount(erc20Address: Address, approveContract: Address, amount: string) {
    if (this.signer?.data) {
      const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.signer?.data);

      // TODO: maybe do it as multicall after blockchain interactions refactor
      const symbol = await this.fetchTokenSymbol(erc20Address);
      const decimals = await this.fetchTokenDecimals(erc20Address);

      const successMessage = `Succesfully approved ${humanize('amount', amount, decimals, 2)} ${symbol}`;
      const errorMessage = `Failed to approve ${humanize('amount', amount, decimals, 2)} ${symbol}`;

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
