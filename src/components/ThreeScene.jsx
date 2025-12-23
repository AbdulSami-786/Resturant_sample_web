import React from "react";

const ThreeScene = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        background: "linear-gradient(135deg, #111, #2a2a2a)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        borderRadius: "16px",
        margin: "2rem 0",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>3D Experience</h2>
        <p style={{ opacity: 0.7 }}>
          Interactive 3D showcase coming soon
        </p>
      </div>
    </div>
  );
};

export default ThreeScene;
