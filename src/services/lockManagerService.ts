import { abi as ILockManager } from '@price-oracle/interfaces/abi/ILockManager.json';
import { useProvider, useAccount, useSigner } from 'wagmi';
import { Contract } from 'ethers-multicall';
import { ethers } from 'ethers';

import { ERC20Service } from '~/services/erc20Service';
import { PoolManager } from '~/types/PoolManager';
import { LockManager } from '~/types/LockManager';
import { TxService } from './txService';
import { MultiCallService } from './multicallService';

export class LockManagerService {
  txService = new TxService();
  provider = useProvider();
  account = useAccount();
  signer = useSigner();
  erc20Service = new ERC20Service();
  multiCallService = new MultiCallService();

  async fetchUserLockedAmount(poolManager: PoolManager): Promise<LockManager> {
    const lockManagerContract = new Contract(poolManager.lockManagerAddress, ILockManager);

    const balanceCall = lockManagerContract.balanceOf(this.account.address);
    const claimableCall = lockManagerContract.claimable(this.account.address);

    const [balance, claimable] = await this.multiCallService.multicall([balanceCall, claimableCall]);

    return {
      address: poolManager.lockManagerAddress,
      locked: balance.toString(),
      rewards: { tokenReward: claimable[0].toString(), ethReward: claimable[1].toString() },
    };
  }

  async lock(lockManagerAddress: string, amount: string) {
    if (this.signer?.data) {
      const lockManagerContract = new ethers.Contract(lockManagerAddress, ILockManager, this.signer?.data);
      return this.txService.handleTx(lockManagerContract.lock(amount));
    }
  }

  async claimRewards(lockManagerAddress: string, to: string) {
    if (this.signer?.data) {
      const lockManagerContract = new ethers.Contract(lockManagerAddress, ILockManager, this.signer?.data);
      return this.txService.handleTx(lockManagerContract.claimRewards(to));
    }
  }
}
