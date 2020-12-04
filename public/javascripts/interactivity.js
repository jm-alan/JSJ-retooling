window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.votingbutton')
    .forEach(button => {
      button.addEventListener('click', async voteClick => {
        const voteCaster = voteClick.target;
        const postId = voteCaster.dataset.backendId;
        if (voteCaster.classList.toString().match(/post-vote-up/g)) {
          await tryCastUpvote(postId);
        } else if (voteCaster.classList.toString().match(/post-vote-down/g)) {
          await tryCastDownvote(postId);
        }
      });
    });
  async function tryCastUpvote (postId) {
    const scoreHolder = document.getElementById(`post-${postId}`);
    const fetchObj = await fetch(`/posts/${postId}/upvote`, {
      method: 'POST'
    });
    if (fetchObj.ok) {
      const upvoteResponseObj = await fetchObj.json();
      if (upvoteResponseObj.success) {
        scoreHolder.innerHTML = upvoteResponseObj.score;
      }
    } else {
      console.log('Response not ok? Got response', fetchObj.status);
      console.log('on object', fetchObj);
    }
  }
  async function tryCastDownvote (postId) {
    const scoreHolder = document.getElementById(`post-${postId}`);
    const fetchObj = await fetch(`/posts/${postId}/downvote`, {
      method: 'POST'
    });
    if (fetchObj.ok) {
      const upvoteResponseObj = await fetchObj.json();
      if (upvoteResponseObj.success) {
        scoreHolder.innerText = `${upvoteResponseObj.score}`;
      } else {
        if (upvoteResponseObj.reason === 'anon') {
          window.location = '/users/login';
        }
      }
    } else {
      console.log('Response not ok? Got response', fetchObj.status);
      console.log('on object', fetchObj);
    }
  }

  // ANSWER INPUT CODE

  const answerSubmitButton = document.getElementById('answer-submit');
  answerSubmitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const div = document.createElement('div');
    const bodydiv = document.createElement('div');
    const scorediv = document.createElement('div');

    const likeUp = document.createElement('i');
    const likeDown = document.createElement('i');

    const bodyPara = document.createElement('p');
    const scorelabelPara = document.createElement('p');
    const scorePara = document.createElement('p');

    const inputBox = document.getElementById('answerInput');

    scorediv.appendChild(likeUp);
    scorediv.appendChild(scorePara);
    scorediv.appendChild(likeDown);
    scorediv.appendChild(scorelabelPara);
    bodydiv.appendChild(bodyPara);
    div.appendChild(bodydiv);
    div.appendChild(scorediv);

    div.setAttribute('id', 'newAnswer');
    div.classList.add('post', 'answer');
    bodydiv.classList.add('body');
    scorediv.classList.add('bodyScore');
    scorelabelPara.classList.add('label');
    scorePara.classList.add('scoreThreadPage');
    likeUp.classList.add('post-vote-up', 'votingbutton', 'fas', 'fa-chevron-up');
    likeDown.classList.add('post-vote-up', 'votingbutton', 'fas', 'fa-chevron-down');
    bodyPara.innerText = inputBox.value;
    scorePara.innerHTML = 0;
    scorelabelPara.innerText = 'Likes';

    document.querySelector('.threadContainer').appendChild(div);
    const responseObj =
    await fetch(window.location.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answerInput: inputBox.value, _csrf: document.getElementById('csrf').value })
    });
    const newPost = await responseObj.json();
    scorePara.setAttribute('id', newPost.id);
    inputBox.value = '';
  });
});
