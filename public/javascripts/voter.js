import tryCastVote from './tryCastVote.js';
import prettyNumbers from './prettyNumbers.js';

export default async function (voteClick) {
  const voteCaster = voteClick.target;
  const postId = voteCaster.dataset.backendId;
  if (voteCaster.classList.toString().match(/post-vote-up/g)) {
    await tryCastVote('up', postId);
  } else if (voteCaster.classList.toString().match(/post-vote-down/g)) {
    await tryCastVote('down', postId);
  }
  setTimeout(prettyNumbers, 1250);
}
