import { createAsyncThunk } from '@reduxjs/toolkit';

import { PoolManagerFactoryService, PoolManagerService } from '~/services';
import { Address, PoolManager } from '~/types';

import { ThunkAPI } from '~/store';

const fetchPoolManagers = createAsyncThunk<
  { elements: { [key: string]: PoolManager } },
  { factoryService: PoolManagerFactoryService; poolManagerService: PoolManagerService },
  ThunkAPI
>('poolManagers/fetch', async ({ factoryService, poolManagerService }) => {
  const poolManagerAddresses = await factoryService.fetchPoolManagerAddresses();
  const poolManagers = await Promise.all(poolManagerAddresses.map((ad) => poolManagerService.fetchPoolManager(ad)));
  const poolManagersMap = Object.fromEntries(poolManagers.map((pool) => [pool.address, pool]));
  return { elements: poolManagersMap };
});

const claimRewards = createAsyncThunk<
  void,
  { poolManagerAddress: Address; poolManagerService: PoolManagerService; userAddress: Address },
  ThunkAPI
>('poolManager/claimRewards', async ({ poolManagerAddress, poolManagerService, userAddress }) => {
  await poolManagerService.claimRewards(poolManagerAddress, userAddress);
});

export const PoolManagersActions = {
  fetchPoolManagers,
  claimRewards,
};
