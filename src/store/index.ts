// Theme State
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
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
import poolManagersReducer from './poolManagers/poolManagers.reducer';

// Modals state
import modalsReducer, { modalsInitialState } from './modals/modals.reducer';
import { ModalsActions } from './modals/modals.actions';
import { ModalSelectors } from './modals/modals.selectors';

export const rootReducer: Reducer<RootState> = combineReducers({
  theme: themeReducer,
  settings: settingsReducer,
  modals: modalsReducer,
  poolManagers: poolManagersReducer,
});

// Actions
export { ThemeActions, SettingsActions, ModalsActions };

// Selectors
export { ModalSelectors };

// initialStates
export { themeInitialState, settingsInitialState, modalsInitialState };

export function getStore() {
  const localStorageName = 'price';
  const isDev = getConfig().ALLOW_DEV_MODE;

  const initialState = {
    theme: cloneDeep(themeInitialState),
    settings: cloneDeep(settingsInitialState),
  };
  const persistConfig = {
    namespace: localStorageName,
    states: ['theme', 'settings'],
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
