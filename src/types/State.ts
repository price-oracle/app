import { Address } from './Blockchain';
import { ModalName } from './Modals';
import { PoolManager } from './PoolManager';
import { ThemeName } from './Settings';
import { LockManager } from './LockManager';

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
  elements: { [key: Address]: PoolManager } | undefined;
}

export interface LockManagerState {
  elements: { [key: Address]: LockManager } | undefined;
}

export interface RootState {
  theme: ThemeState;
  settings: SettingsState;
  modals: ModalsState;
  poolManagers: PoolManagersState;
  lockManagers: LockManagerState;
}
