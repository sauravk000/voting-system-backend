require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const ETHERIUM_TESTNET_KEY = process.env.ETHERIUM_TESTNET_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = { solidity: '0.8.17' , networks: {
  georli: {
    url: process.env.RPC_URL,
    accounts : [ETHERIUM_TESTNET_KEY],
    
  },
  matic: {
    url: 'https://polygon-mumbai.blockpi.network/v1/rpc/public',
    accounts: [process.env.MATIC_KEY]
  },
  hardhat: {
    chainId: 31337,
    forking: {
      url: process.env.ETH_MAINNET_KEY
    }
  },
  sepolia: {
    url: process.env.SEPOLIA_TESTNET,
    accounts: [process.env.SEPOLIA_ACC]
  },
},
etherscan: {
  apiKey: process.env.ETHERSCAN_KEY
}
};
