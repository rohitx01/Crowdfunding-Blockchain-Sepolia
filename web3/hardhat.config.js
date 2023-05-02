/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    // defaultNetwork: "goerli",
    defaultNetwork: "sepolia",
    networks: {
      hardhat: {},
      //goerli: {
      sepolia: {
        //url: "https://rpc.ankr.com/eth_goerli",
        url: "https://rpc.ankr.com/eth_sepolia",

        accounts: [`0x${process.env.PRIVATE_KEY}`],
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
