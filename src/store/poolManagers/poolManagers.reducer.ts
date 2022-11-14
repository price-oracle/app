import { createReducer } from '@reduxjs/toolkit';

import { PoolManagersState } from '~types/State';

import { PoolManagersActions } from './poolManagers.actions';

export const poolManagersInitialState: PoolManagersState = {
  poolManagers: undefined,
};

const { fetchPoolManagers } = PoolManagersActions;

const poolManagersReducer = createReducer(poolManagersInitialState, (builder) => {
  builder.addCase(fetchPoolManagers.fulfilled, (state, { payload: { poolManagers } }) => {
    state.poolManagers = poolManagers;
  });
});

export default poolManagersReducer;
