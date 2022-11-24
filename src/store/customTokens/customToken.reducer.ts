import { createReducer } from '@reduxjs/toolkit';

import { CustomTokensState } from '~types/State';
import { CustomTokenActions } from './customToken.actions';

export const customTokensInitialState: CustomTokensState = {
  tokens: [],
};

const { addCustomToken } = CustomTokenActions;

const customTokensReducer = createReducer(customTokensInitialState, (builder) => {
  builder.addCase(addCustomToken, (state, { payload: { token } }) => {
    state.tokens.push(token);
  });
});

export default customTokensReducer;
