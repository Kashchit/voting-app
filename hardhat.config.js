require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
    solidity: "0.8.20",
    networks: {
        hardhat: {},
        goerli: {
            url: process.env.ALCHEMY_GOERLI_URL,
            accounts: [process.env.PRIVATE_KEY]
        }
    }
};
