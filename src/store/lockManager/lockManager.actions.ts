import { createAsyncThunk } from '@reduxjs/toolkit';

import { Address, LockManager, PoolManager } from '~/types';
import { LockManagerService } from '~/services';

import { ThunkAPI } from '~/store';

const fetchLockManagers = createAsyncThunk<
  { elements: { [key: string]: LockManager } },
  {
    lockManagerService: LockManagerService;
    poolManagers: { [key: string]: PoolManager };
  },
  ThunkAPI
>('lockManager/fetch', async ({ lockManagerService, poolManagers }) => {
  const poolManagerList = Object.values(poolManagers);
  const lockManagers = await Promise.all(
    poolManagerList.map((poolManager) => lockManagerService.fetchUserLockedAmount(poolManager))
  );
  const lockManagersMap = Object.fromEntries(lockManagers.map((locked) => [locked.address, locked]));

  return { elements: lockManagersMap };
});

const claimRewards = createAsyncThunk<
  void,
  { lockManagerAddress: Address; lockManagerService: LockManagerService; userAddress: string },
  ThunkAPI
>('lockManager/claimRewards', async ({ lockManagerAddress, lockManagerService, userAddress }) => {
  await lockManagerService.claimRewards(lockManagerAddress, userAddress);
});

export const LockManagersActions = {
  fetchLockManagers,
  claimRewards,
};
