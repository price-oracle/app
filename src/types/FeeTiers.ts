import BigNumber from 'bignumber.js';
import { Address } from './Blockchain';

export type FeeTier = {
  hint: string;
  fee: number;
  label: string;
};

export interface UniswapPool {
  address: Address;
  pricing: BigNumber;
}
