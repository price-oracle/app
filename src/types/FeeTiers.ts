import { Address } from './Blockchain';

export type FeeTier = {
  hint: string;
  fee: number;
  created: boolean;
  label: string;
};

export interface PoolFees {
  [key: string]: Address;
}
