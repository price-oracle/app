import hre, { ethers } from 'hardhat';
import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { abi as IPoolManagerABI } from '@price-oracle/interfaces/abi/IPoolManager.json';
import { abi as IPoolManagerFactoryABI } from '@price-oracle/interfaces/abi/IPoolManagerFactory.json';
import { IPoolManager } from '@price-oracle/interfaces/ethers-v5/IPoolManager';
import { encodeSqrtRatioX96, maxLiquidityForAmounts } from '@uniswap/v3-sdk';
import JSBI from 'jsbi';

import { abi as POOL_ABI } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json';

import { address } from './constants';
import { sendUnsignedTx, toWei } from './utils';
import { IPoolManagerFactory } from '@price-oracle/interfaces/ethers-v5/IPoolManagerFactory';

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
  const [signer] = await hre.ethers.getSigners();
  const [governance, richWallet, depositor] = address.ADDRESSES as string[];

  // get needed contracts and addresses
  const { vsp, jpyc, weth, dai, kp3r, usdt, usdc, uniswapV3Factory } = getMainnetSdk(signer);

  const poolManagerFactory = (await hre.ethers.getContractAt(
    IPoolManagerFactoryABI,
    address.deployed.POOL_MANAGER_FACTORY
  )) as unknown as IPoolManagerFactory;

  await sendUnsignedTx({
    from: richWallet,
    to: weth.address,
    data: (await weth.populateTransaction.deposit({ value: toWei(2_000).toFixed() })).data,
  });

  const pairsToCreate = [
    {
      token: kp3r,
      fee: 500,
      wethAmount: '100000000000000000000',
      tokenAmount: '1000000000000000000000',
      whale: address.KP3R_WHALE,
    },
    {
      token: dai,
      fee: 500,
      wethAmount: '250000000000000000000',
      tokenAmount: '2733174259870542442925',
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
      wethAmount: '300000000000000000000',
      tokenAmount: '6138495081650120877675',
      whale: address.VSP_WHALE,
    },
    {
      token: vsp,
      fee: 500,
      wethAmount: '25000000000000000000',
      tokenAmount: '3000000000000000000000',
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

  // 5% slippage to apply for each side of the pricing
  const slippage = JSBI.BigInt(5);
  const total = JSBI.BigInt(100);

  for (let index = 0; index < pairsToCreate.length; index++) {
    let pair = pairsToCreate[index];
    let token = pair.token;
    let symbol = await token.symbol();

    try {
      // give a lot of non-weth token to the deployer
      const balance = await token.balanceOf(pair.whale);
      await sendUnsignedTx({
        from: pair.whale,
        to: token.address,
        data: (await token.populateTransaction.transfer(richWallet, balance)).data,
      });

      // calculate the pool manager address for transfer approvals
      const poolManagerAddress = await poolManagerFactory.getPoolManagerAddress(token.address, pair.fee);

      // allow the pool manager to transfer WETH and non-weth token to the pool
      // some tokens forbid changing the approval if it's > 0
      await sendUnsignedTx({
        from: richWallet,
        to: token.address,
        data: (await token.populateTransaction.approve(poolManagerAddress, 0)).data,
      });

      await sendUnsignedTx({
        from: richWallet,
        to: weth.address,
        data: (await weth.populateTransaction.approve(poolManagerAddress, 0)).data,
      });

      await sendUnsignedTx({
        from: richWallet,
        to: token.address,
        data: (await token.populateTransaction.approve(poolManagerAddress, ethers.constants.MaxUint256)).data,
      });

      await sendUnsignedTx({
        from: richWallet,
        to: weth.address,
        data: (await weth.populateTransaction.approve(poolManagerAddress, ethers.constants.MaxUint256)).data,
      });

      const isWethToken0 = weth.address < token.address;

      let sqrtPriceX96: JSBI;
      const uniswapPool = await uniswapV3Factory.getPool(weth.address, token.address, pair.fee);
      if (uniswapPool == address.ZERO) {
        // TODO: make calculations for the sqrtPrice to make sense
        sqrtPriceX96 = encodeSqrtRatioX96(1, 1);
      } else {
        const poolInstance = await ethers.getContractAt(POOL_ABI, uniswapPool);

        let { sqrtPriceX96: poolSqrtPriceX96 } = await poolInstance.slot0();
        sqrtPriceX96 = JSBI.BigInt(poolSqrtPriceX96.toString());
      }

      const pricingSlippage = JSBI.divide(JSBI.multiply(sqrtPriceX96, slippage), total);
      const maxSqrtPriceX96 = JSBI.add(sqrtPriceX96, pricingSlippage);
      const minSqrtPriceX96 = JSBI.subtract(sqrtPriceX96, pricingSlippage);

      // create the pool manager, initialize the pool and add a full range position
      const liquidity = maxLiquidityForAmounts(
        sqrtPriceX96,
        minSqrtPriceX96,
        maxSqrtPriceX96,
        JSBI.BigInt(isWethToken0 ? pair.wethAmount : pair.tokenAmount),
        JSBI.BigInt(isWethToken0 ? pair.tokenAmount : pair.wethAmount),
        true
      ).toString();

      await sendUnsignedTx({
        from: richWallet,
        to: poolManagerFactory.address,
        data: (
          await poolManagerFactory.populateTransaction.createPoolManager(
            token.address,
            pair.fee,
            liquidity,
            sqrtPriceX96.toString()
          )
        ).data,
      });

      let pairPoolManagerAddress = await poolManagerFactory.getPoolManagerAddress(token.address, pair.fee);
      let poolManager = (await ethers.getContractAt(
        IPoolManagerABI,
        pairPoolManagerAddress
      )) as unknown as IPoolManager;
      const lockManagerAddress = await poolManager.lockManager();

      console.log(`POOL_MANAGER_${symbol}_WETH_${pair.fee}: '${poolManagerAddress}'`);
      console.log(`LOCK_MANAGER_${symbol}_WETH_${pair.fee}: '${lockManagerAddress}'`);

      // Transfer 10% of remaining balance so that user has tokens to test
      const remainingBalance = await token.balanceOf(richWallet);
      await sendUnsignedTx({
        from: richWallet,
        to: token.address,
        data: (await token.populateTransaction.transfer(governance, remainingBalance.div(10))).data,
      });
    } catch (e: unknown) {
      console.log(`Couldn't deploy pool manager ${symbol}-WETH: ${e}`);
    }
  }

  // Give weth balance to governance to be able to lock
  await sendUnsignedTx({
    from: richWallet,
    to: weth.address,
    data: (await weth.populateTransaction.transfer(governance, toWei(10.123123123123123123).toString())).data,
  });
})();
