export interface PoolManager {
  address: string;
  fee: string;
  token: {
    tokenAddress: string;
    tokenSymbol: string;
  };
  lockManagerAddress: string;
}
