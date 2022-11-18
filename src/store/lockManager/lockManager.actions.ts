import { createAsyncThunk } from '@reduxjs/toolkit';

import { LockManager } from '~/types/LockManager';
import { PoolManager } from '~/types/PoolManager';
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

export const LockManagersActions = {
  fetchLockManagers,
};
