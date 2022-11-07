import { createAction } from '@reduxjs/toolkit';
// import { ThunkAPI } from '@frameworks/redux';

import { Theme } from '~/types/Settings';

const changeTheme = createAction<{ theme: Theme }>('theme/changeTheme');

// const changeTheme = createAsyncThunk<{ theme: Theme }, { theme: Theme }, ThunkAPI>(
//   'theme/changeTheme',
//   async ({ theme }, { dispatch }) => {
//     dispatch(WalletActions.changeWalletTheme(theme));
//     return { theme };
//   }
// );

export const ThemeActions = {
  changeTheme,
};
