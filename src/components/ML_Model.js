import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// API Keys (DO NOT hardcode in production, use environment variables)

const GOOGLE_MAPS_API_KEY = "AIzaSyCYTOPpiZpeuDL_8nFHXyXiEQWhlj_grqE";
const OPENAI_API_KEY = "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";
const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
// Handles location selection on map
const LocationSelector = ({ setLocation }) => {
    useMapEvents({
      click(e) {
        setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };
  
  const ML_Model = () => {
    const [location, setLocation] = useState(null);
    const [treeCount, setTreeCount] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [carbonPrediction, setCarbonPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const fetchSatelliteImage = async () => {
        if (!location) return null;
    
        const sentinelImageUrl = `https://services.sentinel-hub.com/ogc/wms/YOUR_SENTINEL_HUB_INSTANCE_ID?REQUEST=GetMap&BBOX=${location.lat-0.01},${location.lng-0.01},${location.lat+0.01},${location.lng+0.01}&WIDTH=600&HEIGHT=600&LAYERS=TRUE_COLOR&FORMAT=image/png`;
    
        console.log("Generated Sentinel Satellite Image URL:", sentinelImageUrl);
        return sentinelImageUrl;
    };
    
    
    // Handle Submit & Fetch AI Predictions
    const handleSubmit = async () => {
      if (!location || !treeCount) {
        alert("Please select a location and enter tree count.");
        return;
      }
  
      setLoading(true);
  
      try {
        // Fetch the aerial image
        const satelliteImageUrl = await fetchSatelliteImage();
        if (satelliteImageUrl) {
          setImageUrl(satelliteImageUrl);
        } else {
          alert("Failed to load satellite image. Check API key and billing setup.");
        }
  
        // Prepare AI Request
        const payload = {
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are an AI model specialized in environmental analysis." },
            { role: "user", content: `Analyze this location (${location.lat}, ${location.lng}) where ${treeCount} trees are planted. Estimate the potential carbon sequestration.` }
          ]
        };
  
        // Call OpenAI API
        const response = await axios.post(OPENAI_ENDPOINT, payload, {
          headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
          }
        });
  
        const aiPrediction = response.data.choices[0].message.content;
        setCarbonPrediction(aiPrediction);
      } catch (error) {
        console.error("Error sending data to OpenAI:", error);
        alert("Error fetching AI prediction.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div style={{ width: "100%", height: "60vh", position: "relative" }}>
        <MapContainer center={[-1.8312, -78.1834]} zoom={6} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationSelector setLocation={setLocation} />
          {location && (
            <Marker position={[location.lat, location.lng]}>
              <Popup>
                <div style={{ textAlign: "center" }}>
                  <h3>Tree Planting Data</h3>
                  <p>Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}</p>
                  <input
                    type="number"
                    value={treeCount}
                    onChange={(e) => setTreeCount(e.target.value)}
                    placeholder="Enter Tree Count"
                    style={{ width: "80%", padding: "5px", marginBottom: "5px" }}
                  />
                  <button onClick={handleSubmit} style={{ background: "#007BFF", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer" }}>
                    Submit
                  </button>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
  
        {loading && (
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            textAlign: "center"
          }}>
            <p>Processing AI Prediction...</p>
          </div>
        )}
  
        {carbonPrediction && (
          <div style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "10px",
            borderRadius: "8px",
            zIndex: 1000,
            textAlign: "center",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
          }}>
            <h4>Carbon Sequestration Prediction</h4>
            <p>{carbonPrediction}</p>
          </div>
        )}
  
        {imageUrl ? (
          <div style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "10px",
            borderRadius: "8px",
            zIndex: 1000,
            textAlign: "center",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
          }}>
            <h4>Satellite Image</h4>
            <img src={imageUrl} alt="Satellite View" style={{ width: "400px", height: "400px", objectFit: "cover" }} />
          </div>
        ) : (
          <p>No satellite image available.</p>
        )}
      </div>
    );
  };
  
  export default ML_Model;
  