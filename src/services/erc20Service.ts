import { ethers } from 'ethers';
import { useProvider } from 'wagmi';

import IERC20 from '~/abis/IERC20.json';

export class ERC20Service {
  provider = useProvider();

  async fetchTokenSymbol(erc20Address: string) {
    const erc20Contract = new ethers.Contract(erc20Address, IERC20, this.provider);

    return await erc20Contract.callStatic.symbol();
  }
}
