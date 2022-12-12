import hre from 'hardhat';
import { toWei, sendUnsignedTx } from './utils';
import { address } from './constants';
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
  const { weth } = getMainnetSdk(governance);
  const depositorAddress = process.env.DEPOSITOR_ADDRESS as string;

  console.log(`Depositor: ${depositorAddress}`);
  console.log(`Governance: ${governance.address}`);
  console.log(`Rich wallet: ${richWallet.address}`);

  for (const addressToFund of [governance.address, richWallet.address, depositorAddress]) {
    // give the address a lot of ETH
    await sendUnsignedTx({
      from: address.ETH_WHALE,
      to: addressToFund,
      value: toWei(100_000)
    });
  
    // convert some of that ETH to WETH
    await sendUnsignedTx({
      from: addressToFund,
      to: weth.address,
      data: (await weth.populateTransaction.deposit()).data,
      value: toWei(50_000)
    });
  }

  console.log(`Wallets funded successfully`);
})();
