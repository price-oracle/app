import { PoolManager, PoolAndLockManager, LockManager } from '~/types';

export function poolAndLockManagerToPoolManager(poolAndLockManagers: PoolAndLockManager): PoolManager {
  return {
    address: poolAndLockManagers.poolManagerAddress,
    fee: poolAndLockManagers.fee,
    token: poolAndLockManagers.token,
    lockManagerAddress: poolAndLockManagers.lockManagerAddress,
    poolLiquidity: poolAndLockManagers.poolLiquidity,
    isWethToken0: poolAndLockManagers.isWethToken0,
    userSeedBalance: poolAndLockManagers.userSeedBalance,
    rewards: poolAndLockManagers.poolManagerRewards
      ? {
          ethReward: poolAndLockManagers.poolManagerRewards.ethReward,
          tokenReward: poolAndLockManagers.poolManagerRewards.tokenReward,
        }
      : undefined,
  };
}

export function poolAndLockManagerToLockManager(poolAndLockManagers: PoolAndLockManager): LockManager {
  return {
    address: poolAndLockManagers.lockManagerAddress,
    locked: poolAndLockManagers.locked,
    rewards: poolAndLockManagers.lockManagerRewards
      ? {
          ethReward: poolAndLockManagers.lockManagerRewards.ethReward,
          tokenReward: poolAndLockManagers.lockManagerRewards.tokenReward,
          tokenPerEth: poolAndLockManagers.tokenPerEth,
        }
      : undefined,
  };
}
