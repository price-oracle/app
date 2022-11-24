import { getConfig } from '~/config';
import { Address } from '~/types/Blockchain';
import { PoolManager } from '~/types/PoolManager';

export const getPoolName = (poolManager: PoolManager): string => poolManager.token.tokenSymbol + '-WETH';

export const updateFeeTierList = (poolListMap: { [key: string]: Address }) => {
  const addresses = getConfig().ADDRESSES;
  const feeTiers = getConfig().FEE_TIERS;
  const poolListArray = Object.entries(poolListMap);

  const newFees = feeTiers;
  for (let i = 0; i < poolListArray.length; i++) {
    newFees[poolListArray[i][0]].created = poolListArray[i][1] !== addresses.ZERO_ADDRESS;
  }

  return newFees;
};
