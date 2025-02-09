const { ethers, run } = require("hardhat");

async function main() {
    // Flare Time Series Oracle (FTSO) USD/FLR feed address
    const ftsoAddress = "0x01464c522f55534400000000000000000000000000";

    // Deploy the FlareUSDToFLRConverter contract
    const FlareUSDToFLRConverter = await ethers.getContractFactory("FlareUSDToFLRConverter");
    const converter = await FlareUSDToFLRConverter.deploy();

    await converter.waitForDeployment();
    console.log("FlareUSDToFLRConverter deployed to:", await converter.getAddress());

    try {
        const result = await run("verify:verify", {
            address: await converter.getAddress(),
            constructorArguments: [],
        });

        console.log(result);
    } catch (e) {
        console.log(e.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
