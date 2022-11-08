import { ThemeName } from './Settings';

export interface ThemeState {
  current: ThemeName;
}

export interface RootState {
  theme: ThemeState;
}
