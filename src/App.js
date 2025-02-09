import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConnectWallet from "./components/ConnectWallet";
import EscrowManager from "./components/EscrowManager";
import HowItWorks from "./components/HowItWorks";
import "./styles/App.css";
import "./styles/ConnectWallet.css";
import "./styles/ForestManage.css";


function App() {
  const [account, setAccount] = useState(null);

  return (
    <div className="App">
      <Header/>

      {!account ? (
        <>
          <ConnectWallet setAccount={setAccount} />
          <HowItWorks></HowItWorks>
        
        </>
      ) : (
        <EscrowManager account={account} />
      )}
    
      <Footer />
    </div>
  );
}

export default App;
