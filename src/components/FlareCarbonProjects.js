import React, { useState, useEffect } from 'react';

const CarbonIntensity = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.carbonintensity.org.uk/intensity/date')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>UK Carbon Intensity - Last 24 Hours</h2>
      <ul>
        {data.map((entry, index) => (
          <li key={index}>
            Time: {entry.from} - {entry.to}, Intensity: {entry.intensity.actual} gCO2/kWh
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarbonIntensity;
