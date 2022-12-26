import { createReducer } from '@reduxjs/toolkit';

import { initialStatus, LockManagerState, PoolAndLockManager, LockManager } from '~/types';
import { poolAndLockManagerToLockManager } from '~/utils';
import { PoolManagersActions } from '../poolManagers/poolManagers.actions';
import { LockManagersActions } from './lockManager.actions';

export const lockManagerInitialState: LockManagerState = {
  elements: undefined,
  rewards: {
    status: initialStatus,
  },
};

const { fetchPoolAndLockManagers } = PoolManagersActions;
const { claimRewards } = LockManagersActions;

const lockManagerReducer = createReducer(lockManagerInitialState, (builder) => {
  builder.addCase(fetchPoolAndLockManagers.fulfilled, (state, { payload: { poolAndLockManagers } }) => {
    state.elements = Object.fromEntries(
      poolAndLockManagers
        .map((poolAndLock: PoolAndLockManager) => poolAndLockManagerToLockManager(poolAndLock))
        .map((lockManager: LockManager) => [lockManager.address, lockManager])
    );
  });

  builder.addCase(claimRewards.fulfilled, (state) => {
    state.rewards.status.loading = false;
  });

  builder.addCase(claimRewards.pending, (state) => {
    state.rewards.status.loading = true;
  });
});

export default lockManagerReducer;
