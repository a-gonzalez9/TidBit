import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "./assets/logo.png";
import "./CalendarTab.jsx";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = ["calendar", "task breakdown", "a bit of advice", "bit breakdown"];
  const routeMap = {
    "calendar": "/",
    "task breakdown": "/tasks",
    "a bit of advice": "/mentor",
    "bit breakdown": "/bits",
  };

  // Handle background fade
  useEffect(() => {
    if (location.pathname === "/bits") {
      document.body.style.backgroundColor = "#110529"; // dark gray
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, [location.pathname]);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Montserrat" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          backgroundColor: "#3c1c7a",
          color: "white",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "3rem",
            fontFamily: "qurova",
            fontWeight: "bold",
            fontSize: "3rem",
            textTransform: "lowercase",
          }}
        >
          <img src={logo} alt="TidBit" style={{ width: "60px", marginRight: "1rem" }} />
          tidbit
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {tabs.map((tab) => {
            const route = routeMap[tab];
            const isActive = location.pathname === route;

            return (
              <button
                key={tab}
                onClick={() => navigate(route)}
                style={{
                  background: isActive ? "white" : "transparent",
                  color: isActive ? "#3c1c7a" : "white",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.75rem",
                  borderRadius: "16px",
                  fontFamily: "qurova",
                  fontSize: "1.5rem",
                  transition: "all 0.2s ease",
                  lineHeight: "1.5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.background = "white";
                    e.target.style.color = "#3c1c7a";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.background = "transparent";
                    e.target.style.color = "white";
                  }
                }}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: location.pathname === "/bits" || location.pathname === "/" ? "0" : "1rem", // remove padding for Bit Breakdown
        }}
>
  <Outlet />
</div>
    </div>
  );
}
