import hre, { ethers } from 'hardhat';
import { impersonate, toUnit, advanceTimeAndBlock, setBalance } from './utils';
import { address } from './constants';
import { abi as IPoolManagerFactoryABI } from '@price-oracle/interfaces/abi/IPoolManagerFactory.json';
import { IPoolManagerFactory } from '@price-oracle/interfaces/ethers-v5/IPoolManagerFactory';
import { IPoolManager } from '@price-oracle/interfaces/ethers-v5/IPoolManager';
import { abi as IPoolManagerABI } from '@price-oracle/interfaces/abi/IPoolManager.json';
import { ILockManager } from '@price-oracle/interfaces/ethers-v5/ILockManager';
import { abi as ILockManagerABI } from '@price-oracle/interfaces/abi/ILockManager.json';
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
 *    1. Mints WETH to the depositor address
 *    2. The depositor will lock WETH to every lock manager
 *    3. Wait some days
 *    4. The rich wallet will add WETH rewards to every single lock manager
 *    5. Prints claimable amount for every lock manager
 */
(async () => {
  const [governance, richWallet] = await hre.ethers.getSigners();

  const { weth } =
    getMainnetSdk(richWallet);

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

  const depositorAddress = process.env.DEPOSITOR_ADDRESS as string;
  const depositor = await impersonate(depositorAddress);
  await setBalance(depositorAddress, toUnit(100_000));
  console.log(`Depositor: ${depositorAddress}\n`);

  for (var poolManagerAddress of poolManagerAddresses) {
    const poolManager = (await hre.ethers.getContractAt(
      IPoolManagerABI,
      poolManagerAddress
    ));

    const tokenAddress = await poolManager.token();
    const token = ierc20.attach(tokenAddress);

    console.group(
      `PoolManager ${await token.symbol()}/WETH ${poolManagerAddress}`
    );
    console.log(`Fee ${(await poolManager.fee()) / 1000}%`);

    const lockManagerAddress = await poolManager.lockManager();
    const lockManager = (await hre.ethers.getContractAt(
      ILockManagerABI,
      lockManagerAddress
    ));
    console.log(`Found LockManager at ${lockManagerAddress}`);

    // provide the user and our wallet with WETH
    let lockAmount = toUnit(Math.random() * 10);

    // give the deployer a lot of WETH
    await weth.connect(depositor).deposit({ value: lockAmount });
    console.log(`Minted ${lockAmount} WETH for ${depositorAddress}`);

    // user locks WETH to generate rewards
    for (const approver of [depositor, richWallet]) {
      await weth
        .connect(approver)
        .approve(lockManagerAddress, ethers.constants.MaxUint256);

      await token
        .connect(approver)
        .approve(lockManagerAddress, ethers.constants.MaxUint256);
    }

    await lockManager.connect(depositor).lock(lockAmount);
    const wethRewards = toUnit(Math.random() * 10);
    const tokenBalance = await token.balanceOf(richWallet.address);

    await lockManager
      .connect(richWallet)
      .addRewards(wethRewards, tokenBalance.div(10));

    const claimableRewards = await lockManager.claimable(depositorAddress);
    console.log(
      `Locked ${lockAmount} WETH, claimable rewards: ${claimableRewards}`
    );

    // Reset approval
    await weth
      .connect(depositor)
      .approve(lockManagerAddress, 0);

    advanceTimeAndBlock(864000); // 10 days
    console.groupEnd();
  }
})();
