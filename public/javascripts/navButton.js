export default function (text, container, lastPageEl, selected = false) {
  const btn = document.createElement('button');
  btn.classList.add('numberedButton');
  btn.classList.add('buttonHover');
  btn.innerText = `${text}`;
  btn.id = `numberedButtonId__${text}`;
  if (selected) {
    btn.classList.add('numberedButton--selected');
    lastPageEl = btn;
  }
  container.appendChild(btn);
  return lastPageEl;
}
