export * from './colors';

import { ThemeName } from '~/types/Settings';
import { Theme, darkTheme, lightTheme } from './colors';

export const getTheme = (theme?: ThemeName): Theme => {
  switch (theme) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
    case 'system-prefs':
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme;
    default:
      return lightTheme;
  }
};
