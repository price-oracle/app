import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkAPI } from '~/store';
// import { isValidAddress } from '~/utils';
// import { getConfig } from '~/config';

// import { WalletActions } from '../wallet/wallet.actions';

const toggleDevMode = createAsyncThunk<{ enable: boolean }, { enable: boolean }, ThunkAPI>(
  'settings/toggleDevMode',
  async ({ enable }) =>
    // { dispatch, extra }
    {
      // const { config, context } = extra;
      // const { ALLOW_DEV_MODE } = getConfig();

      // if (ALLOW_DEV_MODE && !enable && context.wallet.isConnected && context.wallet.selectedAddress) {
      //   dispatch(WalletActions.addressChange({ address: context.wallet.selectedAddress }));
      //   dispatch(WalletActions.getAddressEnsName({ address: context.wallet.selectedAddress }));
      // }

      return { enable };
    }
);

export const SettingsActions = {
  toggleDevMode,
};
