import hre, { ethers } from 'hardhat';
import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { abi as IPoolManagerABI } from '@price-oracle/interfaces/abi/IPoolManager.json';
import { abi as IPoolManagerFactoryABI } from '@price-oracle/interfaces/abi/IPoolManagerFactory.json';
import { IPoolManager } from '@price-oracle/interfaces/ethers-v5/IPoolManager';
import { Token } from '@uniswap/sdk-core';
import {
  computePoolAddress,
  encodeSqrtRatioX96, maxLiquidityForAmounts
} from '@uniswap/v3-sdk';
import jsbi from 'jsbi';

import { address } from './constants';
import { impersonate, setBalance, toWei } from './utils';

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

  const poolManagerFactory = (await hre.ethers.getContractAt(
    IPoolManagerFactoryABI,
    address.deployed.POOL_MANAGER_FACTORY
  ));

  // give the deployer a lot of WETH
  await setBalance(richWallet.address, toWei(100_000));
  await weth.connect(richWallet).deposit({ value: toWei(50_000).toFixed() });

  const pairsToCreate = [
    {
      token: kp3r,
      fee: 500,
      wethAmount: 100,
      tokenAmount: 1000,
      whale: address.KP3R_WHALE,
    },
    // {
    //   token: weth,
    //   fee: 500,
    //   wethAmount: 100,
    //   tokenAmount: 150,
    //   whale: address.WETH_WHALE,
    // },
    // {
    //   token: weth,
    //   fee: feeForPriceWethPool,
    //   wethAmount: 100,
    //   tokenAmount: 150,
    //   whale: address.WETH_WHALE,
    // },
    {
      token: dai,
      fee: 500,
      wethAmount: 1000,
      tokenAmount: 800,
      whale: address.DAI_WHALE,
    },
    // TODO: why is this commented out?
    // {
    //   token: usdt,
    //   fee: 500,
    //   wethAmount: 1000,
    //   tokenAmount: 4000,
    //   whale: address.USDT_WHALE
    // },
    {
      token: vsp,
      fee: 3000,
      wethAmount: 5000,
      tokenAmount: 3000,
      whale: address.VSP_WHALE,
    },
    {
      token: vsp,
      fee: 500,
      wethAmount: 5000,
      tokenAmount: 3000,
      whale: address.VSP_WHALE,
    },
    // TODO: why doesn't this work?
    // {
    //   token: jpyc,
    //   fee: 500,
    //   wethAmount: 5000,
    //   tokenAmount: 700,
    //   whale: address.JPYC_WHALE,
    // },
    // TODO: why doesn't this work?
    // {
    //   token: usdc,
    //   fee: 500,
    //   wethAmount: 100,
    //   tokenAmount: 800,
    //   whale: address.USDC_WHALE,
    // },
  ];

  for (let index = 0; index < pairsToCreate.length; index++) {
    let pair = pairsToCreate[index];
    let token = pair.token;
    let symbol = await token.symbol();

    // TODO: Pools that are already deployed on uniswap will fail for now
    const deployedPool = await uniswapV3Factory.getPool(token.address, weth.address, pair.fee);
    console.log(deployedPool);

    try {
      // give ETH and non-weth token to the deployer
      await setBalance(pair.whale, toWei(10));
      const whale = await impersonate(pair.whale);
      const balance = await token.balanceOf(pair.whale);
      await token.connect(whale).transfer(richWallet.address, balance);

      // calculate the pool manager address for transfer approvals
      const poolManagerAddress = await poolManagerFactory.getPoolManagerAddress(
        token.address,
        pair.fee
      );

      // allow the pool manager to transfer WETH and non-weth token to the pool
      // some tokens forbid changing the approval if it's > 0
      await token.connect(richWallet).approve(poolManagerAddress, 0);
      await weth.connect(richWallet).approve(poolManagerAddress, 0);
      await token
        .connect(richWallet)
        .approve(poolManagerAddress, ethers.constants.MaxUint256);
      await weth
        .connect(richWallet)
        .approve(poolManagerAddress, ethers.constants.MaxUint256);

      const poolAddress = computePoolAddress({
        factoryAddress: uniswapV3Factory.address,
        tokenA: new Token(0, token.address, await token.decimals()),
        tokenB: new Token(0, weth.address, await weth.decimals()),
        fee: pair.fee,
      });

      const isWethToken0 = weth.address < token.address;

      // TODO: make calculations for the sqrtPrice to make sense
      const sqrtPriceX96 = encodeSqrtRatioX96(1, 1).toString();

      // create the pool manager, initialize the pool and add a full range position
      const liquidity = maxLiquidityForAmounts(
        encodeSqrtRatioX96(1, 1),
        encodeSqrtRatioX96(100, 110),
        encodeSqrtRatioX96(110, 100),
        jsbi.BigInt(isWethToken0 ? pair.wethAmount : pair.tokenAmount),
        jsbi.BigInt(isWethToken0 ? pair.tokenAmount : pair.wethAmount),
        true
      ).toString();

      await poolManagerFactory
      .connect(richWallet)
        .createPoolManager(
          token.address,
          pair.fee,
          liquidity,
          sqrtPriceX96
        );

      let pairPoolManagerAddress =
        await poolManagerFactory.getPoolManagerAddress(token.address, pair.fee);
      let poolManager = (await ethers.getContractAt(
        IPoolManagerABI,
        pairPoolManagerAddress
      )) as unknown as IPoolManager;
      const lockManagerAddress = await poolManager.lockManager();

      console.log(
        `POOL_MANAGER_${symbol}_WETH_${pair.fee}: '${poolManagerAddress}'`
      );
      console.log(
        `LOCK_MANAGER_${symbol}_WETH_${pair.fee}: '${lockManagerAddress}'`
      );

      // Transfer remaining balance so that user has tokens to test
      const remainingBalance = await token.balanceOf(richWallet.address);
      await token.connect(richWallet).transfer(governance.address, remainingBalance);
    } catch (e: unknown) {
      console.log(`Couldn't deploy pool manager ${symbol}-WETH: ${e}`);
    }
  }

  // Give weth balance to governance to be able to lock
  const gov = await impersonate(governance.address);
  await weth.connect(gov).deposit({ value: toWei(10.123123123123123123).toFixed() });
  const balance = await weth.balanceOf(governance.address);
})();
