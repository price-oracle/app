import { createAsyncThunk } from '@reduxjs/toolkit';

import { PoolManagerFactoryService, PoolManagerService } from '~/services';
import { PoolManager } from '~/types/PoolManager';

import { ThunkAPI } from '~/store';

const fetchPoolManagers = createAsyncThunk<
  { poolManagers: { [key: string]: PoolManager } },
  { factoryService: PoolManagerFactoryService; poolManagerService: PoolManagerService },
  ThunkAPI
>('poolManagers/fetch', async ({ factoryService, poolManagerService }) => {
  const poolManagerAddresses = await factoryService.fetchPoolManagerAddresses();
  const poolManagers = await Promise.all(poolManagerAddresses.map((ad) => poolManagerService.fetchPoolManager(ad)));
  const poolManagersMap = Object.fromEntries(poolManagers.map((pool) => [pool.address, pool]));
  return { poolManagers: poolManagersMap };
});

export const PoolManagersActions = {
  fetchPoolManagers,
};
