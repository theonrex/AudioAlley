const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const AUDIOALLEYMarketplace = await hre.ethers.getContractFactory(
    "AUDIOALLEY"
  );
  const audioalleyMarketplace = await AUDIOALLEYMarketplace.deploy();
  await audioalleyMarketplace.deployed();
  console.log(
    "audioalleyMarketplace deployed to:",
    audioalleyMarketplace.address
  );

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(audioalleyMarketplace.address);
  await nft.deployed();
  console.log("nft deployed to:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
