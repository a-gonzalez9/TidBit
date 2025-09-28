// BitBreakdown.jsx
import React, { useState, useEffect } from "react";

// import images
import dance1 from "./assets/dancefloor1.png";
import dance2 from "./assets/dancefloor2.png";
import bit1 from "./assets/dancingbit1.png";
import bit2 from "./assets/dancingbit2.png";

export default function BitBreakdown() {
  const dancefloors = [dance1, dance2];
  const bits = [bit1, bit2];

  const [bgIndex, setBgIndex] = useState(0);
  const [bitIndex, setBitIndex] = useState(0);

  // alternate dancefloor every second
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % dancefloors.length);
    }, 700);
    return () => clearInterval(bgInterval);
  }, []);

  // alternate bit every 2 seconds
  useEffect(() => {
    const bitInterval = setInterval(() => {
      setBitIndex((prev) => (prev + 1) % bits.length);
    }, 500);
    return () => clearInterval(bitInterval);
  }, []);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1000px",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        {/* background */}
        <img
          src={dancefloors[bgIndex]}
          alt="Dancefloor"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "16px",
          }}
        />

        {/* dancing bit */}
        <img
          src={bits[bitIndex]}
          alt="Dancing Bit"
          style={{
            position: "absolute",
            bottom: "0%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}
