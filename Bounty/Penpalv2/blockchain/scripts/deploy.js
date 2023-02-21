const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const PENPALMarketplace = await hre.ethers.getContractFactory("PENPAL");
  const penpalMarketplace = await PENPALMarketplace.deploy();
  await penpalMarketplace.deployed();
  console.log("penpalMarketplace deployed to:", penpalMarketplace.address);

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(penpalMarketplace.address);
  await nft.deployed();
  console.log("nft deployed to:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
