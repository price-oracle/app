import { createReducer } from '@reduxjs/toolkit';

import { initialStatus, PoolManager, PoolManagersState, PoolAndLockManager } from '~/types';
import { poolAndLockManagerToPoolManager } from '~/utils';

import { PoolManagersActions } from './poolManagers.actions';

export const poolManagersInitialState: PoolManagersState = {
  elements: undefined,
  rewards: {
    status: initialStatus,
  },
};

const { claimRewards, fetchPoolAndLockManagers } = PoolManagersActions;

const poolManagersReducer = createReducer(poolManagersInitialState, (builder) => {
  builder.addCase(fetchPoolAndLockManagers.fulfilled, (state, { payload: { poolAndLockManagers } }) => {
    state.elements = Object.fromEntries(
      poolAndLockManagers
        .map((poolAndLock: PoolAndLockManager) => poolAndLockManagerToPoolManager(poolAndLock))
        .map((pool: PoolManager) => [pool.address, pool])
    );
  });

  builder.addCase(claimRewards.fulfilled, (state) => {
    state.rewards.status.loading = false;
  });

  builder.addCase(claimRewards.pending, (state) => {
    state.rewards.status.loading = true;
  });
});

export default poolManagersReducer;
