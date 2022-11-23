import { ethers, utils } from 'ethers';
import { useProvider, useSigner, useAccount } from 'wagmi';

import IERC20 from '~/abis/IERC20.json';
import { TxService } from '~/services';
import { Address } from '~/types/Blockchain';

export class ERC20Service {
  txService = new TxService();
  provider = useProvider();
  account = useAccount();
  signer = useSigner();

  async fetchTokenSymbol(erc20Address: Address) {
    const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.provider);

    return await erc20Contract.callStatic.symbol();
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
      const symbol = await this.fetchTokenSymbol(erc20Address);
      const successMessage = `Succesfully approved ${utils.formatEther(amount)} ${symbol}`;
      const errorMessage = `Failed to approve ${utils.formatEther(amount)} ${symbol}`;

      return this.txService.handleTx(erc20Contract.approve(approveContract, amount), successMessage, errorMessage);
    }
  }
}
