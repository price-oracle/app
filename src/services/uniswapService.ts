import { abi as IUniswapV3Factory } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json';
import { useProvider } from 'wagmi';
import { Contract } from 'ethers-multicall';

import { getConfig } from '~/config';
import { MultiCallService } from './multicallService';
import { Address, UniswapPool } from '~/types';

export class UniswapService {
  provider = useProvider();
  addresses = getConfig().ADDRESSES;
  fees = getConfig().FEE_TIERS;
  multiCallService = new MultiCallService();
  uniswapV3Factory: Contract;

  constructor() {
    this.uniswapV3Factory = new Contract(this.addresses.UNISWAP_V3_FACTORY, IUniswapV3Factory);
  }

  async fetchUniswapPools(tokenAddress: Address): Promise<{ [k: string]: UniswapPool }> {
    const feeList = Object.values(this.fees);

    const poolAddressList: Address[] = await this.multiCallService.multicall(
      feeList.map((feeValue) => this.getPoolCall(tokenAddress, feeValue.fee))
    );

    const pools = poolAddressList.map((address) => ({
      address,
    }));

    const poolListMap = Object.fromEntries(pools.map((pool, index) => [feeList[index].label, pool]));

    return poolListMap;
  }

  getPoolCall(tokenAddress: Address, feeAmount: number) {
    return this.uniswapV3Factory.getPool(tokenAddress, this.addresses.WETH_ADDRESS, feeAmount);
  }
}
