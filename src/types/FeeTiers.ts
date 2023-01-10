import { BigNumber } from 'ethers';
import { Address } from './Blockchain';

export type FeeTier = {
  hint: string;
  fee: number;
  label: string;
};

export interface UniswapPool {
  address: Address;
  pricing: BigNumber;
  isWethToken0: boolean;
  cardinality: number | undefined;
}

export interface PoolData {
  pricing: BigNumber;
  isWethToken0: boolean;
  cardinality: number | undefined;
}
