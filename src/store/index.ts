// Theme State
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';

// Theme state
import themeReducer, { themeInitialState } from './theme/theme.reducer';
import { ThemeActions } from './theme/theme.actions';
import { RootState } from '~types/State';

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

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
