require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-waffle");
require('dotenv').config;
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {},
    goerli: {
      // url: process.url.API_URL,
      // accounts: [process.env.PRIVATE_KEY],
      // https://eth-goerli.g.alchemy.com/v2/1NkuHJk9fySa1xwgPZ21rwqkGJbh_9Cm
      // url: "https://goerli.infura.io/v3/",
      url: "https://eth-goerli.g.alchemy.com/v2/1NkuHJk9fySa1xwgPZ21rwqkGJbh_9Cm",
      // d6a736bafc7f7a6ec508475555533eae388590c4d16748afee99f615ff7908dd
      // accounts: [`0xd6a736bafc7f7a6ec508475555533eae388590c4d16748afee99f615ff7908dd`],
      accounts: [`0xd6a736bafc7f7a6ec508475555533eae388590c4d16748afee99f615ff7908dd`],
      // accounts: ['d6a736bafc7f7a6ec508475555533eae388590c4d16748afee99f615ff7908dd'],
  
    },



  }
  // goerli: {
  //   // url: process.url.API_URL,
  //   // accounts: [process.env.PRIVATE_KEY],
  //   url: "https://goerli.infura.io/v3/",
  //   accounts: ['d6a736bafc7f7a6ec508475555533eae388590c4d16748afee99f615ff7908dd'],

  // },
};
