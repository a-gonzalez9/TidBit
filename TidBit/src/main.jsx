import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendarTab from "./CalendarTab";
import TaskBreakdown from "./TaskBreakdown";
import BitBreakdown from "./BitBreakdown";
import MentorChat from "./MentorChat";
import Layout from "./Layout"; // <-- new file where sidebar lives
import "./index.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear breakdown from localStorage (or any temp data)
      localStorage.clear();
      // Or clear all:
      // localStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* wrap everything in Layout so sidebar is always shown */}
        <Route element={<Layout />}>
          <Route path="/" element={<CalendarTab />} />
          <Route path="/tasks" element={<TaskBreakdown />} />
          <Route path="/bits" element={<BitBreakdown />} />
          <Route path="/mentor" element={<MentorChat />} />
        </Route>
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
