// возвращает список незакрепленных задач
export default function getNotPinnedTasks(storage) {
  return storage.filter((item) => item.isChecked === false);
}
