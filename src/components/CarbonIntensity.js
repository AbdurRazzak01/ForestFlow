import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import FCDCarbonIntensityABI from "../contracts/CarbonIntensity.json"; // Adjust path if needed

const CONTRACT_ADDRESS = "0x1Bc93e1C143d0610868d79f72FE11EE4FCF4BfD0"; // Your deployed contract address
const API_URL = "https://api.carbonintensity.org.uk/intensity"; // Corrected API endpoint

const CarbonIntensity = () => {
  const [intensityRecords, setIntensityRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  // 📌 Get Ethereum provider and signer
  const getProvider = async () => {
    if (!window.ethereum) {
      throw new Error("No Ethereum wallet found. Please install MetaMask.");
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
    return new ethers.BrowserProvider(window.ethereum);
  };

  const getContract = async () => {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, FCDCarbonIntensityABI.abi, signer);
  };

  // 📌 Check if a record already exists
  const checkRecordExists = async (timestamp) => {
    try {
      const contract = await getContract();
      const existingRecord = await contract.intensityRecords(timestamp);
      return existingRecord.timestamp > 0; // If record exists, returns true
    } catch (error) {
      console.error("Error checking existing record:", error);
      return false;
    }
  };

  // 📌 Fetch latest carbon intensity records from blockchain
  const fetchLatestRecords = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      const records = await contract.getLatestCarbonIntensity(10);

      const formattedRecords = records.map((record) => ({
        timestamp: new Date(Number(record.timestamp) * 1000).toLocaleString(),
        intensity: Number(record.intensity),
      }));

      setIntensityRecords(formattedRecords);
    } catch (error) {
      console.error("Error fetching blockchain data:", error);
      setError("Failed to fetch blockchain data.");
    } finally {
      setLoading(false);
    }
  };

  // 📌 Fetch carbon intensity from API and send to blockchain
  const addCarbonIntensity = async () => {
    try {
      setAdding(true);
      setError(null);

      // ✅ Fetch latest intensity data from API
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      if (!data || !data.data || data.data.length === 0) {
        throw new Error("Invalid API response.");
      }

      // ✅ Extract the latest intensity data
      const latestRecord = data.data[0];
      const timestamp = Math.floor(new Date(latestRecord.from).getTime() / 1000);
      const actualIntensity = latestRecord.intensity.actual; // Extract `actual` value

      if (typeof actualIntensity !== "number") {
        throw new Error("Invalid intensity value from API");
      }

      // 📌 Check if the record already exists
      if (await checkRecordExists(timestamp)) {
        alert("⚠ Record already exists, skipping!");
        return;
      }

      // 📌 Send data to Blockchain
      const contract = await getContract();
      const tx = await contract.addCarbonIntensity(timestamp, actualIntensity);
      await tx.wait();

      alert("✅ Carbon Intensity Data Added Successfully!");
      fetchLatestRecords(); // Refresh the data
    } catch (error) {
      console.error("Error adding carbon intensity:", error);
      setError("Failed to add data to blockchain.");
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    fetchLatestRecords();
  }, []);

  return (
    <div style={styles.container}>
      <h2>🌱 UK Carbon Intensity Tracker</h2>

      <button onClick={addCarbonIntensity} disabled={adding} style={styles.button}>
        {adding ? "Adding Data..." : "Add Latest Data to Blockchain"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      <h3>🔍 Latest Carbon Intensity Records</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={styles.list}>
          {intensityRecords.map((record, index) => (
            <li key={index} style={styles.listItem}>
              <strong>{record.timestamp}</strong> - {record.intensity} gCO₂/kWh
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// 🔥 CSS Styles
const styles = {
  container: {
    backgroundColor: "#222",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    maxWidth: "500px",
    margin: "20px auto",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px",
    margin: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
  list: {
    listStyle: "none",
    padding: "0",
  },
  listItem: {
    padding: "5px",
    borderBottom: "1px solid #444",
  },
};

export default CarbonIntensity;
