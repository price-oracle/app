import hre, { ethers } from 'hardhat';
import { impersonate, toUnit, advanceTimeAndBlock } from './utils';
import { address } from './constants';
import { abi as IPriceTokenABI } from '@price-protocol/interfaces/abi/IPriceToken.json';
import { abi as IPoolManagerFactoryABI } from '@price-protocol/interfaces/abi/IPoolManagerFactory.json';
import { IPoolManagerFactory } from '@price-protocol/interfaces/ethers-v5/IPoolManagerFactory';
import { IPoolManager } from '@price-protocol/interfaces/ethers-v5/IPoolManager';
import { abi as IPoolManagerABI } from '@price-protocol/interfaces/abi/IPoolManager.json';
import { ILockManager } from '@price-protocol/interfaces/ethers-v5/ILockManager';
import { abi as ILockManagerABI } from '@price-protocol/interfaces/abi/ILockManager.json';
import { IPriceToken } from '@price-protocol/interfaces/ethers-v5/IPriceToken';
import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';

/**
 * Accrue Fees Script
 *
 * The goal of this script is to have all price pools with claimable fees.
 *
 * Requirements:
 *  1. Run after `yarn script:deploy-pools`
 *  2. Define DEPOSITOR_ADDRESS in the .env file
 *
 * In order to have that, the script will:
 *    1. Mints PRICE to the depositor address
 *    2. The depositor will lock PRICE to every lock manager
 *    3. Wait some days
 *    4. The rich wallet will add PRICE rewards to every single lock manager
 *    5. Prints claimable amount for every lock manager
 */
(async () => {
  const [governance, richWallet] = await hre.ethers.getSigners();

  // get needed contracts and addresses
  const { ierc20 } =
    getMainnetSdk(richWallet);


  const poolManagerFactory = (await hre.ethers.getContractAt(
    IPoolManagerFactoryABI,
    address.deployed.POOL_MANAGER_FACTORY
  )) as unknown as IPoolManagerFactory;

  const poolManagerCount = await poolManagerFactory.childrenCount();
  const poolManagerAddresses = await poolManagerFactory.listChildren(
    0,
    poolManagerCount
  );

  const price = (await hre.ethers.getContractAt(
    IPriceTokenABI,
    address.deployed.PRICE
  )) as unknown as IPriceToken;

  const depositorAddress = process.env.DEPOSITOR_ADDRESS as string;
  const depositor = await impersonate(depositorAddress);
  console.log(`Depositor: ${depositorAddress}\n`);

  for (var poolManagerAddress of poolManagerAddresses) {
    const poolManager = (await hre.ethers.getContractAt(
      IPoolManagerABI,
      poolManagerAddress
    )) as unknown as IPoolManager;

    const tokenAddress = await poolManager.token();
    const token = ierc20.attach(tokenAddress);

    console.group(
      `PoolManager ${await token.symbol()}/PRICE ${poolManagerAddress}`
    );
    console.log(`Fee ${(await poolManager.fee()) / 1000}%`);

    const lockManagerAddress = await poolManager.lockManager();
    const lockManager = (await hre.ethers.getContractAt(
      ILockManagerABI,
      lockManagerAddress
    )) as unknown as ILockManager;
    console.log(`Found LockManager at ${lockManagerAddress}`);

    // provide the user and our wallet with PRICE
    let lockAmount = toUnit(Math.random() * 10);
    await price.connect(governance).addMinter(governance.address);
    await price
      .connect(governance)
      .mint(depositorAddress, ethers.constants.MaxUint256.div(10000));
    console.log(`Minted ${lockAmount} PRICE for ${depositorAddress}`);

    // user locks PRICE to generate rewards
    for (const approver of [depositor, richWallet]) {
      await price
        .connect(approver)
        .approve(lockManagerAddress, ethers.constants.MaxUint256);

      await token
        .connect(approver)
        .approve(lockManagerAddress, ethers.constants.MaxUint256);
    }

    await lockManager.connect(depositor).lock(lockAmount);
    const priceRewards = toUnit(Math.random() * 10);
    const tokenBalance = await token.balanceOf(richWallet.address);

    await lockManager
      .connect(richWallet)
      .addRewards(priceRewards, tokenBalance.div(10));

    const claimableRewards = await lockManager.claimable(depositorAddress);
    console.log(
      `Locked ${lockAmount} PRICE, claimable rewards: ${claimableRewards}`
    );
    advanceTimeAndBlock(864000); // 10 days
    console.groupEnd();
  }
})();
