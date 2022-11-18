import { createReducer } from '@reduxjs/toolkit';

import { PoolManagersState } from '~types/State';

import { PoolManagersActions } from './poolManagers.actions';

export const poolManagersInitialState: PoolManagersState = {
  elements: undefined,
};

const { fetchPoolManagers } = PoolManagersActions;

const poolManagersReducer = createReducer(poolManagersInitialState, (builder) => {
  builder.addCase(fetchPoolManagers.fulfilled, (state, { payload: { elements } }) => {
    state.elements = elements;
  });
});

export default poolManagersReducer;
