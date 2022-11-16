import { ethers } from 'ethers';
import { useProvider, useSigner } from 'wagmi';

import { abi as ILockManager } from '@price-oracle/interfaces/abi/ILockManager.json';
import { TxService } from './txService';

export class LockManagerService {
  txService = new TxService();
  provider = useProvider();
  signer = useSigner();

  async fetchUserLockedAmount(lockManagerAddress: string, userAddress: string) {
    const lockManagerContract = new ethers.Contract(lockManagerAddress, ILockManager, this.provider);

    return await lockManagerContract.callStatic.getBalance(userAddress);
  }

  async lock(lockManagerAddress: string, amount: string) {
    if (this.signer?.data) {
      const lockManagerContract = new ethers.Contract(lockManagerAddress, ILockManager, this.signer?.data);
      return this.txService.handleTx(await lockManagerContract.lock(amount));
    }
  }
}
