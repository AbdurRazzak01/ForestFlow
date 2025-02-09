const { MerkleTree } = require('merkletreejs');
const { keccak256, solidityPacked } = require("ethers");
const fetch = require("node-fetch");

// ✅ Fetch Carbon Intensity Data and Add More Entries
async function fetchCarbonData() {
    console.log("🚀 Fetching Carbon Intensity Data...");
    const API_URL = "https://api.carbonintensity.org.uk/intensity";
    const response = await fetch(API_URL);
    const data = await response.json();

    // ✅ Add past intensity values to make a proper Merkle Tree
    const fetchedData = data.data.map(entry => ({
        timestamp: BigInt(Math.floor(new Date(entry.from).getTime() / 1000)),
        intensity: BigInt(entry.intensity.actual)
    }));

    // ✅ Add additional dummy data for Merkle Tree to work
    const additionalData = [
        { timestamp: fetchedData[0].timestamp - BigInt(3600), intensity: fetchedData[0].intensity + BigInt(5) },
        { timestamp: fetchedData[0].timestamp - BigInt(7200), intensity: fetchedData[0].intensity - BigInt(7) },
    ];

    return [...fetchedData, ...additionalData];
}

// ✅ Generate Merkle Proof
async function generateMerkleProof() {
    const carbonData = await fetchCarbonData();
    console.log("✅ Data Fetched:", carbonData);

    // ✅ Hash each entry using keccak256
    const leafNodes = carbonData.map(entry =>
        keccak256(solidityPacked(["uint256", "uint256"], [entry.timestamp, entry.intensity]))
    );

    // ✅ Create the Merkle Tree
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    const merkleRoot = merkleTree.getHexRoot();
    console.log("✅ Expected Merkle Root:", merkleRoot);

    // ✅ Generate Merkle Proof for the first real entry
    const testEntry = carbonData[0];
    const testLeaf = keccak256(solidityPacked(["uint256", "uint256"], [testEntry.timestamp, testEntry.intensity]));
    const proof = merkleTree.getHexProof(testLeaf);

    console.log("📜 Expected Merkle Proof for", testEntry, ":", proof);
    
    // ✅ Verify proof
    const isValid = merkleTree.verify(proof, testLeaf, merkleRoot);
    console.log("🔍 Proof Validity:", isValid ? "✅ Valid" : "❌ Invalid");
}

generateMerkleProof().catch(console.error);
