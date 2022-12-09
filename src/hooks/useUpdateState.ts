import { useCallback, useEffect, useState } from 'react';

import { LockManagersActions, PoolManagersActions } from '~/store';
import { PricesActions } from '~/store/prices/prices.actions';
import { useAppDispatch, useAppSelector } from './store';
import useContracts from './useContracts';

export const useUpdateState = () => {
  const [time, setTime] = useState(Date.now());
  const dispatch = useAppDispatch();
  const { poolManagerFactoryService, poolManagerService, lockManagerService, uniswapService } = useContracts();
  const poolManagers = useAppSelector((state) => state.poolManagers.elements);

  const updateLockState = useCallback(() => {
    if (poolManagers)
      dispatch(
        LockManagersActions.fetchLockManagers({
          lockManagerService,
          poolManagers,
        })
      );
  }, [poolManagers, lockManagerService]);

  const updatePoolState = useCallback(() => {
    dispatch(PoolManagersActions.fetchPoolManagers({ factoryService: poolManagerFactoryService, poolManagerService }));
  }, [poolManagerService, poolManagerFactoryService]);

  const updateEthPrice = useCallback(() => {
    dispatch(PricesActions.getEthPrice({ uniswapService }));
  }, [uniswapService]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
      updateEthPrice();
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return {
    updateLockState,
    updatePoolState,
    updateEthPrice,
  };
};

export default useUpdateState;
