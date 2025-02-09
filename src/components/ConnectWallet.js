import React from "react";
const ConnectWallet = ({ setAccount }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        alert("Connection failed. Please try again.");
      }
    } else {
      alert("MetaMask is required to connect your wallet.");
    }
  };

  return (
    <div>
      <h2>Welcome to ForestFlow</h2>
      <p>Real-Time Monitoring of Your Reforestation Project!,</p>
<p>Make Your Best Green Investment DecisioN Ever! </p>
      <button 
        onClick={connectWallet} 
        style={{
          display: 'inline-block',
          marginLeft: '100px', // Align to the left with padding
          padding: '10px 10px', // Smaller padding for a smaller button
          fontSize: '1.5rem', // Smaller font size
          color: '#ffffff',
          background: 'linear-gradient(90deg, #5ce16b, #8c52ff)',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
      >
        Connect Wallet
      </button>
      <img src="/image copy 2.png" alt="Decorative Image" className="decorative-image" />
    </div>
  );
};

export default ConnectWallet;
