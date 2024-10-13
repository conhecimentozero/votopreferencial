const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const fs = require("fs");

const mnemonic = fs.readFileSync(".secret").toString().trim();
const infuraKey = "YOUR_INFURA_KEY";

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`),
      network_id: 3,
      gas: 4000000,
      gasPrice: 20000000000
    }
  },

  compilers: {
    solc: {
      version: "0.8.0", // Specify the Solidity version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};