import { Provider, setMulticallAddress } from 'ethers-multicall';
import { useProvider } from 'wagmi';

import { getConfig } from '~/config';

export class MultiCallService {
  provider = useProvider();
  multicallAddress = getConfig().ADDRESSES.MULTICALL_ADDRESS;
  multicallProvider = new Provider(this.provider);

  constructor() {
    // Set mainnet multicall address to localhost chain as we are forking
    setMulticallAddress(1337, this.multicallAddress);
  }

  async multicall(txs: any[]) {
    await this.multicallProvider.init();
    return this.multicallProvider.all(txs);
  }
}
