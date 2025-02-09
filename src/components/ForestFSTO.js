import React, { useState, useEffect } from "react";
import { getFlrUsdPrice } from "../utils/contracts"; // Import function from your contract utils

const FlrUsdPrice = ({ setCurrentCarbonTokenPrice }) => { 
  const [price, setPrice] = useState(null);
  const [timestamp, setTimestamp] = useState("");  // Ensure it's a string
  const [loading, setLoading] = useState(true);
  const [flrFor50Usd, setFlrFor50Usd] = useState(0);

  useEffect(() => {
    const fetchPrice = async () => {
      console.log("🚀 Fetching FLR/USD price...");

      try {
        const result = await getFlrUsdPrice();
        console.log("✅ API Response:", result);

        if (result && result.price && result.timestamp) {
          setPrice(result.price);
          const carbonTokenPrice = 50 / result.price;
          setFlrFor50Usd(carbonTokenPrice);

          // **Force React to update timestamp correctly**
          setTimestamp(prev => (prev !== result.timestamp ? result.timestamp : `${result.timestamp} `));

          console.log("🔄 Updated Timestamp:", result.timestamp);
        } else {
          console.error("⚠️ API returned invalid data:", result);
          setTimestamp("⚠️ Invalid Timestamp");
        }
      } catch (error) {
        console.error("❌ Error fetching price:", error);
        setTimestamp("❌ Fetch Error");
      }

      setLoading(false);
    };

    fetchPrice();
  }, []);

  console.log("🖥️ Render: Timestamp state ->", timestamp);

  return (
    <div style={styles.container}>
      {loading ? (
        <p style={styles.loading}>Fetching price...</p>
      ) : price ? (
        <div>
          <p style={styles.price}>1 FLR = <strong>${price.toFixed(4)}</strong> USD</p>
          <p style={styles.price}>Current Price of 1 Carbon Token = <strong>{flrFor50Usd.toFixed(4)}</strong> FLR</p>
          <p style={styles.timestamp}>
            📅 Last Updated: {timestamp ? timestamp : "N/A"}
          </p>
        </div>
      ) : (
        <p style={styles.error}>❌ Failed to fetch price.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#222",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "100%",
    margin: "20px auto",
    boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.1)",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4CAF50",
  },
  timestamp: {
    fontSize: "14px",
    marginTop: "5px",
    color: "#bbb",
  },
  loading: {
    fontSize: "16px",
    color: "#ddd",
  },
  error: {
    fontSize: "16px",
    color: "#FF4C4C",
  },
};

export default FlrUsdPrice;
