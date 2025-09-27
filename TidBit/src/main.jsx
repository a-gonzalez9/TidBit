import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CalendarTab from "./CalendarTab";
import TaskBreakdown from "./TaskBreakdown";
import BitBreakdown from "./BitBreakdown";
import "./index.css";

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", backgroundColor: "#f0f0f0", display: "flex", gap: "1rem" }}>
        <Link to="/">Calendar</Link>
        <Link to="/tasks">Task Breakdown</Link>
        <Link to="/bits">Bit Breakdown</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CalendarTab />} />
        <Route path="/tasks" element={<TaskBreakdown />} />
        <Route path="/bits" element={<BitBreakdown />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
