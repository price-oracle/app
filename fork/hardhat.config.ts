import '@nomiclabs/hardhat-ethers';
import dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/types';

dotenv.config({ path: './.env' });

const config: HardhatUserConfig = {
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
  },
};

export default config;
