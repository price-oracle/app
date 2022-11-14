import hre, { ethers } from 'hardhat';
import { BigNumber } from 'ethers';
import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { impersonate, toUnit, setBalance } from './utils';
import { address } from './constants';
import { abi as IPriceTokenABI } from '@price-protocol/interfaces/abi/IPriceToken.json';
import { abi as IPoolManagerFactoryABI } from '@price-protocol/interfaces/abi/IPoolManagerFactory.json';
import { IPoolManagerFactory } from '@price-protocol/interfaces/ethers-v5/IPoolManagerFactory';
import { IPoolManager } from '@price-protocol/interfaces/ethers-v5/IPoolManager';
import { abi as IPoolManagerABI } from '@price-protocol/interfaces/abi/IPoolManager.json';
import { IPriceToken } from '@price-protocol/interfaces/ethers-v5/IPriceToken';
import {
  maxLiquidityForAmounts,
  computePoolAddress,
  encodeSqrtRatioX96,
} from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';
import jsbi from 'jsbi';

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
 *    1. Mints PRICE to the rich wallet
 *    2. For every defined uni v3 pool, get some non-price tokens from a whale
 *    3. For every defined uni v3 pool, create a pool manager with PRICE and the other token
 */
(async () => {
  const [governance, richWallet] = await hre.ethers.getSigners();

  // get needed contracts and addresses
  const { vsp, jpyc, weth, dai, kp3r, usdt, usdc, uniswapV3Factory } =
    getMainnetSdk(richWallet);
  const feeForPriceWethPool = 3000;

  const price = (await hre.ethers.getContractAt(
    IPriceTokenABI,
    address.deployed.PRICE
  )) as unknown as IPriceToken;

  const poolManagerFactory = (await hre.ethers.getContractAt(
    IPoolManagerFactoryABI,
    address.deployed.POOL_MANAGER_FACTORY
  )) as unknown as IPoolManagerFactory;

  // give the deployer a lot of PRICE
  await price.connect(governance).addMinter(richWallet.address);
  await price.connect(richWallet).mint(richWallet.address, toUnit(100_000));

  const pairsToCreate = [
    {
      token: kp3r,
      fee: 500,
      priceAmount: 100,
      tokenAmount: 1000,
      whale: address.KP3R_WHALE,
    },
    {
      token: weth,
      fee: 500,
      priceAmount: 100,
      tokenAmount: 150,
      whale: address.WETH_WHALE,
    },
    {
      token: weth,
      fee: feeForPriceWethPool,
      priceAmount: 100,
      tokenAmount: 150,
      whale: address.WETH_WHALE,
    },
    {
      token: dai,
      fee: 500,
      priceAmount: 1000,
      tokenAmount: 800,
      whale: address.DAI_WHALE,
    },
    // TODO: why is this commented out?
    // {
    //   token: usdt,
    //   fee: 500,
    //   priceAmount: 1000,
    //   tokenAmount: 4000,
    //   whale: address.USDT_WHALE
    // },
    {
      token: vsp,
      fee: 3000,
      priceAmount: 5000,
      tokenAmount: 3000,
      whale: address.VSP_WHALE,
    },
    {
      token: vsp,
      fee: 500,
      priceAmount: 5000,
      tokenAmount: 3000,
      whale: address.VSP_WHALE,
    },
    // TODO: why doesn't this work?
    // {
    //   token: jpyc,
    //   fee: 500,
    //   priceAmount: 5000,
    //   tokenAmount: 700,
    //   whale: address.JPYC_WHALE,
    // },
    // TODO: why doesn't this work?
    // {
    //   token: usdc,
    //   fee: 500,
    //   priceAmount: 100,
    //   tokenAmount: 800,
    //   whale: address.USDC_WHALE,
    // },
  ];

  for (let index = 0; index < pairsToCreate.length; index++) {
    let pair = pairsToCreate[index];
    let token = pair.token;
    let symbol = await token.symbol();

    try {
      // give ETH and non-price token to the deployer
      await setBalance(pair.whale, toUnit(10));
      const whale = await impersonate(pair.whale);
      const balance = await token.balanceOf(pair.whale);
      await token.connect(whale).transfer(richWallet.address, balance);

      // calculate the pool manager address for transfer approvals
      const poolManagerAddress = await poolManagerFactory.getPoolManagerAddress(
        token.address,
        pair.fee
      );

      // allow the pool manager to transfer PRICE and non-price token to the pool
      // some tokens forbid changing the approval if it's > 0
      await token.connect(richWallet).approve(poolManagerAddress, 0);
      await token
        .connect(richWallet)
        .approve(poolManagerAddress, ethers.constants.MaxUint256);
      await price
        .connect(richWallet)
        .approve(poolManagerAddress, ethers.constants.MaxUint256);

      const poolAddress = computePoolAddress({
        factoryAddress: uniswapV3Factory.address,
        tokenA: new Token(0, token.address, await token.decimals()),
        tokenB: new Token(0, address.deployed.PRICE, await token.decimals()),
        fee: pair.fee,
      });

      const isPriceToken0 = address.deployed.PRICE < token.address;

      // TODO: make calculations for the sqrtPrice to make sense
      const sqrtPriceX96 = encodeSqrtRatioX96(1, 1).toString();

      // create the pool manager, initialize the pool and add a full range position
      const liquidity = maxLiquidityForAmounts(
        encodeSqrtRatioX96(1, 1),
        encodeSqrtRatioX96(100, 110),
        encodeSqrtRatioX96(110, 100),
        jsbi.BigInt(isPriceToken0 ? pair.priceAmount : pair.tokenAmount),
        jsbi.BigInt(isPriceToken0 ? pair.tokenAmount : pair.priceAmount),
        true
      ).toString();

      await poolManagerFactory
        .connect(richWallet)
        .createPoolManager(
          token.address,
          pair.fee,
          BigNumber.from(liquidity),
          BigNumber.from(sqrtPriceX96)
        );

      let pairPoolManagerAddress =
        await poolManagerFactory.getPoolManagerAddress(token.address, pair.fee);
      let poolManager = (await ethers.getContractAt(
        IPoolManagerABI,
        pairPoolManagerAddress
      )) as unknown as IPoolManager;
      const lockManagerAddress = await poolManager.lockManager();

      console.log();
      console.log(
        `POOL_MANAGER_${symbol}_PRICE_${pair.fee}: '${poolManagerAddress}'`
      );
      console.log(
        `LOCK_MANAGER_${symbol}_PRICE_${pair.fee}: '${lockManagerAddress}'`
      );
    } catch (e: unknown) {
      console.log(`Couldn't deploy pool manager ${symbol}-PRICE: ${e}`);
    }
  }
})();
