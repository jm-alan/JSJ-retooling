export default function create (type, id = null, ...classes) {
  const el = document.createElement(String(type));
  if (id) el.setAttribute('id', String(id));
  if (classes.length) classes.forEach(hClass => el.classList.add(hClass));
  return el;
}
