import { abi as ILockManager } from '@price-oracle/interfaces/abi/ILockManager.json';
import { useProvider, useAccount, useSigner } from 'wagmi';
import { ethers } from 'ethers';

import { ERC20Service } from '~/services/erc20Service';
import { PoolManager } from '~/types/PoolManager';
import { LockManager } from '~/types/LockManager';
import { TxService } from './txService';

export class LockManagerService {
  txService = new TxService();
  provider = useProvider();
  account = useAccount();
  signer = useSigner();
  erc20Service = new ERC20Service();

  async fetchUserLockedAmount(poolManagers: PoolManager): Promise<LockManager> {
    const lockManagerContract = new ethers.Contract(poolManagers.lockManagerAddress, ILockManager, this.provider);
    const balance = await lockManagerContract.callStatic.balanceOf(this.account.address);
    const claimable = await lockManagerContract.callStatic.claimable(this.account.address);

    return {
      address: poolManagers.address,
      locked: balance.toString(),
      rewards: { tokenReward: claimable[0].toString(), ethReward: claimable[1].toString() },
    };
  }

  async lock(lockManagerAddress: string, amount: string) {
    if (this.signer?.data) {
      const lockManagerContract = new ethers.Contract(lockManagerAddress, ILockManager, this.signer?.data);
      return this.txService.handleTx(await lockManagerContract.lock(amount));
    }
  }
}
