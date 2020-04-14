/* eslint-disable no-param-reassign */

// очищает поле ввода
export default function clearInput(field) {
  field.value = '';
  field.blur();
}
