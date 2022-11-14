import { abi as IPoolManager } from '@price-protocol/interfaces/abi/IPoolManager.json';
import { ethers } from 'ethers';
import { useProvider } from 'wagmi';
import { PoolManager } from '~/types/PoolManager';
import { ERC20Service } from './';

export class PoolManagerService {
  provider = useProvider();
  erc20Service = new ERC20Service();

  async fetchPoolManager(poolManagerAddress: string): Promise<PoolManager> {
    const poolManagerContract = new ethers.Contract(poolManagerAddress, IPoolManager, this.provider);

    const [fee, tokenAddress, lockManagerAddress] = await Promise.all([
      poolManagerContract.callStatic.fee(),
      poolManagerContract.callStatic.token(),
      poolManagerContract.callStatic.lockManager(),
    ]);

    const tokenSymbol = await this.erc20Service.fetchTokenSymbol(tokenAddress);

    return { address: poolManagerAddress, fee, token: { tokenAddress, tokenSymbol }, lockManagerAddress };
  }
}
