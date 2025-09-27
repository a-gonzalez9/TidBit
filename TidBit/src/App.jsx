import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CalendarTab from "./components/CalendarTab";
import TaskBreakdown from "./components/TaskBreakdown";
import BitBreakdown from "./components/BitBreakdown";

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-200 flex gap-4">
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
