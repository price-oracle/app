import { abi as IUniswapV3Factory } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json';
import { abi as IUniswapV3Pool } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json';
import { useProvider } from 'wagmi';
import { Contract } from 'ethers-multicall';
import BigNumber from 'bignumber.js';

import { getConfig } from '~/config';
import { MultiCallService } from './multicallService';
import { Address, PoolData, UniswapPool } from '~/types';

export class UniswapService {
  provider = useProvider();
  addresses = getConfig().ADDRESSES;
  fees = getConfig().FEE_TIERS;
  multiCallService = new MultiCallService();
  uniswapV3Factory: Contract;

  constructor() {
    this.uniswapV3Factory = new Contract(this.addresses.UNISWAP_V3_FACTORY, IUniswapV3Factory);
  }

  async fetchUniswapPools(tokenAddress: Address): Promise<{ [feeTier: number]: UniswapPool }> {
    const feeList = Object.values(this.fees);

    const poolAddressList: Address[] = await this.multiCallService.multicall(
      feeList.map((feeValue) => this.getPoolCall(tokenAddress, feeValue.fee))
    );

    const poolsData = await this.fetchPoolsData(poolAddressList);

    const pools: UniswapPool[] = poolAddressList.map((address) => ({
      address,
      ...poolsData[address],
    }));

    const poolListMap = Object.fromEntries(pools.map((pool, index) => [pool.pricing && feeList[index].fee, pool]));
    return poolListMap;
  }

  async fetchPoolsData(pools: Address[]): Promise<{ [address: Address]: PoolData }> {
    const filteredPools = pools.filter((address) => address !== this.addresses.ZERO_ADDRESS);
    const poolsDataResponse = await this.multiCallService.multicall(
      filteredPools
        .filter((address) => address !== this.addresses.ZERO_ADDRESS)
        .map((address) => {
          const poolContract = new Contract(address, IUniswapV3Pool);
          return [poolContract.slot0(), poolContract.token0()];
        })
        .flat()
    );

    const poolsData: PoolData[] = [];
    for (let i = 0; i < poolsDataResponse.length; i = i + 2) {
      const slot0 = poolsDataResponse[i];
      const token0 = poolsDataResponse[i + 1];
      poolsData.push({
        pricing: new BigNumber(slot0.sqrtPriceX96.toString()),
        isWethToken0: token0 === this.addresses.WETH_ADDRESS,
      });
    }

    return Object.fromEntries(filteredPools.map((pool, index) => [pool, poolsData[index]]));
  }

  getPoolCall(tokenAddress: Address, feeAmount: number) {
    return this.uniswapV3Factory.getPool(tokenAddress, this.addresses.WETH_ADDRESS, feeAmount);
  }
}
