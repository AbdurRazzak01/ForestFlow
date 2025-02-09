const { ethers, run } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // ✅ Correct contract name from artifacts
  const FlareFDCCarbonSequestration = await ethers.getContractFactory("FlareFDCCarbonSequestration");
  const contractInstance = await FlareFDCCarbonSequestration.deploy();

  // ✅ Wait for the contract to be deployed
  await contractInstance.waitForDeployment();

  // ✅ Fetch deployed contract address
  const contractAddress = await contractInstance.getAddress();
  console.log("FlareFDCCarbonSequestration deployed to:", contractAddress);

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
    });
    console.log("✅ Successfully verified contract on Coston2!");
  } catch (e) {
    console.log("❌ Verification error:", e.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
