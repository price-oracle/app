import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { abi as IPoolManagerABI } from '@price-oracle/interfaces/abi/IPoolManager.json';
import { abi as IPoolManagerFactoryABI } from '@price-oracle/interfaces/abi/IPoolManagerFactory.json';
import { IPoolManagerFactory } from '@price-oracle/interfaces/ethers-v5/IPoolManagerFactory';
import hre, { ethers } from 'hardhat';
import { address } from './constants';
import { advanceTimeAndBlock, makeSwap, sendUnsignedTx } from './utils';

/**
 *  Generate Seeder Rewards script
 *
 *  After running this script, you should be able to see the rewards on the UI, when logged in as a seeder
 *
 *  Requirements:
 *    1. Run after `yarn script:deploy-pools`
 * 
 *  The script will:
 *    1. Loop through all pool managers and make giant swaps in their pools
 *    2. Increase liquidity in the pool to recalculate fees
 *    3. Collect fees and distribute rewards
 */

(async () => {
  const [signer] = await hre.ethers.getSigners();
  const [, richWallet,] = address.ADDRESSES as string[];
  const { weth, ierc20, uniswapV3Router } = getMainnetSdk(signer);

  const poolManagerFactory = (await hre.ethers.getContractAt(
    IPoolManagerFactoryABI,
    address.deployed.POOL_MANAGER_FACTORY
  )) as unknown as IPoolManagerFactory;

  const poolManagerCount = await poolManagerFactory.childrenCount();
  const poolManagerAddresses = await poolManagerFactory.listChildren(0, poolManagerCount);

  for (var poolManagerAddress of poolManagerAddresses) {
    const poolManager = await hre.ethers.getContractAt(IPoolManagerABI, poolManagerAddress);

    const fee = await poolManager.fee();
    const tokenAddress = await poolManager.token();
    const token = ierc20.attach(tokenAddress);
    const numberOfSwaps = 2;

    await sendUnsignedTx({
      from: richWallet,
      to: weth.address,
      data: (await weth.populateTransaction.approve(uniswapV3Router.address, ethers.constants.MaxUint256)).data
    });

    await sendUnsignedTx({
      from: richWallet,
      to: token.address,
      data: (await token.populateTransaction.approve(uniswapV3Router.address, ethers.constants.MaxUint256)).data
    });

    for (let i = 1; i <= numberOfSwaps; i++) {
      console.log(`Making swaps in WETH/${await token.symbol()} pool: ${i}/${numberOfSwaps}`);

      await makeSwap(
        weth.address,
        tokenAddress,
        fee,
        (await weth.balanceOf(richWallet)).div(10).toString(),
        richWallet,
        uniswapV3Router
      );

      await makeSwap(
        tokenAddress,
        weth.address,
        fee,
        (await token.balanceOf(richWallet)).div(10).toString(),
        richWallet,
        uniswapV3Router
      );
    }


    // Collect fees
    await poolManager.collectFees();

    advanceTimeAndBlock(864000); // 10 days

    const claimableRewards = await poolManager.claimable(richWallet);
    console.log(`Claimable rewards: ${claimableRewards}`);
  }
})();
