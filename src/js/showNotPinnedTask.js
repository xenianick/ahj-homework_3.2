// отображает незакрепленную задачу
export default function showNotPinnedTask(item, dummy) {
  item.element.classList.remove('hide');
  if (!dummy.classList.contains('hide')) {
    dummy.classList.add('hide');
  }
}
