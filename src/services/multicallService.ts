import { Provider as wagmiProvider } from '@wagmi/core';
import { Provider, setMulticallAddress } from 'ethers-multicall';

import { getConfig } from '~/config';

export class MultiCallService {
  multicallAddress = getConfig().ADDRESSES.MULTICALL_ADDRESS;
  multicallProvider: Provider;

  constructor(provider: wagmiProvider) {
    this.multicallProvider = new Provider(provider);
    // Set mainnet multicall address to localhost chain as we are forking
    setMulticallAddress(1337, this.multicallAddress);
  }

  async multicall(txs: any[]) {
    await this.multicallProvider.init();
    return this.multicallProvider.all(txs);
  }
}
