import Task from './Task.js';

const bodyEl = document.querySelector('body');

const taskManagerContainer = document.createElement('div');
taskManagerContainer.classList.add('task-manager_container');

const header = document.createElement('div');
header.classList.add('header');
header.innerHTML = '<div class="header_main"><p><span class="uppercase_text">Top</span> Tasks</p></div>';

const taskForm = document.createElement('form');
taskForm.classList.add('input_form');

const inputField = document.createElement('input');
inputField.classList.add('input_field');
inputField.required = true;

const pinnedTasksContainer = document.createElement('div');
pinnedTasksContainer.classList.add('pinned-tasks_container');
pinnedTasksContainer.innerHTML = '<div class="header_pinned"><p>Pinned:</p></div>';

const noPinnedTasksDummy = document.createElement('div');
noPinnedTasksDummy.classList.add('no-pinned-tasks');
noPinnedTasksDummy.innerHTML = '<p><span class="uppercase_text red_text">No pinned tasks</span></p>';

const allTasksContainer = document.createElement('div');
allTasksContainer.classList.add('all-tasks_container');
allTasksContainer.innerHTML = '<div class="header_all-tasks"><p>All Tasks:</p></div>';

const noTasksDummy = document.createElement('div');
noTasksDummy.classList.add('no-tasks');
noTasksDummy.classList.add('hide');
noTasksDummy.innerHTML = '<p><span class="uppercase_text red_text">No tasks found</span></p>';

taskForm.appendChild(inputField);
header.appendChild(taskForm);
pinnedTasksContainer.appendChild(noPinnedTasksDummy);
allTasksContainer.appendChild(noTasksDummy);
taskManagerContainer.appendChild(header);
taskManagerContainer.appendChild(pinnedTasksContainer);
taskManagerContainer.appendChild(allTasksContainer);
bodyEl.appendChild(taskManagerContainer);

const taskArray = [];

inputField.addEventListener('keydown', (event) => {
  if (event.keyCode === 13 && inputField.value !== '') {
    const task = new Task(inputField.value);
    const taskEl = task.element;
    taskArray.push(task);
    allTasksContainer.appendChild(taskEl);
    const checkerBox = taskEl.querySelector('.checker-box');
    checkerBox.addEventListener('click', () => {
      if (!noPinnedTasksDummy.classList.contains('hide')) {
        noPinnedTasksDummy.classList.add('hide');
      }
      if (checkerBox.classList.contains('checked')) {
        task.isChecked = false;
        checkerBox.innerHTML = '';
        allTasksContainer.appendChild(taskEl);
        if (!pinnedTasksContainer.lastChild.classList.contains('task')) {
          noPinnedTasksDummy.classList.remove('hide');
        }
        if (!noTasksDummy.classList.contains('hide')) {
          noTasksDummy.classList.add('hide');
        }
      } else {
        task.isChecked = true;
        checkerBox.innerHTML = '&#10022;';
        pinnedTasksContainer.appendChild(taskEl);
        const notPinnedTasks = taskArray.filter((item) => item.isChecked === false);
        if (notPinnedTasks.every((item) => item.element.classList.contains('hide'))) {
          noTasksDummy.classList.remove('hide');
        }
      }
      checkerBox.classList.toggle('checked');
    });
    const notPinnedTasks = taskArray.filter((item) => item.isChecked === false);
    notPinnedTasks.forEach((item) => item.element.classList.remove('hide'));
    noTasksDummy.classList.add('hide');
    inputField.value = '';
    inputField.blur();
  }
});

inputField.addEventListener('input', () => {
  const notPinnedTasks = taskArray.filter((item) => item.isChecked === false);
  const inputLowerCase = inputField.value.toLowerCase();
  if (notPinnedTasks.length !== 0) {
    notPinnedTasks.forEach((item) => {
      const taskNameLowerCase = item.name.toLowerCase();
      if (inputField.value === '') {
        item.element.classList.remove('hide');
        noTasksDummy.classList.add('hide');
      }
      if (!taskNameLowerCase.includes(inputLowerCase)) {
        item.element.classList.add('hide');
      } else {
        item.element.classList.remove('hide');
        noTasksDummy.classList.add('hide');
      }
    });
    if (notPinnedTasks.every((item) => item.element.classList.contains('hide'))) {
      noTasksDummy.classList.remove('hide');
    }
  }
});
