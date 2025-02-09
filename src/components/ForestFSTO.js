import React, { useState, useEffect } from "react";
import { getFlrUsdPrice } from "../utils/contracts"; // Import function from your contract utils

const FlrUsdPrice = () => {
  const [price, setPrice] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const result = await getFlrUsdPrice();
        if (result) {
          setPrice(result.price);
          setTimestamp(new Date(result.timestamp * 1000).toLocaleString()); // Convert timestamp to readable format
        }
      } catch (error) {
        console.error("Error fetching price:", error);
      }
      setLoading(false);
    };

    fetchPrice();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔥 FLR/USD Exchange Rate 🔥</h2>
      {loading ? (
        <p style={styles.loading}>Fetching price...</p>
      ) : price ? (
        <div>
          <p style={styles.price}>1 USD = <strong>{price.toFixed(4)}</strong> FLR</p>
          <p style={styles.timestamp}>📅 Last Updated: {timestamp}</p>
        </div>
      ) : (
        <p style={styles.error}>❌ Failed to fetch price.</p>
      )}
    </div>
  );
};

// 🔥 Inline CSS for styling
const styles = {
  container: {
    backgroundColor: "#222",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "400px",
    margin: "20px auto",
    boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.1)",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
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
