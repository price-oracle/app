import { ethers } from 'ethers';
import { useNetwork, useProvider, useSigner } from 'wagmi';

import IERC20 from '~/abis/IERC20.json';
import { getConfig } from '~/config';
import { TxService } from './txService';

export class ERC20Service {
  txService = new TxService();
  provider = useProvider();
  signer = useSigner();

  async fetchTokenSymbol(erc20Address: string) {
    const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.provider);

    return await erc20Contract.callStatic.symbol();
  }

  async fetchTokenBalance(erc20Address: string, user: string) {
    const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.provider);

    return await erc20Contract.balanceOf(user);
  }

  async fetchTokenAllowance(erc20Address: string, approveContract: string, user: string) {
    const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.provider);

    return await erc20Contract.allowance(user, approveContract);
  }

  async approveTokenAmount(erc20Address: string, approveContract: string, amount: string) {
    if (this.signer?.data) {
      const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.signer?.data);
      return this.txService.handleTx(await erc20Contract.approve(approveContract, amount));
    }
  }
}
