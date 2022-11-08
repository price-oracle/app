import { Address } from './Blockchain';
import { ThemeName } from './Settings';

export interface ThemeState {
  current: ThemeName;
}

export interface SettingsState {
  stateVersion: number;
  devMode: {
    enabled: boolean;
    walletAddressOverride: Address;
  };
}

export interface RootState {
  theme: ThemeState;
  settings: SettingsState;
}
