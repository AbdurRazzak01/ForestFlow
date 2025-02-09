import { ethers } from "hardhat";
import { FCDCarbonIntensityInstance } from "../typechain-types";

const FCDCarbonIntensity = artifacts.require("FCDCarbonIntensity");
const FDCHub = artifacts.require("@flarenetwork/flare-periphery-contracts/coston/IFdcHub.sol:IFdcHub");

const { VERIFIER_URL_TESTNET, VERIFIER_PUBLIC_API_KEY_TESTNET, DA_LAYER_URL_COSTON2 } = process.env;
const API_URL = "https://api.carbonintensity.org.uk/intensity/date";
const CONTRACT_ADDRESS = "0x9272f14E7ba1D0EC90036B9cF7f93073449f9ce0";

// ✅ Fetch carbon intensity data
async function fetchCarbonIntensity() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`API request failed: ${response.status}`);

    const data = await response.json();
    const latestRecord = data.data[0];

    return {
        timestamp: Math.floor(new Date(latestRecord.from).getTime() / 1000),
        intensity: latestRecord.intensity.actual
    };
}

// ✅ Prepare attestation request
async function prepareRequest() {
    const { timestamp, intensity } = await fetchCarbonIntensity();
    const requestData = {
        attestationType: "0x" + Buffer.from("IJsonApi", "utf8").toString("hex").padEnd(64, "0"),
        sourceId: "0x" + Buffer.from("WEB2", "utf8").toString("hex").padEnd(64, "0"),
        requestBody: {
            url: API_URL,
            postprocessJq: `{timestamp: .data[0].from | strptime("%Y-%m-%dT%H:%M:%S%z") | mktime, intensity: .data[0].intensity.actual}`
        }
    };

    const response = await fetch(`${VERIFIER_URL_TESTNET}JsonApi/prepareRequest`, {
        method: "POST",
        headers: { "X-API-KEY": VERIFIER_PUBLIC_API_KEY_TESTNET, "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
    });

    return response.json();
}

// ✅ Submit proof to blockchain
async function submitProof() {
    const proofData = await prepareRequest();
    const contract = await FCDCarbonIntensity.at(CONTRACT_ADDRESS);
    const tx = await contract.addCarbonIntensity({ merkleProof: proofData.proof, data: proofData.response });

    console.log("✅ Verified carbon intensity added to blockchain:", tx.tx);
}

submitProof().catch(console.error);
