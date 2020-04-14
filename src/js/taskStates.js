/* eslint-disable no-param-reassign */

// закрепляет задачу
function pinTask(task, checkbox, container) {
  task.isChecked = true;
  checkbox.innerHTML = '&#10022;';
  container.appendChild(task.element);
}

// открепляет задачу
function unpinTask(task, checkbox, container) {
  task.isChecked = false;
  checkbox.innerHTML = '';
  container.appendChild(task.element);
}

export { pinTask, unpinTask };
