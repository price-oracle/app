import { utils, BigNumber } from 'ethers';
import { PoolManager } from '~/types';
import { sqrtPriceX96ToPrice } from '~/utils';

export const getPoolName = (poolManager: PoolManager): string => poolManager.token.symbol + '-WETH';

export const getPriceForToken = (pricing: BigNumber, tokenDecimals: number, isWethToken0: boolean) => {
  const oneEther = utils.parseEther('1');
  const price = sqrtPriceX96ToPrice(pricing).div(oneEther);
  const calculatedPrice = isWethToken0 ? price : oneEther.mul(oneEther).div(price);
  return utils.formatUnits(calculatedPrice, tokenDecimals).toString();
};
