import prettyNumbers from './prettyNumbers.js';
import voter from './voter.js';
import deleter from './deleter.js';
import answerSubmit from './answerSubmit.js';

window.addEventListener('DOMContentLoaded', () => {
  const threadId = window.location.href.match(/\d+$/)[0];
  prettyNumbers();

  // Enable upvote/downvote buttons
  document.querySelectorAll('.votingbutton').forEach(button => {
    button.addEventListener('click', voter);
  });
  // Enable delete buttons
  document.querySelectorAll('.delete').forEach((trashIcon) => {
    trashIcon.addEventListener('click', deleter);
  });

  const bestAnswer = document.querySelector('.answer');

  if (bestAnswer) {
    bestAnswer.classList.add('best');
  }

  const draft = localStorage.getItem(`draft${threadId}`);
  document.getElementById('answerInput').value = draft ? draft.split('$$break$$').join('\n') : '';

  const answerSubmitButton = document.getElementById('answer-submit');
  answerSubmitButton.addEventListener('click', answerSubmit);
});
