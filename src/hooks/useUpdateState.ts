import { useCallback, useState, useEffect } from 'react';

import { PoolManagerFactoryService, PoolManagerService, LockManagerService, UniswapService } from '~/services';
import { LockManagersActions, PoolManagersActions } from '~/store';
import { PricesActions } from '~/store/prices/prices.actions';
import { useAppDispatch, useAppSelector } from './store';

export const useUpdateState = () => {
  const [time, setTime] = useState(Date.now());
  const dispatch = useAppDispatch();
  // TODO Add a place for them ,in the context or someplace to have them as singleton class
  const poolManagerFactoryService = new PoolManagerFactoryService();
  const poolManagerService = new PoolManagerService();
  const lockManagerService = new LockManagerService();
  const uniswapService = new UniswapService();
  const poolManagers = useAppSelector((state) => state.poolManagers.elements);

  const updateLockState = useCallback(() => {
    if (poolManagers)
      dispatch(
        LockManagersActions.fetchLockManagers({
          lockManagerService,
          poolManagers,
        })
      );
  }, [poolManagers]);

  const updatePoolState = useCallback(() => {
    dispatch(PoolManagersActions.fetchPoolManagers({ factoryService: poolManagerFactoryService, poolManagerService }));
  }, []);

  const updateEthPrice = useCallback(() => {
    dispatch(PricesActions.getEthPrice({ uniswapService }));
  }, []);

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
