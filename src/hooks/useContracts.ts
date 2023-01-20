import { Signer } from 'ethers';
import { useAccount, useNetwork, useProvider, useSigner } from 'wagmi';

import {
  ERC20Service,
  LockManagerService,
  MultiCallService,
  PoolManagerFactoryService,
  PoolManagerService,
  TxService,
  UniswapService,
} from '~/services';
import { getConstants } from '~/config/constants';

export const useContracts = () => {
  const { address } = useAccount();
  const provider = useProvider();
  const signer = useSigner();
  const signerData = signer?.data as Signer | undefined;
  const { chain } = useNetwork();
  const defaultChainId = getConstants().DEFAULT_CHAIN_ID;

  const multiCallService = new MultiCallService(provider);
  const txService = new TxService(chain?.id || defaultChainId);
  const erc20Service = new ERC20Service(address, signerData, txService, multiCallService, provider);
  const uniswapService = new UniswapService(multiCallService, provider);

  const poolManagerFactoryService = new PoolManagerFactoryService(txService, provider, signerData);
  const poolManagerService = new PoolManagerService(address, signerData, txService, multiCallService, erc20Service);
  const lockManagerService = new LockManagerService(
    address,
    provider,
    signerData,
    txService,
    erc20Service,
    multiCallService,
    uniswapService
  );

  return {
    poolManagerFactoryService,
    poolManagerService,
    lockManagerService,
    uniswapService,
    erc20Service,
    multiCallService,
  };
};

export default useContracts;
