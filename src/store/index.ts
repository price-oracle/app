// Theme State
import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';

import { RootState } from '~types/State';

// Theme state
import themeReducer, { themeInitialState } from './theme/theme.reducer';
import { ThemeActions } from './theme/theme.actions';

export const rootReducer: Reducer<RootState> = combineReducers({
  theme: themeReducer,
});

// Actions
export { ThemeActions };

// Selectors
// export {
//   themeSelectors
// };

// initialStates
export { themeInitialState };

const store = configureStore({
  reducer: rootReducer,
});

export default store;
