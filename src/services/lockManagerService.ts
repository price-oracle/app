import { abi as ILockManager } from '@price-oracle/interfaces/abi/ILockManager.json';
import { useProvider, useAccount, useSigner } from 'wagmi';
import { Contract } from 'ethers-multicall';
import { ethers, utils } from 'ethers';

import { ERC20Service, TxService, MultiCallService } from '~/services';
import { PoolManager } from '~/types/PoolManager';
import { LockManager } from '~/types/LockManager';
import { Address } from '~/types/Blockchain';

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

  async lock(lockManagerAddress: Address, amount: string) {
    if (this.signer?.data) {
      const lockManagerContract = new ethers.Contract(lockManagerAddress, ILockManager, this.signer?.data);
      const successMessage = `Successfully locked ${utils.formatEther(amount)} ETH`;
      const errorMessage = `Failed to lock ${utils.formatEther(amount)} ETH`;

      return this.txService.handleTx(lockManagerContract.lock(amount), successMessage, errorMessage);
    }
  }

  async claimRewards(lockManagerAddress: Address, to: Address) {
    if (this.signer?.data) {
      const lockManagerContract = new ethers.Contract(lockManagerAddress, ILockManager, this.signer?.data);
      const successMessage = 'Rewards claimed';
      const errorMessage = 'Failed to claim rewards';

      return this.txService.handleTx(lockManagerContract.claimRewards(to), successMessage, errorMessage);
    }
  }
}
