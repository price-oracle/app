import { abi as IPoolManagerFactoryABI } from '@price-oracle/interfaces/abi/IPoolManagerFactory.json';
import { Provider } from '@wagmi/core';
import { BigNumber, ethers, Signer } from 'ethers';

import { getConfig } from '~/config';
import { TxService } from '~/services';
import { Address } from '~/types';

export class PoolManagerFactoryService {
  provider: Provider;
  signer: Signer | undefined;
  factoryAddress = getConfig().ADDRESSES.deployed.POOL_MANAGER_FACTORY;
  txService: TxService;

  constructor(txService: TxService, provider: Provider, signer: Signer | undefined) {
    this.provider = provider;
    this.txService = txService;
    this.signer = signer;
  }

  async fetchPoolManagerAddresses(): Promise<string[]> {
    const factory = new ethers.Contract(this.factoryAddress, IPoolManagerFactoryABI, this.provider);

    const pmCount = await factory.callStatic.childrenCount();

    const requests: [number, number][] = [];

    for (let i = 0; i < pmCount; i += 11) {
      requests.push([i, Math.min(pmCount, i + 10)]);
    }

    const calls = requests.map((r) => factory.callStatic.listChildren(r[0], r[1]));

    return (await Promise.all(calls)).flat();
  }

  async getPoolManagerAddress(tokenAddress: Address, feeAmount: number): Promise<Address> {
    const factory = new ethers.Contract(this.factoryAddress, IPoolManagerFactoryABI, this.provider);
    return await factory.callStatic.getPoolManagerAddress(tokenAddress, feeAmount);
  }

  async createPoolManager(
    erc20Address: Address,
    erc20Symbol: string,
    fee: number,
    liquidity: BigNumber,
    sqrtPriceX96: BigNumber
  ) {
    if (this.signer) {
      const factory = new ethers.Contract(this.factoryAddress, IPoolManagerFactoryABI, this.signer);
      const createPoolManagerTx = factory.createPoolManager(erc20Address, fee, liquidity, sqrtPriceX96);

      const successMessage = `Succesfully created ${erc20Symbol} oracle`;
      const errorMessage = `Failed to create ${erc20Symbol} oracle`;

      return this.txService.handleTx(createPoolManagerTx, successMessage, errorMessage);
    }
  }
}
