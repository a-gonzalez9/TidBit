import React, { useState } from "react";

export default function BitBreakdown() {
  const [bits, setBits] = useState([]);

  const addBit = () => {
    const newBit = `💃`; // You can later replace with a dynamic “bit” character
    setBits([...bits, newBit]);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Bit Breakdown</h1>
      <button
        onClick={addBit}
        style={{
          backgroundColor: "#0077ff",
          color: "white",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        Complete Task (Add Bit)
      </button>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {bits.map((bit, idx) => (
          <span key={idx} style={{ fontSize: "2rem" }}>{bit}</span>
        ))}
      </div>
    </div>
  );
}
