import { abi as IUniswapV3Factory } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json';
import { useProvider } from 'wagmi';
import { Contract } from 'ethers-multicall';

import { getConfig } from '~/config';
import { MultiCallService } from './multicallService';
import { Address, PoolFees } from '~/types';

export class UniswapService {
  provider = useProvider();
  addresses = getConfig().ADDRESSES;
  fees = getConfig().FEE_TIERS;
  multiCallService = new MultiCallService();

  async fetchUniswapPools(tokenAddress: Address): Promise<PoolFees> {
    const feeList = Object.entries(this.fees);
    const uniswapV3Factory = new Contract(this.addresses.UNISWAP_V3_FACTORY, IUniswapV3Factory);

    const getPoolCall = (feeAmount: number) =>
      uniswapV3Factory.getPool(tokenAddress, this.addresses.WETH_ADDRESS, feeAmount);

    const feeResults = await this.multiCallService.multicall(
      feeList.map((feeValue) => getPoolCall(this.fees[feeValue[0]].fee))
    );

    const poolsList: [string, string][] = [];
    for (let i = 0; i < feeList.length; i++) {
      poolsList.push([feeList[i][0], feeResults[i]]);
    }
    const poolListMap = Object.fromEntries(poolsList.map((pool) => [pool[0], pool[1]]));

    return poolListMap;
  }
}
