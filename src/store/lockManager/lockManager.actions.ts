import { createAsyncThunk } from '@reduxjs/toolkit';

import { LockManagerService } from '~/services';
import { Address } from '~/types';

import { ThunkAPI } from '~/store';

const claimRewards = createAsyncThunk<
  void,
  {
    lockManagerAddress: Address;
    lockManagerService: LockManagerService;
    userAddress: Address;
    updateState: () => void;
  },
  ThunkAPI
>('lockManager/claimRewards', async ({ lockManagerAddress, lockManagerService, userAddress, updateState }) => {
  lockManagerService.claimRewards(lockManagerAddress, userAddress).then(() => updateState());
});

export const LockManagersActions = {
  claimRewards,
};
