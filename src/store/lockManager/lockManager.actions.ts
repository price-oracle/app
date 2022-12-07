import { createAsyncThunk } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';

import { Address, LockManager, PoolManager } from '~/types';
import { LockManagerService } from '~/services';

import { ThunkAPI } from '~/store';

const fetchLockManagers = createAsyncThunk<
  { elements: { [key: string]: LockManager } },
  {
    lockManagerService: LockManagerService;
    poolManagers: { [key: string]: PoolManager };
    usdPerEth: BigNumber;
  },
  ThunkAPI
>('lockManager/fetch', async ({ lockManagerService, poolManagers, usdPerEth }) => {
  const poolManagerList = Object.values(poolManagers);

  //  we can change it to a 'limited multicall': 10 multicalls of 10 fetchUserLockedAmount if 100 poolManagers
  //  to reduce rpc calls
  const lockManagers = await Promise.all(
    poolManagerList.map((poolManager) => lockManagerService.fetchUserLockedAmount(poolManager, usdPerEth))
  );
  const lockManagersMap = Object.fromEntries(lockManagers.map((locked) => [locked.address, locked]));

  return { elements: lockManagersMap };
});

const claimRewards = createAsyncThunk<
  void,
  { lockManagerAddress: Address; lockManagerService: LockManagerService; userAddress: Address },
  ThunkAPI
>('lockManager/claimRewards', async ({ lockManagerAddress, lockManagerService, userAddress }) => {
  await lockManagerService.claimRewards(lockManagerAddress, userAddress);
});

export const LockManagersActions = {
  fetchLockManagers,
  claimRewards,
};
