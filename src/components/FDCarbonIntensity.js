import React, { useState } from "react";
import { ethers } from "ethers";
import FCDCarbonIntensityABI from "../contracts/CDCarbonIntensity.json";

// ✅ Constants
const CONTRACT_ADDRESS = "0x9272f14E7ba1D0EC90036B9cF7f93073449f9ce0";
const API_URL = "https://api.carbonintensity.org.uk/intensity";

const CarbonIntensity = () => {
  const [error, setError] = useState(null);
  const [transactionHash, setTransactionHash] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // ✅ Helper function to safely handle BigInt

  // ✅ Attestation & Source Hashing
  const attestationType = ethers.keccak256(ethers.toUtf8Bytes("carbon-intensity"));
  const sourceId = ethers.keccak256(ethers.toUtf8Bytes("gov-api"));

  console.log("✅ Hashed Attestation Type:", attestationType);
  console.log("✅ Hashed Source ID:", sourceId);

  // ✅ Helper function to get Ethereum provider & signer
  const getProvider = async () => {
    if (!window.ethereum) {
      setError("❌ No crypto wallet found! Install MetaMask.");
      return null;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return new ethers.BrowserProvider(window.ethereum);
    } catch (err) {
      setError("❌ MetaMask connection failed.");
      return null;
    }
  };

  const getContract = async () => {
    try {
      const provider = await getProvider();
      if (!provider) return null;

      const signer = await provider.getSigner();
      if (!signer) return null;

      const contract = new ethers.Contract(CONTRACT_ADDRESS, FCDCarbonIntensityABI.abi, signer);
      return { contract, signer };
    } catch (error) {
      setError("❌ Contract initialization failed.");
      console.error("❌ Contract Error:", error);
      return null;
    }
  };

  const fetchAndSubmitData = async () => {
    setIsSubmitting(true);
    setError(null);
    setTransactionHash("");

    try {
        console.log("🚀 Starting fetchAndSubmitData...");
        const { contract, signer } = await getContract();
        if (!contract || !signer) return;

        // ✅ Fetch Owner and Ensure Wallet is Correct
        const owner = await contract.owner();
        const signerAddress = await signer.getAddress();
        console.log(`👤 Contract Owner: ${owner}, Your Address: ${signerAddress}`);

        if (owner.toLowerCase() !== signerAddress.toLowerCase()) {
            setError("❌ Only the contract owner can submit data.");
            console.error("❌ You are NOT the contract owner!");
            return;
        }

        // ✅ Fetch API Data
        console.log("🌍 Fetching Carbon Intensity Data...");
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);
        const data = await response.json();
        if (!data || !data.data || data.data.length === 0) throw new Error("Invalid API response.");

        const latestRecord = data.data[0];
        const timestamp = Number(Math.floor(new Date(latestRecord.from).getTime() / 1000));
        const intensity = Number(latestRecord.intensity.actual);

        console.log(`🌍 Latest Carbon Intensity Data: Timestamp ${timestamp}, Intensity: ${intensity} gCO₂/kWh`);

        const abi_encoded_data = ethers.AbiCoder.defaultAbiCoder().encode(
            ["uint256", "uint256"],
            [BigInt(timestamp), BigInt(intensity)]
        );

        const proof = {
            merkleProof: [
                "0xf8a4acbd8d7e883716dad5f0adebad4c14a97d4d10e8c9ef6afdf35aac2093e9",
                "0xa7962bb7dfa2f3cc83cdc65cf9d8117ca21a7f771fb0c817551c60a3eef248af"
            ],
            data: {
                attestationType: attestationType,
                sourceId: sourceId,
                votingRound: "1",
                lowestUsedTimestamp: timestamp.toString(),
                requestBody: {
                    url: API_URL,
                    postprocessJq: "",
                    abi_signature: ""
                },
                responseBody: {
                    abi_encoded_data: abi_encoded_data
                }
            }
        };

        console.log("📜 Proof Struct Before Submission:", JSON.stringify(proof, null, 2));

        // ✅ Validate Proof Before Submitting
        console.log("🔍 Checking Proof Validity...");
        let isValid;
        try {
            isValid = await contract.isJsonApiProofValid(proof);
            console.log("🛠 isJsonApiProofValid Result:", isValid);
        } catch (err) {
            console.error("❌ Error in isJsonApiProofValid:", err);
            setError(`❌ Proof validation failed: ${err.message}`);
            return;
        }

        // ✅ Log proof validity check result
        if (!isValid) {
            console.error("❌ Proof is INVALID, transaction will fail.");
            setError("❌ Invalid proof. Verify Merkle Proof and contract setup.");
            return;
        }
        console.log("✅ Proof is VALID. Proceeding to transaction...");

        // ✅ Submitting transaction
        console.log("🚀 Submitting transaction...");
        try {
            const tx = await contract.addCarbonIntensity(proof, {
                gasLimit: ethers.parseUnits("500000", "wei")
            });

            console.log("✅ Transaction submitted:", tx.hash);
            setTransactionHash(tx.hash);

            console.log("⏳ Waiting for transaction confirmation...");
            await tx.wait();
            console.log("🎉 Transaction Confirmed!");

            alert("✅ Carbon Intensity Data Added Successfully!");
        } catch (err) {
            console.error("❌ Transaction Error:", err);
            setError(`❌ Transaction failed: ${err.message}`);
        }
    } catch (error) {
        setError(`❌ Error: ${error.message}`);
        console.error("Transaction Error:", error);
    } finally {
        setIsSubmitting(false);
    }
};


  return (
    <div style={{ padding: "20px", background: "#222", color: "#fff", borderRadius: "10px", textAlign: "center" }}>
      <h2>🌱 Verified Carbon Intensity Records</h2>

      <button 
        onClick={fetchAndSubmitData} 
        disabled={isSubmitting} 
        style={{ padding: "10px", marginTop: "10px", cursor: "pointer", background: "#007bff", color: "#fff", borderRadius: "5px" }}
      >
        {isSubmitting ? "Submitting..." : "✅ Add Latest Data"}
      </button>

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      {transactionHash && (
        <p>
          ✅ Transaction:{" "}
          <a href={`https://sepolia.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
            View on Etherscan
          </a>
        </p>
      )}
    </div>
  );
};

export default CarbonIntensity;
