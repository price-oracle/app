import { Address } from './Blockchain';
import { Token } from './Token';

export interface PoolManager {
  address: Address;
  fee: string;
  token: Token;
  lockManagerAddress: Address;
  rewards: {
    ethReward: string;
    tokenReward: string;
  };
}
