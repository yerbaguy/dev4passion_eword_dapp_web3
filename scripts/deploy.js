// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.


// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = hre.ethers.utils.parseEther("1");

//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log(
//     `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });



const hre = require("hardhat");
const fs = require('fs');

async function main() {
  /* these two lines deploy the contract to the network */
  const Eword = await hre.ethers.getContractFactory("Eword");
  const eword = await Eword.deploy("Eword");

  const EwordToken = await hre.ethers.getContractFactory("EwordToken");
  const ewordtoken = await EwordToken.deploy("EwordToken");


  await eword.deployed();
  console.log("Eword deployed to:", eword.address);

  await ewordtoken.deployed();
  console.log("EwordToken deployed to:", ewordtoken.address);
  
  /* this code writes the contract addresses to a local */
  /* file named config.js that we can use in the app */
 
  // fs.writeFileSync('./config.js', `
  // export const contractAddress = "${eword.address}"
  // export const ownerAddress = "${eword.signer.address}"
  // `)
  fs.writeFileSync('./config.js', `
  export const contractAddress = "${eword.address}"
  export const ownerAddress = "${eword.signer.address}"
  export const ewordTokencontractAddress = "${ewordtoken.address}"
  export const ewordTokenownerAddress = "${ewordtoken.signer.address}"

  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
