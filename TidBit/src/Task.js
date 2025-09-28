export default class Task {
  constructor(task, date, time, description, priority) {
    this.task = task;
    this.date = date;
    this.time = time;
    this.description = description;
    this.priority = priority;
    this.id = Date.now(); // unique id for editing
  }
}