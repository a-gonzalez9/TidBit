export default class Calendar {
  static getTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks;
  }

  static addTask(task) {
    const tasks = Calendar.getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static updateTask(updatedTask) {
    const tasks = Calendar.getTasks();
    const index = tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  static deleteTask(id) {
    const tasks = Calendar.getTasks().filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};