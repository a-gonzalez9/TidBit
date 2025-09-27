import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GoogleCalendar from "./GoogleCalendar";
import TaskBreakdown from "./TaskBreakdown";
import BitBreakdown from "./BitBreakdown";
import "./index.css";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/">Calendar</Link>
        <Link to="/tasks">Task Breakdown</Link>
        <Link to="/bits">Bit Breakdown</Link>
      </nav>
      <Routes>
        <Route path="/" element={<GoogleCalendar />} />
        <Route path="/tasks" element={<TaskBreakdown />} />
        <Route path="/bits" element={<BitBreakdown />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
