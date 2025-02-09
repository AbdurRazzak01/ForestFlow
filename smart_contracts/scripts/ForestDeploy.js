require("dotenv").config();
const hre = require("hardhat");

async function main() {
    const deployer = await hre.ethers.provider.getSigner();
    const deployerAddress = await deployer.getAddress();
    console.log("Deploying contracts with the account:", deployerAddress);

    // Deploy ForestToken (FTK)
    const ForestToken = await hre.ethers.getContractFactory("ForestToken");
    const forestToken = await ForestToken.deploy(deployerAddress);
    await forestToken.waitForDeployment();
    const forestTokenAddress = String(await forestToken.getAddress());
    console.log("ForestToken deployed to:", forestTokenAddress);

    // Deploy ForestFlow using C2FLR payments
    const ForestFlow = await hre.ethers.getContractFactory("ForestFlow");
    const forestFlow = await ForestFlow.deploy(forestTokenAddress);
    await forestFlow.waitForDeployment();
    console.log("ForestFlow deployed to:", String(await forestFlow.getAddress()));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
