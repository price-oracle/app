import { ethers } from 'ethers';

import { FeeTier, Token } from '~/types';
import { MultiCallService } from '~/services';
import { getConfig } from '~/config';

export const token: Token = {
  address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  name: 'Token Test',
  symbol: 'TST-TKN',
  decimals: 18,
  logoURI: 'test',
};

export const feeTier: FeeTier = { hint: 'Best for exotic pairs', fee: 10000, label: '1%' };

export const rpcUrl = process.env.VITE_CUSTOM_RPC; //'http://127.0.0.1:8545/';
export const deployerAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
export const depositorAddress = '0xb95Bd960bFfEe856707bCA12E59b12AFf966477B';
export const wethToken = {
  address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  name: 'Wrapped Ether',
  symbol: 'WETH',
  decimals: 18,
  logoURI:
    'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
};
export const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
export const multicallService = new MultiCallService(provider);
export const mock: any = {};

export let haveFork = false;
export let poolManagerFactoryContract = false;

try {
  haveFork = !!(await provider.getBlockNumber());
  poolManagerFactoryContract = (await provider.getCode(getConfig().ADDRESSES.deployed.POOL_MANAGER_FACTORY)) !== '0x';
} catch (error) {
  console.log('fork not detected');
}
