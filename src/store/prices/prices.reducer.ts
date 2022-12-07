import { createReducer } from '@reduxjs/toolkit';

import { initialStatus, PricesState } from '~/types';

import { PricesActions } from './prices.actions';

export const pricesInitialState: PricesState = {
  usdPerEth: '0',
  status: initialStatus,
};

const { getEthPrice } = PricesActions;

const pricesReducer = createReducer(pricesInitialState, (builder) => {
  builder.addCase(getEthPrice.fulfilled, (state, { payload: { usdPerEth } }) => {
    state.status.loading = false;
    state.usdPerEth = usdPerEth;
  });
  builder.addCase(getEthPrice.pending, (state) => {
    state.status.loading = true;
  });
});

export default pricesReducer;
