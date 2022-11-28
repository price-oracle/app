import { createReducer } from '@reduxjs/toolkit';

import { initialStatus, PoolManagersState } from '~/types';

import { PoolManagersActions } from './poolManagers.actions';

export const poolManagersInitialState: PoolManagersState = {
  elements: undefined,
  status: initialStatus,
};

const { fetchPoolManagers, claimRewards } = PoolManagersActions;

const poolManagersReducer = createReducer(poolManagersInitialState, (builder) => {
  builder.addCase(fetchPoolManagers.fulfilled, (state, { payload: { elements } }) => {
    state.elements = elements;
  });

  builder.addCase(claimRewards.fulfilled, (state) => {
    state.status.loading = false;
  });

  builder.addCase(claimRewards.pending, (state) => {
    state.status.loading = true;
  });
});

export default poolManagersReducer;
