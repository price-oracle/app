import { Address, ModalName, PoolManager, ThemeName, Alert, LockManager, Token, Status } from '~/types';

export interface CustomTokensState {
  tokens: Token[];
}

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
  status: Status;
}

export interface AlertsState {
  alertsList: Alert[];
}

export interface RootState {
  alerts: AlertsState;
  theme: ThemeState;
  settings: SettingsState;
  modals: ModalsState;
  poolManagers: PoolManagersState;
  lockManagers: LockManagerState;
  customTokens: CustomTokensState;
}
