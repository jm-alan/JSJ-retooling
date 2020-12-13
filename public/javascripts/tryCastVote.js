export default async function (direction, postId) {
  const fetchObj = direction === 'up'
    ? await fetch(
        `/posts/${postId}/upvote`,
        {
          method: 'POST'
        })
    : await fetch(
        `/posts/${postId}/downvote`,
        {
          method: 'POST'
        });
  const scoreHolder = document.getElementById(`score-${postId}`);
  if (fetchObj.ok) {
    const voteResponseObj = await fetchObj.json();
    if (voteResponseObj.success) {
      scoreHolder.innerHTML = voteResponseObj.score;
    } else if (voteResponseObj.reason === 'anon') {
      window.location = '/users/login';
    }
  } else throwPageError('Sorry, something went wrong. Please refresh the page and try again.', 'vote-fail');
}
