import hre, { ethers } from 'hardhat';
import { BigNumber } from 'ethers';
import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { impersonate, toUnit, setBalance } from './utils';
import { address } from './constants';
import { abi as IPoolManagerFactoryABI } from '@price-oracle/interfaces/abi/IPoolManagerFactory.json';
import { IPoolManagerFactory } from '@price-oracle/interfaces/ethers-v5/IPoolManagerFactory';
import { IPoolManager } from '@price-oracle/interfaces/ethers-v5/IPoolManager';
import { abi as IPoolManagerABI } from '@price-oracle/interfaces/abi/IPoolManager.json';
import { abi as IPriceOracleABI } from '@price-oracle/interfaces/abi/IPriceOracle.json';
import { abi as ILockManagerABI } from '@price-oracle/interfaces/abi/ILockManager.json';
import {
  maxLiquidityForAmounts,
  computePoolAddress,
  encodeSqrtRatioX96,
} from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';
import jsbi from 'jsbi';
import { ILockManager } from '@price-oracle/interfaces/ethers-v5/ILockManager';

/**
 * Deploy Pools Script
 *
 * The goal of this script is to populate the protocol with pools.
 *
 * Requirements:
 *  1. Run `yarn start` here to start a mainnet fork
 *  2. Run `yarn deploy:local` in the backend repository to deploy the contracts to the fork
 *
 * In order to create new pools, the script will:
 *    1. Wraps WETH to the rich wallet
 *    2. For every defined uni v3 pool, get some non-weth tokens from a whale
 *    3. For every defined uni v3 pool, create a pool manager with WETH and the other token
 */
(async () => {
  const [governance, richWallet] = await hre.ethers.getSigners();

  // get needed contracts and addresses
  const { vsp, jpyc, weth, dai, kp3r, usdt, usdc, uniswapV3Factory } =
    getMainnetSdk(richWallet);
  const feeForPriceWethPool = 3000;

  const poolManagerFactory = (await hre.ethers.getContractAt(
    IPoolManagerFactoryABI,
    address.deployed.POOL_MANAGER_FACTORY
  ));

  // calculate the pool manager address for transfer approvals
  const poolManagerAddress = await poolManagerFactory.getPoolManagerAddress(
    kp3r.address,
    500
  );

  let poolManager = (await ethers.getContractAt(
    IPoolManagerABI,
    poolManagerAddress
  )) as unknown as IPoolManager;

  const lockManagerAddresss = await poolManager.lockManager();

  let lockManager = (await ethers.getContractAt(
    ILockManagerABI,
    lockManagerAddresss
  )) as unknown as ILockManager;

  console.log((await lockManager.totalSupply()).toString());
})();
