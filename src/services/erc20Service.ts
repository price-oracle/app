import { ethers } from 'ethers';
import { useProvider, useSigner, useAccount } from 'wagmi';

import IERC20 from '~/abis/IERC20.json';
import { TxService } from '~/services';
import { Address } from '~/types/Blockchain';
import { humanize } from '~/utils/format';

export class ERC20Service {
  txService = new TxService();
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
}
