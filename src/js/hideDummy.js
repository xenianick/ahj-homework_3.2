// скрывает заглушку
export default function hideDummy(dummy) {
  if (!dummy.classList.contains('hide')) {
    dummy.classList.add('hide');
  }
}
