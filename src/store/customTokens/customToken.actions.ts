import { createAction } from '@reduxjs/toolkit';
import { Token } from '~/types/Token';

const addCustomToken = createAction<{ token: Token }>('customTokens/addCustomToken');

export const CustomTokenActions = {
  addCustomToken,
};
