import { BigNumber } from 'ethers';

import { addresses } from '~/config/constants/addresses';
import { UniswapService } from '~/services';
import { Address, PoolManager } from '~/types';
import { sqrtPriceX96ToPrice } from '~/utils';

export const getPoolName = (poolManager: PoolManager): string => poolManager.token.symbol + '-WETH';

export const getPriceForToken = (pricing: BigNumber, isWethToken0: boolean) => {
  return sqrtPriceX96ToPrice(pricing, isWethToken0);
};

export const getEthPriceInUSDC = async (uniswapService: UniswapService): Promise<BigNumber> => {
  const usdcPoolAddress = addresses.USDC_UNISWAP_POOL;
  const usdcPoolData = await uniswapService.fetchPoolsData([usdcPoolAddress]);
  const price = getPriceForToken(usdcPoolData[usdcPoolAddress].pricing, usdcPoolData[usdcPoolAddress].isWethToken0);
  return price.mul(1e12); // we need to multiply 'price' by 1e12 because USDC only have 6 decimals
};

export const getTokenPrice = async (uniswapService: UniswapService, poolAddresses: Address[]): Promise<BigNumber[]> => {
  const poolsData = await uniswapService.fetchPoolsData(poolAddresses);
  const result = Object.values(poolsData).map((pool) => getPriceForToken(pool.pricing, pool.isWethToken0));
  return result;
};
