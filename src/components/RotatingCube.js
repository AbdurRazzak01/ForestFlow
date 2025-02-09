import React from "react";
import "./../styles/RotatingCube.css";

const RotatingCube = () => {
  return (
    <div className="cube-container">
      <div className="cube">
        <div className="cube-face cube-face-front">Secure</div>
        <div className="cube-face cube-face-back">Reliable</div>
        <div className="cube-face cube-face-right">Decentralized</div>
        <div className="cube-face cube-face-left">Only On Flare</div>
        <div className="cube-face cube-face-top">Transparent</div>
        <div className="cube-face cube-face-bottom">Advanced</div>
      </div>
    </div>
  );
};

export default RotatingCube;
