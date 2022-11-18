import { createReducer } from '@reduxjs/toolkit';

import { LockManagerState } from '~types/State';

import { LockManagersActions } from './lockManager.actions';

export const lockManagerInitialState: LockManagerState = {
  elements: undefined,
};

const { fetchLockManagers } = LockManagersActions;

const lockManagerReducer = createReducer(lockManagerInitialState, (builder) => {
  builder.addCase(fetchLockManagers.fulfilled, (state, { payload: { elements } }) => {
    state.elements = elements;
  });
});

export default lockManagerReducer;
