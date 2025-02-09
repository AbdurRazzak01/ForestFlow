const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  // ✅ Pass deployer.address as constructor argument
  const CarbonIntensity = await ethers.getContractFactory("FCDCarbonIntensity");
  const contract = await CarbonIntensity.deploy(deployer.address);

  console.log("✅ Contract deployment transaction sent...");
  await contract.waitForDeployment();

  console.log("✅ Contract successfully deployed at:", await contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
