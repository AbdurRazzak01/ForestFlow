const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  // ✅ Specify the fully qualified name of the contract
  const CarbonIntensity = await ethers.getContractFactory(
    "contracts/CDCarbonIntensity.sol:FCDCarbonIntensity"
  );

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
