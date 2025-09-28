import React, { useState } from "react";
import Modal from "react-modal";
import { addDays, startOfWeek, format, isToday } from "date-fns";
import Task from "./Task";
import "./index.css";
import { useNavigate } from "react-router-dom";


Modal.setAppElement("#root");

export default function CalendarTab() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    task: "",
    date: "",
    time: "",
    description: "",
    priority: "Medium",
  });

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const openModal = (index = null) => {
    if (index !== null) {
      const t = tasks[index];
      setFormData({ ...t });
      setEditingTaskIndex(index);
    }
    setModalOpen(true);
  };
  const closeModal = () => {
    setEditingTaskIndex(null);
    setModalOpen(false);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = new Task(
      formData.task,
      formData.date,
      formData.time,
      formData.description,
      formData.priority
    );

    const updatedTasks =
      editingTaskIndex !== null
        ? tasks.map((t, i) => (i === editingTaskIndex ? newTask : t))
        : [...tasks, newTask];

    setTasks(updatedTasks);

    setFormData({
      task: "",
      date: "",
      time: "",
      description: "",
      priority: "Medium",
    });

    closeModal();
  };

  const prevWeek = () => setCurrentWeek((prev) => addDays(prev, -7));
  const nextWeek = () => setCurrentWeek((prev) => addDays(prev, 7));

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Montserrat" }}>
      {/* Sidebar */}

      {/* Calendar */}
      <div style={{ flex: 1, padding: "2rem", overflowX: "auto" }}>
        {/* Month Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            fontFamily: "qurova",
            fontSize: "1.8rem",
          }}
        >
          <div>
            <button
              onClick={prevWeek}
              style={{ marginRight: "0.5rem", borderRadius: "8px", padding: "0.3rem 0.6rem", fontSize: "1rem" }}
            >
              &lt;
            </button>
            <button
              onClick={nextWeek}
              style={{ borderRadius: "8px", padding: "0.3rem 0.6rem", fontSize: "1rem" }}
            >
              &gt;
            </button>
          </div>
          <div>{format(currentWeek, "MMMM")}</div>
          <button
            onClick={() => openModal()}
            style={{
              backgroundColor: "#3c1c7a",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              fontFamily: "montserrat",
              fontWeight: "bold",
              borderRadius: "12px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            + Add Task
          </button>
        </div>

        {/* Weekly Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "60px repeat(7, 1fr)",
            borderTop: "1px solid #ccc",
            borderLeft: "1px solid #ccc",
            overflowY: "scroll",
            height: "calc(100vh - 120px)",
            borderRadius: "12px",
          }}
        >
          {/* Empty corner */}
          <div></div>
          {/* Day headers */}
          {days.map((day) => (
            <div
              key={day}
              style={{
                borderRight: "1px solid #ccc",
                borderBottom: "1px solid #ccc",
                textAlign: "center",
                fontWeight: "bold",
                backgroundColor: isToday(day) ? "#dcd0ff" : "#f3f3f3",
                padding: "0.25rem",
                borderTopRightRadius: "8px",
                borderTopLeftRadius: "8px",
                position: "sticky", 
                top: 0,
                zIndex: 3,
              }}
            >
              <div style={{ fontSize: "0.75rem" }}>{format(day, "EEE")}</div>
              <div style={{ fontSize: "1.2rem" }}>{format(day, "dd")}</div>
            </div>
          ))}

          {/* Hours and tasks */}
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div
                style={{
                  borderRight: "1px solid #ccc",
                  borderBottom: "1px solid #ccc",
                  padding: "0.25rem",
                  textAlign: "center",
                  fontSize: "0.8rem",
                  backgroundColor: "#f9f9f9",
                  position: "sticky",
                  left: 0,
                  zIndex: 2,
                  display: "flex",   
                  alignItems: "center", 
                  justifyContent: "center",
                }}
              >
                {hour}:00
              </div>
              {days.map((day) => {
                const cellTasks = tasks.filter(
                  (t) =>
                    t.date === format(day, "yyyy-MM-dd") &&
                    parseInt(t.time.split(":")[0]) === hour
                );
                return (
                  <div
                    key={day + hour}
                    style={{
                      borderRight: "1px solid #ccc",
                      borderBottom: "1px solid #ccc",
                      minHeight: "50px",
                      position: "relative",
                      padding: "2px",
                      borderRadius: "6px",
                    }}
                  >
                    {cellTasks.map((t, idx) => (
                      <div
                        key={idx}
                        title={t.description}
                        onClick={() => openModal(tasks.indexOf(t))}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          backgroundColor:
                            t.priority === "High"
                              ? "#ff9999"
                              : t.priority === "Low"
                              ? "#b3ffb3"
                              : "#dcd0ff",
                          padding: "2px 4px",
                          borderRadius: "8px",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {t.task}
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Modal */}
        <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          contentLabel="Add Task"
          style={{
            content: {
              width: "calc(100% - 240px)",
              maxWidth: "500px",
              height: "fit-content",
              margin: "auto",
              borderRadius: "12px",
              padding: "1rem",
            },
          }}
        >
          <h2>{editingTaskIndex !== null ? "Edit Task" : "Add Task"}</h2>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label>
              Task:
              <input
                type="text"
                name="task"
                value={formData.task}
                onChange={handleChange}
                required
                style={{ width: "100%", borderRadius: "6px", padding: "4px" }}
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={{ width: "100%", borderRadius: "6px", padding: "4px" }}
              />
            </label>
            <label>
              Time:
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                style={{ width: "100%", borderRadius: "6px", padding: "4px" }}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                style={{ width: "100%", borderRadius: "6px", padding: "4px" }}
              />
            </label>
            <label>
              Priority:
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={{ width: "100%", borderRadius: "6px", padding: "4px" }}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>
            <button
              type="submit"
              style={{
                backgroundColor: "#3c1c7a",
                color: "white",
                padding: "0.5rem",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
            >
              Save Task
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
}
