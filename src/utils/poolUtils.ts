import { getConfig } from '~/config';
import { Address, PoolManager } from '~/types';

export const getPoolName = (poolManager: PoolManager): string => poolManager.token.tokenSymbol + '-WETH';

export const updateFeeTierList = (poolListMap: { [key: string]: Address }) => {
  const addresses = getConfig().ADDRESSES;
  const feeTiers = getConfig().FEE_TIERS;
  const poolListArray = Object.entries(poolListMap);

  poolListArray.map((pool) => (feeTiers[pool[0]].created = pool[1] !== addresses.ZERO_ADDRESS));

  return feeTiers;
};
