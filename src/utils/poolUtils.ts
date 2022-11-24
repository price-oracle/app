import { getConfig } from '~/config';
import { PoolManager, UniswapPool } from '~/types';

export const getPoolName = (poolManager: PoolManager): string => poolManager.token.tokenSymbol + '-WETH';

export const isPoolAlreadyCreated = (pool: UniswapPool) => pool.address !== getConfig().ADDRESSES.ZERO_ADDRESS;
