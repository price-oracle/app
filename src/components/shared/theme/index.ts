export * from './colors';

import { ThemeName } from '~/types';
import { Theme, darkTheme, lightTheme } from './colors';

export const getTheme = (theme?: ThemeName): Theme => {
  switch (theme) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
    default:
      return lightTheme;
  }
};
