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
    const scoreHolder = document.querySelector(`p#\\3${postId} `);
    const fetchObj = await fetch(`/posts/${postId}/upvote`, {
      method: 'POST'
    });
    if (fetchObj.ok) {
      const upvoteResponseObj = await fetchObj.json();
      if (upvoteResponseObj.success) {
        scoreHolder.innerText = upvoteResponseObj.score;
      }
    } else {
      console.log('Response not ok? Got response', fetchObj.status);
      console.log('on object', fetchObj);
    }
  }
  async function tryCastDownvote (postId) {
    const scoreHolder = document.querySelector(`p#\\3${postId} `);
    const fetchObj = await fetch(`/posts/${postId}/downvote`, {
      method: 'POST'
    });
    if (fetchObj.ok) {
      const upvoteResponseObj = await fetchObj.json();
      if (upvoteResponseObj.success) {
        scoreHolder.innerText = `${upvoteResponseObj.score}`;
      }
    } else {
      console.log('Response not ok? Got response', fetchObj.status);
      console.log('on object', fetchObj);
    }
  }
});
