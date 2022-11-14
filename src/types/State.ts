import { Address } from './Blockchain';
import { ModalName } from './Modals';
import { PoolManager } from './PoolManager';
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

export interface ModalsState {
  activeModal: ModalName | undefined;
  modalProps: any | undefined;
}
export interface PoolManagersState {
  poolManagers: { [key: Address]: PoolManager } | undefined;
}

export interface RootState {
  theme: ThemeState;
  settings: SettingsState;
  modals: ModalsState;
  poolManagers: PoolManagersState;
}
