// BitBreakdown.jsx
import React, { useState, useEffect } from "react";

export default function BitBreakdown() {
  const images = [
    "/images/image1.png", // replace with your actual image paths
    "/images/image2.png",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1000); // 1000ms = 1 second

    return () => clearInterval(interval); // clean up on unmount
  }, []);

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img
        src={images[currentImage]}
        alt="Bit Animation"
        style={{
          width: "calc(100% - 240px)", // roughly same size as calendar
          maxWidth: "800px",
          borderRadius: "12px",
          padding: "1rem",
          objectFit: "cover",
        }}
      />
    </div>
  );
}



// import React, { useState } from "react";

// export default function BitBreakdown() {
//   const [bits, setBits] = useState([]);

//   const addBit = () => {
//     const newBit = `💃`; // You can later replace with a dynamic “bit” character
//     setBits([...bits, newBit]);
//   };

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Bit Breakdown</h1>
//       <button
//         onClick={addBit}
//         style={{
//           backgroundColor: "#0077ff",
//           color: "white",
//           padding: "0.5rem 1rem",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//           marginBottom: "1rem",
//         }}
//       >
//         Complete Task (Add Bit)
//       </button>
//       <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
//         {bits.map((bit, idx) => (
//           <span key={idx} style={{ fontSize: "2rem" }}>{bit}</span>
//         ))}
//       </div>
//     </div>
//   );
// }
