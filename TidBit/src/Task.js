export default class Task {
  constructor(task, date, time, description, priority) {
    this.task = task;
    this.date = date; // yyyy-MM-dd
    this.time = time; // HH:mm
    this.description = description;
    this.priority = priority; // "High", "Medium", "Low"
  }
}