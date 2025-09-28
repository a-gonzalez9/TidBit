import Calendar from "./CalendarClass.js";

export default class Task {
  constructor(id, name, description, priority, date, time, breakdown = []) {
    this.id = id;           // unique identifier
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.date = date;
    this.time = time;
    this.breakdown = breakdown;
    this.createdAt = new Date().toISOString();
  }

    save() {
    Calendar.addTask(this);
  }

  static getAll() {
    return Calendar.getTasks();
  }

  static update(id, updatedTask) {
    Calendar.updateTask(id, updatedTask);
  }

  static delete(id) {
    Calendar.deleteTask(id);
  }
}
