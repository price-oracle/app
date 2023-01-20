import '@nomiclabs/hardhat-ethers';
import * as tdly from '@tenderly/hardhat-tenderly';
import dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';

tdly.setup({ automaticVerifications: false });
dotenv.config({ path: './.env' });

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.13',
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      forking: {
        url: process.env.FORK_RPC as string,
        enabled: true,
        blockNumber: 15006161,
      },
      chainId: 1337,
    },
    localhost: {
      url: 'http://localhost:8545',
    },
    tenderly: {
      chainId: 1,
      url: process.env.TENDERLY_FORK_RPC as string,
    },
  },
  tenderly: {
    project: 'price-oracle',
    username: 'defi-wonderland',
    privateVerification: false,
  },
};

export default config;
