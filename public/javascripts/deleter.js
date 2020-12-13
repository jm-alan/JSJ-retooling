import removeElement from './removeElement.js';
import throwPageError from './throwPageError.js';

export default async function (trashClick) {
  const postId = trashClick.target.dataset.backendId;
  const response = await fetch(`/posts/${postId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    const { success, isQuestion, reason } = await response.json();
    if (success && isQuestion) {
      window.location = '/';
    } else if (success) {
      removeElement(document.getElementById(`post-${postId}`));
    } else if (!success && reason) {
      switch (reason) {
        case 'anon' || 'diff':
          throwPageError('You must be logged in as the creator of a post to delete it.', 'delete-fail');
          break;
        case 'DNE':
          throwPageError('Sorry, it seems the post you were trying to interact with does not exist.\nPlease refresh the page.', 'delete-fail');
          break;
      }
    } else throwPageError('Sorry, something went wrong. Please try again.', 'delete-fail');
  }
}
