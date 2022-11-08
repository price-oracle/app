import { createReducer } from '@reduxjs/toolkit';

import { SettingsState } from '~types/State';
import { getConfig } from '~/config';

import { SettingsActions } from './settings.actions';

export const settingsInitialState: SettingsState = {
  stateVersion: getConfig().STATE_VERSION,
  devMode: {
    enabled: false,
    walletAddressOverride: '',
  },
};

const { toggleDevMode } = SettingsActions;

const settingsReducer = createReducer(settingsInitialState, (builder) => {
  builder.addCase(toggleDevMode.fulfilled, (state, { payload: { enable } }) => {
    state.devMode.enabled = enable;
    state.devMode.walletAddressOverride = '';
  });
  // .addCase(changeWalletAddressOverride.fulfilled, (state, { meta }) => {
  //   state.devMode.walletAddressOverride = meta.arg.address;
  // });
});

export default settingsReducer;
