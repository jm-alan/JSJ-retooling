import { create, voteListen, deleteListen } from './index.js';

export default async function (event) {
  event.preventDefault();
  const threadId = window.location.href.match(/\d+$/)[0];
  const inputBox = document.getElementById('answerInput');

  const { success, id, reason, body } = await (await fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ answerInput: inputBox.value, _csrf: document.getElementById('csrf').value, threadId })
  })).json();

  if (success) {
    const div = create('div', `post-${id}`, 'post', 'answer');
    div.innerHTML = `
      <i id="new-answer-delete-${id}" class="delete-answer delete far fa-trash-alt" data-backend-id="${id}"></i>
      <i class="edit-answer edit fas fa-edit" data-backend-id="${id}" aria-hidden="true"></i>
      <div class="body">
        <div class="bodyContainer">
          ${body}
        </div>
      </div>
      <div class="bodyScore">
        <i class="new-answer-vote-${id} post-vote-up voting-button fas fa-chevron-up" data-backend-id="${id}"></i>
        <p class="scoreThreadPage" data-backend-id="${id}" id="score-${id}">0</p>
        <i class="new-answer-vote-${id} post-vote-down voting-button fas fa-chevron-down" data-backend-id="${id}" aria-hidden="true"></i>
        <p class="label">Likes</p>
      </div>
      `;
    inputBox.value = '';
    document.querySelector('.threadContainer').appendChild(div);
    deleteListen(document.getElementById(`new-answer-delete-${id}`));
    document.querySelectorAll(`.new-answer-vote-${id}`).forEach(voteListen);
    localStorage.removeItem(`draft${threadId}`);
  } else {
    if (reason === 'anon') {
      localStorage.setItem(`draft${threadId}`, inputBox.value.split('\n').join('$$break$$'));
      window.location = `/users/login?pref=${window.location}`;
    }
  }
}
