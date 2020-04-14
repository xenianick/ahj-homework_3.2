export default class Task {
  constructor(name) {
    this.name = name;
    this.isChecked = false;
    this.isHidden = false;
    this.element = document.createElement('div');
    this.element.className = 'task';
    this.element.innerHTML = `<div class="task_name"><p>${this.name}</p></div><div class="checker"></div>`;
  }
}
