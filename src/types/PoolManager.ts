import { Address } from './Blockchain';
import { Token } from './Token';

export interface PoolManager {
  address: Address;
  fee: string;
  token: Token;
  lockManagerAddress: Address;
  rewards:
    | {
        ethReward: string;
        tokenReward: string;
      }
    | undefined;
  poolLiquidity: string;
  userSeedBalance: string | undefined;
  isWethToken0: boolean;
}

export interface PoolAndLockManager {
  poolManagerAddress: Address;
  fee: string;
  isWethToken0: boolean;
  poolManagerRewards:
    | {
        ethReward: string;
        tokenReward: string;
      }
    | undefined;
  poolLiquidity: string;
  userSeedBalance: string | undefined;
  lockManagerAddress: Address;
  pool: Address;
  locked: string;
  lockManagerRewards:
    | {
        ethReward: string;
        tokenReward: string;
      }
    | undefined;
  tokenPerEth: string;
  token: Token;
}
