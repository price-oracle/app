import { Address } from './Blockchain';

export interface LockManager {
  address: Address;
  locked: string | undefined;
  rewards:
    | {
        ethReward: string;
        tokenReward: string;
        tokenPerEth: string;
      }
    | undefined;
}
