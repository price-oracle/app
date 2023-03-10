export type Network =
  | 'mainnet'
  | 'morden'
  | 'ropsten'
  | 'rinkeby'
  | 'kovan'
  | 'fantom'
  | 'arbitrum'
  | 'optimism'
  | 'goerli'
  | 'other';

export type Address = string;

export interface OraclesCreated {
  [key: string]: boolean;
}

export interface PoolManagerAddresses {
  [key: string]: Address;
}
