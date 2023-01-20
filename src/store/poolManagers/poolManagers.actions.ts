import { createAsyncThunk } from '@reduxjs/toolkit';

import { PoolManagerFactoryService, PoolManagerService } from '~/services';
import { Address, PoolAndLockManager } from '~/types';

import { ThunkAPI } from '~/store';

const claimRewards = createAsyncThunk<
  void,
  {
    poolManagerAddress: Address;
    poolManagerService: PoolManagerService;
    userAddress: Address;
    updateState: () => void;
  },
  ThunkAPI
>('poolManager/claimRewards', async ({ poolManagerAddress, poolManagerService, userAddress, updateState }) => {
  poolManagerService.claimRewards(poolManagerAddress, userAddress).then(() => updateState());
});

const fetchPoolAndLockManagers = createAsyncThunk<
  { poolAndLockManagers: PoolAndLockManager[] },
  {
    factoryService: PoolManagerFactoryService;
    userAddress: Address | undefined;
  },
  ThunkAPI
>('poolManagers/fetchWithLockManagers', async ({ factoryService, userAddress }) => {
  const poolAndLockManagers = await factoryService.fetchPoolAndLockManagers(userAddress);
  return { poolAndLockManagers };
});

export const PoolManagersActions = {
  claimRewards,
  fetchPoolAndLockManagers,
};
