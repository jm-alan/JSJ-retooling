import create from './create.js';
import deleter from './deleter.js';

export default async function (event) {
  event.preventDefault();
  const threadId = window.location.href.match(/\d+$/)[0];
  const inputBox = document.getElementById('answerInput');

  const responseObj =
    await fetch(window.location.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answerInput: inputBox.value, _csrf: document.getElementById('csrf').value })
    });
  const { success, id, reason, body } = await responseObj.json();

  if (success) {
    const div = create('div', `post-${id}`, 'post', 'answer');
    div.innerHTML = `
      <i id="new-answer-delete-${id}" class="delete-answer delete far fa-trash-alt" data-backend-id="${id}"></i>
      <div class="body">
        <div class="bodyContainer">
          ${body}
        </div>
      </div>
      <div class="bodyScore">
        <i class="new-answer-vote-${id} post-vote-up votingbutton fas fa-chevron-up" data-backend-id="${id}"></i>
        <p class="scoreThreadPage" data-backend-id="${id}" id="score-${id}">0</p>
        <i class="new-answer-vote-${id} post-vote-down votingbutton fas fa-chevron-down" data-backend-id="${id}" aria-hidden="true"></i>
        <p class="label">Likes</p>
      </div>
      `;
    inputBox.value = '';
    document.querySelector('.threadContainer').appendChild(div);
    document.getElementById(`new-answer-delete-${id}`).addEventListener('click', deleter);
    document.querySelectorAll(`.new-answer-vote-${id}`).forEach(voteButton => voteButton.addEventListener('click', voter));
  } else {
    if (reason === 'anon') {
      localStorage.setItem(`draft${threadId}`, inputBox.value.split('\n').join('$$break$$'));
      window.location = `/users/login?pref=${window.location}`;
    }
  }
}
