import { abi as IPoolManagerFactoryABI } from '@price-oracle/interfaces/abi/IPoolManagerFactory.json';
import { useContract, useProvider } from 'wagmi';

import { getConfig } from '~/config';
import { Address } from '~/types';

export class PoolManagerFactoryService {
  provider = useProvider();

  poolManagerFactoryContract = useContract({
    address: getConfig().ADDRESSES.deployed.POOL_MANAGER_FACTORY,
    abi: IPoolManagerFactoryABI,
    signerOrProvider: this.provider,
  });

  async fetchPoolManagerAddresses(): Promise<string[]> {
    const pmCount = await this.poolManagerFactoryContract?.callStatic.childrenCount();

    const requests: [number, number][] = [];

    for (let i = 0; i < pmCount; i += 11) {
      requests.push([i, Math.min(pmCount, i + 10)]);
    }

    const calls = requests.map((r) => this.poolManagerFactoryContract!.callStatic.listChildren(r[0], r[1]));

    return (await Promise.all(calls)).flat();
  }

  async getPoolManagerAddress(tokenAddress: Address, feeAmount: number): Promise<Address> {
    return await this.poolManagerFactoryContract?.callStatic.getPoolManagerAddress(tokenAddress, feeAmount);
  }
}
