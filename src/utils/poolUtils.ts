import { BigNumber } from 'ethers';
import { PoolManager } from '~/types';
import { sqrtPriceX96ToPrice } from '~/utils';

export const getPoolName = (poolManager: PoolManager): string => poolManager.token.symbol + '-WETH';

export const getPriceForToken = (pricing: BigNumber, isWethToken0: boolean) => {
  return sqrtPriceX96ToPrice(pricing, isWethToken0);
};
