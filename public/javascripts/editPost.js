import { editSubmit } from './index.js';

export default function ({ target }) {
  const { dataset: { backendId } } = target;
  const editModal = document.createElement('div');
  const screen = document.createElement('div');
  const editForm = document.createElement('form');
  const editBox = document.createElement('textarea');
  const submit = document.createElement('button');

  screen.classList.add('edit-screen');
  editModal.classList.add('edit-modal');
  editForm.classList.add('edit-form');
  editBox.setAttribute('id', 'edit-box');
  submit.innerText = 'Update';

  editForm.appendChild(editBox);
  editForm.appendChild(submit);
  editModal.appendChild(editForm);
  screen.appendChild(editModal);
  document.body.appendChild(screen);
  submit.addEventListener('click', editSubmit(backendId));
  document.body.style.overflow = 'hidden';
}
