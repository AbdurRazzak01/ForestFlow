import React, { useState, useEffect } from "react";
import axios from "axios";

const ForestFlow = () => {
  const [ndvi, setNdvi] = useState(null);
  const [co2, setCo2] = useState(null);
  const [treeDensity, setTreeDensity] = useState(null);

  useEffect(() => {
    fetchNDVI();
    fetchCO2();
    fetchTreeDensity();
  }, []);

  // Fetch NDVI Data from Sentinel Hub
  const fetchNDVI = async () => {
    try {
      const response = await axios.get(
        "https://services.sentinel-hub.com/api/v1/ndvi?lat=51.5074&lon=-0.1278"
      );
      setNdvi(response.data.ndvi);
    } catch (error) {
      console.error("Error fetching NDVI data:", error);
    }
  };

  // Fetch CO₂ Levels from Open-Meteo API
  const fetchCO2 = async () => {
    try {
      const response = await axios.get(
        "https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current=co2"
      );
      setCo2(response.data.current.co2);
    } catch (error) {
      console.error("Error fetching CO₂ data:", error);
    }
  };

  // Fetch Tree Density from Global Forest Watch API
  const fetchTreeDensity = async () => {
    try {
      const response = await axios.get(
        "https://developers.globalforestwatch.org/tree-density?lat=51.5074&lon=-0.1278"
      );
      setTreeDensity(response.data.density);
    } catch (error) {
      console.error("Error fetching Tree Density data:", error);
    }
  };

  return (
    <div>
      <h2>ForestFlow Verification</h2>
      <p>NDVI Score: {ndvi}</p>
      <p>CO₂ Absorption: {co2} ppm</p>
      <p>Tree Density: {treeDensity} trees per km²</p>
    </div>
  );
};

export default ForestFlow;
