import createTask from './createTask.js';
import changeTaskState from './changeTaskState.js';
import getNotPinnedTasks from './getNotPinnedTasks.js';
import showNotPinnedTask from './showNotPinnedTask.js';
import clearInput from './clearInput.js';

const bodyEl = document.querySelector('body');

// создание контейнера для всех элементов на странице
const taskManagerContainer = document.createElement('div');
taskManagerContainer.classList.add('task-manager_container');

// создание хэдера TOP Tasks
const header = document.createElement('div');
header.classList.add('header');
header.innerHTML = '<div class="header_main"><p><span class="uppercase_text">Top</span> Tasks</p></div>';

// создание формы и поля ввода
const taskForm = document.createElement('form');
taskForm.classList.add('input_form');
const inputField = document.createElement('input');
inputField.classList.add('input_field');
inputField.required = true;

// создание контейнера для закрепленных задач
const pinnedTasksContainer = document.createElement('div');
pinnedTasksContainer.classList.add('pinned-tasks_container');
pinnedTasksContainer.innerHTML = '<div class="header_pinned"><p>Pinned:</p></div>';
const noPinnedTasksDummy = document.createElement('div');
// заглушка при отсутвии задач в Pinned Tasks
noPinnedTasksDummy.classList.add('no-pinned-tasks');
noPinnedTasksDummy.innerHTML = '<p><span class="uppercase_text red_text">No pinned tasks</span></p>';

// создание контейнера для всех задач
const allTasksContainer = document.createElement('div');
allTasksContainer.classList.add('all-tasks_container');
allTasksContainer.innerHTML = '<div class="header_all-tasks"><p>All Tasks:</p></div>';
const noTasksDummy = document.createElement('div');
// заглушка при отсутвии задач в All Tasks
noTasksDummy.classList.add('no-tasks');
noTasksDummy.classList.add('hide');
noTasksDummy.innerHTML = '<p><span class="uppercase_text red_text">No tasks found</span></p>';

// добавление всех созданных элементов на страницу
taskForm.appendChild(inputField);
header.appendChild(taskForm);
pinnedTasksContainer.appendChild(noPinnedTasksDummy);
allTasksContainer.appendChild(noTasksDummy);
taskManagerContainer.appendChild(header);
taskManagerContainer.appendChild(pinnedTasksContainer);
taskManagerContainer.appendChild(allTasksContainer);
bodyEl.appendChild(taskManagerContainer);

// массив для созданных задач
const taskArray = [];

// вызов по нажатию Enter и непустому полю input
inputField.addEventListener('keydown', (event) => {
  if (event.keyCode === 13 && inputField.value !== '') {
    // создание задачи
    const task = createTask(inputField.value, taskArray, allTasksContainer);
    const checker = task.element.querySelector('.checker');
    // навешивание слушателя клика на чекбокс
    checker.addEventListener('click', () => changeTaskState(task, checker, taskArray, allTasksContainer, pinnedTasksContainer));
    // отображение незакрепленных задач
    const notPinnedTasks = getNotPinnedTasks(taskArray);
    notPinnedTasks.forEach((item) => showNotPinnedTask(item, noTasksDummy));
    // очистка поля input
    clearInput(inputField);
  }
});

// вызов по любому изменению в поле input
inputField.addEventListener('input', () => {
  const notPinnedTasks = getNotPinnedTasks(taskArray);
  // приведение input.value и имя задачи к lower case для сверки
  const inputLowerCase = inputField.value.toLowerCase();
  if (notPinnedTasks.length !== 0) {
    notPinnedTasks.forEach((item) => {
      const taskNameLowerCase = item.name.toLowerCase();
      // показ всех незакрепленных задач при пустом поле input
      if (inputField.value === '') {
        showNotPinnedTask(item, noTasksDummy);
      }
      // скрытие задач, у которых нет совпадения с input.value, и показ тех, у которых есть
      if (!taskNameLowerCase.includes(inputLowerCase)) {
        item.element.classList.add('hide');
      } else {
        showNotPinnedTask(item, noTasksDummy);
      }
    });
    // скрытие заглушки для All Tasks
    if (notPinnedTasks.every((item) => item.element.classList.contains('hide'))) {
      noTasksDummy.classList.remove('hide');
    }
  }
});
