import { createReducer } from '@reduxjs/toolkit';

import { ThemeState } from '~types/State';
import { getConfig } from '~/config';

import { ThemeActions } from './theme.actions';

export const themeInitialState: ThemeState = {
  current: getConfig().DEFAULT_THEME,
};

const { changeTheme } = ThemeActions;

const themeReducer = createReducer(themeInitialState, (builder) => {
  builder.addCase(changeTheme, (state, { payload: { theme } }) => {
    state.current = theme;
  });
});

export default themeReducer;
