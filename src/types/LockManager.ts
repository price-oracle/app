import { Address } from './Blockchain';

export interface LockManager {
  address: Address;
  locked: string | undefined;
  rewards:
    | {
        ethReward: string;
        ethRewardInUsd: string;
        tokenReward: string;
        tokenRewardInUsd: string;
      }
    | undefined;
}
