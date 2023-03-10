// Alerts state
import alertsReducer, { alertsInitialState } from './alerts/alerts.reducer';
import { AlertsActions } from './alerts/alerts.actions';

// Theme State
import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { load, clear, save } from 'redux-localstorage-simple';
import { cloneDeep, get, merge } from 'lodash';

import { getConfig } from '~/config';
import { RootState } from '~types/State';

// Theme state
import themeReducer, { themeInitialState } from './theme/theme.reducer';
import { ThemeActions } from './theme/theme.actions';

// Theme state
import settingsReducer, { settingsInitialState } from './settings/settings.reducer';
import { SettingsActions } from './settings/settings.actions';

// Pool Managers state
import poolManagersReducer, { poolManagersInitialState } from './poolManagers/poolManagers.reducer';
import { PoolManagersActions } from './poolManagers/poolManagers.actions';

// Lock Managers state
import lockManagersReducer, { lockManagerInitialState } from './lockManager/lockManager.reducer';
import { LockManagersActions } from './lockManager/lockManager.actions';

// Modals state
import modalsReducer, { modalsInitialState } from './modals/modals.reducer';
import { ModalsActions } from './modals/modals.actions';
import { ModalSelectors } from './modals/modals.selectors';

// Prices state
import pricesReducer, { pricesInitialState } from './prices/prices.reducer';
import { PricesActions } from './prices/prices.actions';

// Custom tokens state
import customTokensReducer, { customTokensInitialState } from './customTokens/customToken.reducer';
import { CustomTokenActions } from './customTokens/customToken.actions';
import { useAppDispatch } from '~/hooks';

export const rootReducer: Reducer<RootState> = combineReducers({
  theme: themeReducer,
  settings: settingsReducer,
  modals: modalsReducer,
  poolManagers: poolManagersReducer,
  lockManagers: lockManagersReducer,
  alerts: alertsReducer,
  customTokens: customTokensReducer,
  prices: pricesReducer,
});

// Actions
export {
  ThemeActions,
  SettingsActions,
  ModalsActions,
  LockManagersActions,
  PoolManagersActions,
  AlertsActions,
  CustomTokenActions,
  PricesActions,
};

// Selectors
export { ModalSelectors };

// initialStates
export {
  themeInitialState,
  settingsInitialState,
  modalsInitialState,
  lockManagerInitialState,
  customTokensInitialState,
  pricesInitialState,
};

export { useAppDispatch };

export function getStore() {
  const localStorageName = 'price';
  const isDev = getConfig().ALLOW_DEV_MODE;

  const initialState = {
    theme: cloneDeep(themeInitialState),
    settings: cloneDeep(settingsInitialState),
    alerts: cloneDeep(alertsInitialState),
    poolManagers: cloneDeep(poolManagersInitialState),
    lockManagers: cloneDeep(lockManagerInitialState),
    customTokens: cloneDeep(customTokensInitialState),
    prices: cloneDeep(pricesInitialState),
  };
  const persistConfig = {
    namespace: localStorageName,
    states: ['theme', 'settings', 'customTokens'],
    disableWarnings: true,
  };

  let persistedState = load(persistConfig);
  const currentStateVersion = initialState.settings.stateVersion;
  const persistedStateVersion = get(persistedState, 'settings.stateVersion');
  if (persistedStateVersion && persistedStateVersion < currentStateVersion) {
    // NOTE stateVersion is used to reset local storage state. So, we can update
    // the state version and all the clients with reset localstorage state
    persistedState = {};
    clear({
      namespace: localStorageName,
    });
  }

  const logger = createLogger({ collapsed: true });
  const middlewareOptions = {
    immutableCheck: { warnAfter: 300 },
    serializableCheck: { warnAfter: 200 },
  };

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware(middlewareOptions);
      middleware.push(save(persistConfig));
      if (isDev) {
        middleware.push(logger);
      }
      return middleware;
    },
    devTools: isDev,
    preloadedState: merge(initialState, persistedState),
  });
  return store;
}

const store = getStore();

export type Store = ReturnType<typeof getStore>;
export type AppDispatch = Store['dispatch'];

export interface ThunkAPI {
  dispatch: AppDispatch;
  state: RootState;
  // extra: DIContainer;
}

export default store;
