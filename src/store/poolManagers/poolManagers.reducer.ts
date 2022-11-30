import { createReducer } from '@reduxjs/toolkit';

import { initialStatus, PoolManagersState } from '~/types';

import { PoolManagersActions } from './poolManagers.actions';

export const poolManagersInitialState: PoolManagersState = {
  elements: undefined,
  rewards: {
    status: initialStatus,
  },
};

const { fetchPoolManagers, claimRewards } = PoolManagersActions;

const poolManagersReducer = createReducer(poolManagersInitialState, (builder) => {
  builder.addCase(fetchPoolManagers.fulfilled, (state, { payload: { elements } }) => {
    state.elements = elements;
  });

  builder.addCase(claimRewards.fulfilled, (state) => {
    state.rewards.status.loading = false;
  });

  builder.addCase(claimRewards.pending, (state) => {
    state.rewards.status.loading = true;
  });
});

export default poolManagersReducer;
