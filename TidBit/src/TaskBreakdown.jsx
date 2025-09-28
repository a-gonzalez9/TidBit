import React from "react";
import Task from "./Task.js";

export default function TaskBreakdown() {
  console.log(Task.getAll()); // an array of task arrays

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Task Breakdown</h1>
      <p>This tab will show tasks broken down into smaller steps (Phase 2 will add AI functionality here).</p>
    </div>
  );
}
