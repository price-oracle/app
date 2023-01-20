import { Contract } from 'ethers-multicall';
import { abi as IPoolManagerFactoryABI } from '@price-oracle/interfaces/abi/IPoolManagerFactory.json';
import { isUndefined } from 'lodash';

import { Address, OraclesCreated, PoolManager, PoolManagerAddresses } from '~/types';
import { FEE_TIERS } from '~/config/constants/feeTiers';
import { MultiCallService } from '~/services';

const fees = Object.keys(FEE_TIERS);

export const getPoolManagerAddresses = async (
  factoryAddress: Address,
  tokenAddress: Address,
  multicallService: MultiCallService
): Promise<PoolManagerAddresses> => {
  const calls = fees.map((fee) => {
    const factory = new Contract(factoryAddress, IPoolManagerFactoryABI);
    return factory.getPoolManagerAddress(tokenAddress, fee);
  });
  const pmAddresses = await multicallService.multicall(calls);
  return Object.fromEntries(fees.map((fee, index) => [fee, pmAddresses[index]]));
};

export const getOracles = (
  pmAddresses: { [fee: number]: Address },
  poolManagers: { [key: string]: PoolManager }
): OraclesCreated => {
  const addresses = Object.entries(pmAddresses);
  const isOracleCreated = addresses.map((address) => !isUndefined(poolManagers[address[1]]));
  return Object.fromEntries(fees.map((fee, index) => [fee, isOracleCreated[index]]));
};
