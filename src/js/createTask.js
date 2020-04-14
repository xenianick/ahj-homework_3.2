import Task from './Task.js';

// создает новую задачу
export default function createTask(name, storage, container) {
  const task = new Task(name);
  const taskEl = task.element;
  storage.push(task);
  container.appendChild(taskEl);
  return task;
}
