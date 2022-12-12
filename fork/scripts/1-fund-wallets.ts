import hre from 'hardhat';
import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';

import { address } from './constants';
import { sendUnsignedTx, toWei } from './utils';

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
  const [signer] = await hre.ethers.getSigners();
  const [governance, richWallet, depositor] = address.ADDRESSES as string[];
  const { weth } = getMainnetSdk(signer);

  console.log(`Depositor: ${depositor}`);
  console.log(`Governance: ${governance}`);
  console.log(`Rich wallet: ${richWallet}`);

  for (const addressToFund of [governance, richWallet, depositor]) {
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
