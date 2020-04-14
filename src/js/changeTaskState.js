/* eslint-disable no-param-reassign */
import hideDummy from './hideDummy.js';
import { pinTask, unpinTask } from './taskStates.js';
import getNotPinnedTasks from './getNotPinnedTasks.js';

// меняет состояния задачи (закреплена/незакреплена)
function changeTaskState(task, checkbox, storage, allTasksContainer, pinnedTasksContainer) {
  const dummyPinnedTasks = pinnedTasksContainer.querySelector('.no-pinned-tasks');
  const dummyAllTasks = allTasksContainer.querySelector('.no-tasks');
  // скрытие заглушки для закрепленных задач
  hideDummy(dummyPinnedTasks);
  // открепление задачи
  if (checkbox.classList.contains('checked')) {
    unpinTask(task, checkbox, allTasksContainer);
    // показ заглушки, если закрепленных задач нет
    if (!pinnedTasksContainer.lastChild.classList.contains('task')) {
      dummyPinnedTasks.classList.remove('hide');
    }
    // скрытие заглушки для незакрепленных задач
    hideDummy(dummyAllTasks);
  }
  // закрепление задачи
  if (!checkbox.classList.contains('checked')) {
    pinTask(task, checkbox, pinnedTasksContainer);
    // проверка на то, все ли незакрепленные задачи отображены
    // если да, то прячет заглушку для незакрепленных задач
    const notPinnedTasks = getNotPinnedTasks(storage);
    if (notPinnedTasks.every((item) => item.element.classList.contains('hide'))) {
      dummyAllTasks.classList.remove('hide');
    }
    // скрытие заглушки, если поле input неактивно, но незакрепленных задач нет
    if (notPinnedTasks.length === 0) {
      dummyAllTasks.classList.add('hide');
    }
  }
  checkbox.classList.toggle('checked');
}

export default changeTaskState;
