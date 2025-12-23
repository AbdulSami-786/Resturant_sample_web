import React from "react";

const ARViewer = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: "2rem",
        backgroundColor: "#f8f8f8",
        borderRadius: "16px",
        margin: "2rem 0",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "0.5rem" }}>AR View</h2>
      <p style={{ color: "#666" }}>
        Augmented Reality menu preview coming soon
      </p>
      <button
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.4rem",
          borderRadius: "999px",
          border: "none",
          backgroundColor: "#111",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Launch AR (Soon)
      </button>
    </div>
  );
};

export default ARViewer;
