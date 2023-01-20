import { useCallback } from 'react';
import { useAccount } from 'wagmi';

import { PoolManagersActions, useAppDispatch, PricesActions } from '~/store';
import useContracts from './useContracts';

export const useUpdateState = () => {
  const dispatch = useAppDispatch();
  const { poolManagerFactoryService, uniswapService } = useContracts();
  const { address: userAddress } = useAccount();

  const updatePoolAndLockState = useCallback(() => {
    dispatch(
      PoolManagersActions.fetchPoolAndLockManagers({
        factoryService: poolManagerFactoryService,
        userAddress: userAddress,
      })
    );
  }, [poolManagerFactoryService, userAddress]);

  const updateEthPrice = useCallback(() => {
    dispatch(PricesActions.getEthPrice({ uniswapService }));
  }, [uniswapService]);

  return {
    updatePoolAndLockState,
    updateEthPrice,
  };
};

export default useUpdateState;
