import { BrowserProvider, Contract } from "ethers";
import ForestFlowABI from "../contracts/ForestFlow.json"; 
import FlareUSDToFLRConverterABI from "../contracts/ForestFSTO.json";
import FlareFDCCarbonSequestrationABI from "../contracts/FlareFDCCarbonSequestration.json";
import FCDCarbonIntensityABI from "../contracts/CarbonIntensity.json"; // ✅ New Contract ABI

const ForestFlowAddress = "0xde6FD55491Eb7F893b445A1569B8f4FF45e464B5"; 
const FlareUSDToFLRConverterAddress = "0x5424C4196Ea2b1D69814b2Cd12f1eAcc4CFfa89A";
const FlareFDCCarbonSequestrationAddress = "0x144400AC8E71e6e28C4cD4De82Adf44AAb8eD163"; 
const FCDCarbonIntensityAddress = "0x9272f14E7ba1D0EC90036B9cF7f93073449f9ce0"; // ✅ Updated Contract Address

// ✅ Get Ethereum Provider
export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error("No crypto wallet found. Please install MetaMask.");
  }
  return new BrowserProvider(window.ethereum);
};

// ✅ Get Signer
export const getSigner = async () => {
  const provider = getProvider();
  await provider.send("eth_requestAccounts", []); 
  return provider.getSigner();
};

// ✅ Restore ForestFlow Contract
export const getForestFlowContract = async () => {
  try {
    const signer = await getSigner();
    const contract = new Contract(ForestFlowAddress, ForestFlowABI.abi, signer);
    console.log("✅ ForestFlow Contract Loaded:", contract);
    return contract;
  } catch (error) {
    console.error("❌ Error loading ForestFlow contract:", error);
    return null;
  }
};

// ✅ Restore FlareUSDToFLRConverter Contract
export const getFlareUSDToFLRConverterContract = async () => {
  try {
    const signer = await getSigner();
    const contract = new Contract(FlareUSDToFLRConverterAddress, FlareUSDToFLRConverterABI.abi, signer);
    console.log("✅ FlareUSDToFLRConverter Contract Loaded:", contract);
    return contract;
  } catch (error) {
    console.error("❌ Error loading FlareUSDToFLRConverter contract:", error);
    return null;
  }
};

// ✅ Restore FlareFDCCarbonSequestration Contract
export const getFlareFDCCarbonSequestrationContract = async () => {
  try {
    const signer = await getSigner();
    const contract = new Contract(FlareFDCCarbonSequestrationAddress, FlareFDCCarbonSequestrationABI.abi, signer);
    console.log("✅ FlareFDCCarbonSequestration Contract Loaded:", contract);
    return contract;
  } catch (error) {
    console.error("❌ Error loading FlareFDCCarbonSequestration contract:", error);
    return null;
  }
};

// ✅ NEW: Get FCDCarbonIntensity Contract
export const getFCDCarbonIntensityContract = async () => {
  try {
    const signer = await getSigner();
    const contract = new Contract(FCDCarbonIntensityAddress, FCDCarbonIntensityABI.abi, signer);
    console.log("✅ FCDCarbonIntensity Contract Loaded:", contract);
    return contract;
  } catch (error) {
    console.error("❌ Error loading FCDCarbonIntensity contract:", error);
    return null;
  }
};

// ✅ Restore getFlrUsdPrice Function
export const getFlrUsdPrice = async () => {
  try {
    const contract = await getFlareUSDToFLRConverterContract();
    if (!contract) throw new Error("Contract not loaded.");

    const [feedValue, decimals, timestamp] = await contract.getFlrUsdPrice();
    const price = Number(feedValue) / (10 ** Number(decimals));
    const lastUpdated = new Date(Number(timestamp) * 1000).toLocaleString();

    console.log("✅ Current FLR/USD Price:", price, "Timestamp:", lastUpdated);
    return { price, timestamp: lastUpdated };
  } catch (error) {
    console.error("❌ Error fetching FLR/USD price:", error);
    return null;
  }
};

// ✅ Restore Carbon Projects Fetching
export const getAllCarbonProjects = async () => {
  try {
    const contract = await getFlareFDCCarbonSequestrationContract();
    if (!contract) throw new Error("Contract not loaded.");
    const projects = await contract.getAllCarbonProjects();
    console.log("✅ Carbon Projects:", projects);
    return projects;
  } catch (error) {
    console.error("❌ Error fetching carbon projects:", error);
    return [];
  }
};

// ✅ Restore Carbon Project Submission
export const addCarbonProject = async (proof) => {
  try {
    const contract = await getFlareFDCCarbonSequestrationContract();
    if (!contract) throw new Error("Contract not loaded.");
    const tx = await contract.addCarbonProject(proof);
    await tx.wait();
    console.log("✅ Carbon Project Added Successfully");
    return tx;
  } catch (error) {
    console.error("❌ Error adding carbon project:", error);
    return null;
  }
};

// ✅ NEW: Fetch Latest Carbon Intensity Data
export const fetchLatestCarbonIntensity = async () => {
  try {
    const contract = await getFCDCarbonIntensityContract();
    if (!contract) throw new Error("Contract not loaded.");
    
    const records = await contract.getLatestCarbonIntensity(10);
    
    return records.map(record => ({
      timestamp: new Date(Number(record.timestamp) * 1000).toLocaleString(),
      intensity: Number(record.intensity),
      verified: record.verified
    }));
  } catch (error) {
    console.error("❌ Error fetching blockchain data:", error);
    return [];
  }
};

// ✅ NEW: Submit Verified Carbon Intensity Data to Blockchain
export const addCarbonIntensity = async (proof) => {
  try {
    const contract = await getFCDCarbonIntensityContract();
    if (!contract) throw new Error("Contract not loaded.");
    
    const tx = await contract.addCarbonIntensity(proof);
    await tx.wait();
    console.log("✅ Carbon Intensity Data Successfully Added!");
    return true;
  } catch (error) {
    console.error("❌ Error adding carbon intensity data:", error);
    return false;
  }
};

// ✅ API Sync Logic
export const fetchCarbonProjectDataFromAPI = async () => {
  try {
    const response = await fetch("https://api.openaq.org/v1/measurements?country=US&limit=10"); 
    const data = await response.json();
    const projects = data.results.map((item) => ({
      projectName: `Project ${item.location}`,
      location: item.city || "Unknown",
      estimatedSequestration: Math.floor(Math.random() * 1000),
      apiUid: item.parameter,
      verified: true,
    }));
    console.log("✅ Carbon Projects Fetched from API:", projects);
    return projects;
  } catch (error) {
    console.error("❌ Error fetching API data:", error);
    return [];
  }
};

// ✅ Sync API Data to Blockchain
export const syncCarbonProjectsToBlockchain = async () => {
  try {
    const blockchainProjects = await getAllCarbonProjects();
    const apiProjects = await fetchCarbonProjectDataFromAPI();

    for (const project of apiProjects) {
      const exists = blockchainProjects.some((p) => p.apiUid === project.apiUid);
      if (!exists) {
        console.log(`Adding new project: ${project.projectName}`);
        await addCarbonProject(project);
      } else {
        console.log(`Project already exists: ${project.projectName}`);
      }
    }
    console.log("✅ Syncing completed.");
  } catch (error) {
    console.error("❌ Error syncing projects:", error);
  }
};
