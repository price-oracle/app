import { abi as IPoolManagerFactoryABI } from '@price-oracle/interfaces/abi/IPoolManagerFactory.json';
import { BigNumber, ethers } from 'ethers';
import { useContract, useProvider, useSigner } from 'wagmi';

import { getConfig } from '~/config';
import { Address } from '~/types';
import { TxService } from '~/services';

export class PoolManagerFactoryService {
  provider = useProvider();
  signer = useSigner();
  factoryAddress = getConfig().ADDRESSES.deployed.POOL_MANAGER_FACTORY;
  txService = new TxService();

  poolManagerFactoryContract = useContract({
    address: this.factoryAddress,
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

  async createPoolManager(
    erc20Address: Address,
    erc20Symbol: string,
    fee: number,
    liquidity: BigNumber,
    sqrtPriceX96: BigNumber
  ) {
    if (this.signer?.data) {
      const factory = new ethers.Contract(this.factoryAddress, IPoolManagerFactoryABI, this.signer?.data);
      const createPoolManagerTx = factory.createPoolManager(erc20Address, fee, liquidity, sqrtPriceX96);

      const successMessage = `Succesfully created ${erc20Symbol} pool`;
      const errorMessage = `Failed to create ${erc20Symbol} pool`;

      return this.txService.handleTx(createPoolManagerTx, successMessage, errorMessage);
    }
  }
}
