import { abi as ILockManager } from '@price-protocol/interfaces/abi/ILockManager.json';
import { ethers } from 'ethers';
import { useProvider } from 'wagmi';

export class LockManagerService {
  provider = useProvider();

  async fetchUserLockedAmount(lockManagerAddress: string, userAddress: string) {
    const lockManagerContract = new ethers.Contract(lockManagerAddress, ILockManager, this.provider);

    return await lockManagerContract.callStatic.getBalance(userAddress);
  }
}
