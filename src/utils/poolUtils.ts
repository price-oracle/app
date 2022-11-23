import { PoolManager } from '~/types';

export const getPoolName = (poolManager: PoolManager): string => poolManager.token.tokenSymbol + '-WETH';
