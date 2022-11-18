import { FeeTier } from '~/types/FeeTiers';

export const FEE_TIERS: { [key: string]: FeeTier } = {
  '1%': { hint: 'Best for exotic pairs', fee: 10000, created: false, label: '1%' },
  '0_3%': { hint: 'Best for most pairs', fee: 3000, created: false, label: '0.3%' },
  '0_05%': { hint: 'Best for stable pairs', fee: 500, created: false, label: '0.05%' },
  '0_01%': { hint: 'Best for very stable pairs', fee: 100, created: false, label: '0.01%' },
};
