require("ts-node").register({files: true});
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3();

module.exports = {
    plugins: ['truffle-plugin-verify', "truffle-contract-size"],
    api_keys: {
        etherscan: process.env.ETHERSCAN_API_KEY,
    },
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*"
        },
        goerli: {
            provider: function () {
                return new HDWalletProvider(process.env.TESTNET_PRIVATE_KEY, `wss://goerli.infura.io/ws/v3/${process.env.INFURA_ACCESS_TOKEN}`);
            },
            network_id: 5,
            // gas: 30000000, //from ganache-cli output
            // gasPrice: web3.utils.toWei('1', 'gwei')
            networkCheckTimeout: 1000000,
            timeoutBlocks: 200
        },
        mainnet: {
            provider: function () {
                return new HDWalletProvider(process.env.MAINNET_PRIVATE_KEY, `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_ACCESS_TOKEN}`);
            },
            network_id: 1,
            gas: 4000000,
            gasPrice: web3.utils.toWei('33', 'gwei')
        },
        dashboard: {
            port: 24012,
        }
    },
    mocha: {
        reporter: 'eth-gas-reporter'
    },
    compilers: {
        solc: {
            version: "0.8.17",
            settings: { // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: true,
                    runs: 1000
                }
            }
        }
    }
};
