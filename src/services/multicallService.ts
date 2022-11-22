import { Provider, setMulticallAddress } from 'ethers-multicall';
import { useProvider } from 'wagmi';

export class MultiCallService {
  provider = useProvider();
  multicallProvider = new Provider(this.provider);

  constructor() {
    // Set mainnet multicall address to localhost chain as we are forking
    setMulticallAddress(1337, '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441');
  }

  async multicall(txs: any[]) {
    await this.multicallProvider.init();
    return this.multicallProvider.all(txs);
  }
}
