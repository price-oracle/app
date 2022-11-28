import { createReducer } from '@reduxjs/toolkit';

import { initialStatus, LockManagerState } from '~/types';
import { LockManagersActions } from './lockManager.actions';

export const lockManagerInitialState: LockManagerState = {
  elements: undefined,
  status: initialStatus,
};

const { fetchLockManagers, claimRewards } = LockManagersActions;

const lockManagerReducer = createReducer(lockManagerInitialState, (builder) => {
  builder.addCase(fetchLockManagers.fulfilled, (state, { payload: { elements } }) => {
    state.elements = elements;
  });

  builder.addCase(claimRewards.fulfilled, (state) => {
    state.status.loading = false;
  });

  builder.addCase(claimRewards.pending, (state) => {
    state.status.loading = true;
  });
});

export default lockManagerReducer;
