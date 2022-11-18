export interface LockManager {
  address: string;
  locked: string;
  rewards: {
    ethReward: string;
    tokenReward: string;
  };
}
