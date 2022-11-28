import { Provider, setMulticallAddress } from 'ethers-multicall';
import { useProvider, useNetwork } from 'wagmi';

import { getConfig } from '~/config';

export class MultiCallService {
  provider = useProvider();
  multicallAddress = getConfig().ADDRESSES.MULTICALL_ADDRESS;
  chainId = useNetwork().chain?.id;
  multicallProvider = new Provider(this.provider);

  constructor() {
    // Set mainnet multicall address to localhost chain as we are forking
    setMulticallAddress(this.chainId || 1337, this.multicallAddress);
  }

  async multicall(txs: any[]) {
    await this.multicallProvider.init();
    return this.multicallProvider.all(txs);
  }
}
