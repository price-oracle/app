import { Address } from './Blockchain';

export interface PoolManager {
  address: Address;
  fee: string;
  token: {
    tokenAddress: string;
    tokenSymbol: string;
  };
  lockManagerAddress: Address;
  rewards: {
    ethReward: string;
    tokenReward: string;
  };
}
