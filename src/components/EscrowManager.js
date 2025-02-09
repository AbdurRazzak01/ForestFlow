import React, { useState, useEffect } from "react";
import { parseEther, formatUnits } from "ethers";
import { getForestFlowContract, getProvider } from "../utils/contracts";
import "../styles/ForestManage.css";
import ML_Model from "./ML_Model";
import FlrUsdPrice from "./ForestFSTO";
import CarbonProjects from "./FlareCarbonProjects";
import CarbonIntensity from "./CarbonIntensity";
import CarbonInten from "./FDCarbonIntensity";
  
  const ForestManage = ({ account }) => {
    const [toggleMode, setToggleMode] = useState("Invest");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [carbonTokenBalance, setCarbonTokenBalance] = useState(0);
    const [carbonTokenPrice, setCarbonTokenPrice] = useState(0);
    const [investmentAmount, setInvestmentAmount] = useState("");
    const [tokenAmount, setTokenAmount] = useState("");
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [projectLocation, setProjectLocation] = useState("");
    const [estimatedCO2, setEstimatedCO2] = useState("");
    const [minInvestment, setMinInvestment] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [totalInvestment, setTotalInvestment] = useState(0);
    const projectImages = [
      "/image copy 2.png",
      "/tree1.png",
      "/tree2.png",
      "/tree3.png",
    ];

    useEffect(() => {
      const fetchDetails = async () => {
        try {
          const contract = await getForestFlowContract();
          if (!contract) return alert("Error: Contract not loaded");
  
          const balance = await contract.carbonTokenBalance(account);
          setCarbonTokenBalance(formatUnits(balance, 18));
  
          const price = await contract.carbonTokenPrice();
          setCarbonTokenPrice(formatUnits(price, 18));
          
          
          const projectCount = await contract.projectCounter();
          const projectList = [];
          for (let i = 0; i < projectCount; i++) {
            const project = await contract.projects(i);
            projectList.push({
              id: i,
              name: project.projectName,
              location: project.projectLocation,
              estimatedCO2: formatUnits(project.estimatedCO2, 18),
              minInvestment: formatUnits(project.minInvestment, 18),
            });
          }
          setProjects(projectList);
         
          const investment = await contract.totalInvestments(account);  // Assuming this function exists in your contract
          setTotalInvestment(formatUnits(investment, 18));

          const logs = await contract.queryFilter({});
          setTransactions(logs.map(log => log.args));
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      };
  
      if (account) fetchDetails();
    }, [account]);
  
    const registerUser = async () => {
      if (!name || !email) return alert("Please enter name and email.");
      try {
        const contract = await getForestFlowContract();
        const tx = await contract.registerUser(name.trim(), email.trim());
        await tx.wait();
        alert("User Registered Successfully!");
      } catch (error) {
        console.error("Error registering user:", error);
        alert(`Transaction failed: ${error.message}`);
      }
    };
  
  
    const registerProject = async () => {
      if (!projectName || !projectLocation || !estimatedCO2 || !minInvestment) {
        return alert("Please enter all project details.");
      }
      try {
        const contract = await getForestFlowContract();
        const tx = await contract.listProject(
          projectName.trim(),
          projectLocation.trim(),
          parseEther(estimatedCO2),
          parseEther(minInvestment)
        );
        await tx.wait();
        alert("Project Registered Successfully!");
      } catch (error) {
        console.error("Error registering project:", error);
        alert(`Transaction failed: ${error.message}`);
      }
    };
    const investInProject = async (projectId) => {
      try {
        if (!investmentAmount) return alert("Enter investment amount.");
        const contract = await getForestFlowContract();
        const tx = await contract.investInProject(projectId, { value: parseEther(investmentAmount) });
        await tx.wait();
        alert("Investment Successful!");
      } catch (error) {
        console.error("Error investing in project:", error);
        alert(`Transaction failed: ${error.message}`);
      }
    };
  
    const buyCarbonToken = async () => {
      try {
        if (!tokenAmount) return alert("Enter token amount.");
        const contract = await getForestFlowContract();
        const cost = parseEther((parseFloat(tokenAmount) * parseFloat(carbonTokenPrice)).toString());
        const tx = await contract.buyCarbonToken(tokenAmount, { value: cost });
        await tx.wait();
        alert("Tokens Purchased Successfully!");
      } catch (error) {
        console.error("Error buying tokens:", error);
        alert(`Transaction failed: ${error.message}`);
      }};
      return (
        <div className="forest-manage-container">
          {/* Header with Toggle */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>Welcome To Forest Flow! </h1>
            <div>
              <button
                onClick={() => setToggleMode("Invest")}
                style={{
                  padding: "10px",
                  marginRight: "5px",
                  backgroundColor: toggleMode === "Invest" ? "#4CAF50" : "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Investor
              </button>
              <button
                onClick={() => setToggleMode("Farmer")}
                style={{
                  padding: "10px",
                  backgroundColor: toggleMode === "Farmer" ? "#007BFF" : "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Farmer
              </button>
            </div>
          </div>
      
          {/* Map Section - Stays Visible in Both Modes */}
          <div style={{ margin: "20px 0" }}>
            <ML_Model />
          </div>
      
          {/* Show ONLY for "Invest" Mode */}
          {toggleMode === "Invest" && (
            <>
              {/*<div className="form-section">
                <h2>Register User</h2>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={registerUser}>Register</button>
              </div>*/}
              <div style={{
  backgroundColor: '#222', 
  color: 'white', 
  padding: '20px', 
  textAlign: 'center', 
  borderRadius: '8px', 
  marginTop: '20px'
}}>
  <h3>Your Carbon Token Balance: {carbonTokenBalance * 10 ** 18} FTK</h3>
  <h3>Carbon Token Price: {carbonTokenPrice} C2FLR</h3>
  <h3>Total Investment Made: {totalInvestment} FTK</h3>
  <div className="project-list" style={{ display: "flex", flexDirection: "row", overflowX: "auto", gap: "20px", whiteSpace: "nowrap" }}>
  
</div>


</div>

<div>
  <FlrUsdPrice />
</div>
<div>
  <CarbonInten />
</div>

<div className="container mx-auto p-6">
      <CarbonProjects />
    </div>

    <div className="container mx-auto p-6">
    <CarbonIntensity/>
</div>




<div
  className="project-list"
  style={{ display: "flex", flexDirection: "row", overflowX: "auto", gap: "20px", whiteSpace: "nowrap" }}
>
  {projects.map((project, index) => (
    <div
      key={index}
      className="project-card"
      style={{
        width: "300px",
        textAlign: "center",
        display: "inline-block",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* ProjectImage */}

      
{/* Inside the .map() function */}
<img
  src={projectImages[index % projectImages.length]} // Cycles through images
  alt="Project"
  className="project-image"
  style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
/>
 
      <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "5px", textAlign: "center" }}>
  {project.name}
</h3>

{/* Project Details (Centralized) */}
<div style={{ textAlign: "left" , paddingRight: "80px"}}>
  <p style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}>
    📍 <strong>{project.location}</strong>
  </p>
  <p style={{ fontSize: "14px", marginBottom: "5px" }}>
    🌱 <strong>CO₂ Offset:</strong> {project.estimatedCO2} tons
  </p>
  <p style={{ fontSize: "14px", marginBottom: "10px" }}>
    💰 <strong>Min Investment:</strong> {project.minInvestment} FTK
  </p>
</div>

      {/* Investment & Token Purchase Section (Side by Side) */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", paddingRight: "10px" }}>
        {/* Investment Input & Button */}
        <div style={{ width: "48%", textAlign: "center" }}>
          <input
            type="number"
            placeholder="Investment Amount"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "5px", marginBottom: "5px", textAlign: "center" }}
          />
          <br />
          <button
            onClick={() => investInProject(project.id)}
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Invest
          </button>
        </div>

        {/* Token Purchase Input & Button */}
        <div style={{ width: "48%", textAlign: "center" }}>
          <input
            type="number"
            placeholder="Token Amount"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
            style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "5px", marginBottom: "5px", textAlign: "center" }}
          />
          <br />
          <button
            onClick={buyCarbonToken}
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Buy Tokens
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

             
      
             
            </>
          )}




      
          {/* Show ONLY for "Farmer" Mode */}
          {toggleMode === "Farmer" && (
            <div className="form-section">
              <h2>Register Reforestation Project</h2>
              <input placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
              <input placeholder="Location" value={projectLocation} onChange={(e) => setProjectLocation(e.target.value)} />
              <input placeholder="Estimated CO2 Offset" value={estimatedCO2} onChange={(e) => setEstimatedCO2(e.target.value)} />
              <input placeholder="Minimum Investment" value={minInvestment} onChange={(e) => setMinInvestment(e.target.value)} />
              <button onClick={registerProject}>Register Project</button>
            </div>
          )}
        </div>
      );
    };      
  
  export default ForestManage;
  





