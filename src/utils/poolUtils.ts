import { PoolManager } from '~/types/PoolManager';

export const getPoolName = (poolManager: PoolManager): string => poolManager.token.tokenSymbol + '-WETH';
