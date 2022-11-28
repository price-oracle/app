import BigNumber from 'bignumber.js';
import { PoolManager } from '~/types';
import { sqrtPriceX96ToPrice } from '~/utils';

export const getPoolName = (poolManager: PoolManager): string => poolManager.token.symbol + '-WETH';

export const getPriceForToken = (pricing: BigNumber, tokenDecimals: number, isWethToken0: boolean): BigNumber => {
  const priceE18 = sqrtPriceX96ToPrice(pricing);
  const calculatedPrice = isWethToken0 ? priceE18 : new BigNumber('1').dividedBy(priceE18);
  const decimals = new BigNumber(10).exponentiatedBy(tokenDecimals);
  return calculatedPrice.multipliedBy(1e18).dividedBy(decimals);
};
