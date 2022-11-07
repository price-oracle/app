import { Theme } from './Settings';

export interface ThemeState {
  current: Theme;
}

export interface RootState {
  theme: ThemeState;
}
