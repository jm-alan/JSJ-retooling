window.addEventListener('DOMContentLoaded', () => {

  // Defining a new method on all HTML elements so that multiple
  // children can be appended on a single line
  Element.prototype.appendChildren = function(...children) {
    children.forEach(child => this.appendChild(child));
  }

  // Enable upvote/downvote buttons
  document.querySelectorAll('.votingbutton').forEach(button => {
      button.addEventListener('click', voter);
  });
  // Enable delete buttons
  document.querySelectorAll('.delete').forEach((trashIcon) => {
      trashIcon.addEventListener('click', deleter);
  });

  // Event listener function for upvote/downvote clicks, abstracted so as to
  // be available to add to new posts on the fly
  async function voter (voteClick) {
    const voteCaster = voteClick.target;
    const postId = voteCaster.dataset.backendId;
    if (voteCaster.classList.toString().match(/post-vote-up/g)) {
      await tryCastUpvote(postId);
    } else if (voteCaster.classList.toString().match(/post-vote-down/g)) {
      await tryCastDownvote(postId);
    }
  };

  // Functions which query database to perform actual upvote/downvote actions
  async function tryCastUpvote (postId) {
    const scoreHolder = document.getElementById(`score-${postId}`);
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
    const scoreHolder = document.getElementById(`score-${postId}`);
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

    const bodydiv = create('div', null, 'body');
    const scorediv = create('div', null, 'bodyScore');

    const likeUp = create('i', null, 'post-vote-up', 'votingbutton', 'fas', 'fa-chevron-up');
    const likeDown = create('i', null, 'post-vote-down', 'votingbutton', 'fas', 'fa-chevron-down');
    const deleteButton = create('i', null, 'delete-answer', 'delete', 'far', 'fa-trash-alt');

    const bodyPara = create('p');
    const scoreLabel = create('p', null, 'label');

    const inputBox = document.getElementById('answerInput');

    bodydiv.appendChild(bodyPara);

    bodyPara.innerText = inputBox.value;
    scoreLabel.innerText = 'Likes';

    const responseObj =
    await fetch(window.location.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isQuestion: false, answerInput: inputBox.value, _csrf: document.getElementById('csrf').value })
    });
    const { id } = await responseObj.json();
    const scorePara = create('p', `score-${id}`, 'scoreThreadPage');
    [scorePara, deleteButton].forEach(el => {
      el.setAttribute('data-backend-id', id);
    })
    scorePara.innerHTML = 0;
    scorediv.appendChildren(likeUp, scorePara, likeDown, scoreLabel);
    inputBox.value = '';
    deleteButton.addEventListener('click', deleter);
    const div = create('div', `post-${id}`, 'post', 'answer');
    div.appendChildren(deleteButton, bodydiv, scorediv);
    document.querySelector('.threadContainer').appendChild(div);
  });

  // Event listener function for deleting posts from a page, abstracted
  // for the same reason as the vote listener.

  async function deleter (trashClick) {
    const postId = event.target.dataset.backendId;
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

  // Function to append custom errors to the page and/or exchange them if an error by that ID already exists.
  function throwPageError(error, id) {
    const extantErr = document.getElementById(id);
    if (!extantErr) {
      let errDiv = document.getElementById('errorDiv');
      const err = create('li');
      err.innerHTML = error;
      if (errDiv) {
        document.querySelector('.errorsList').appendChild(err);
      } else {
        errDiv = create('div');
        errDiv.setAttribute('id', 'errorDiv');
        const errList = create('ul');
        errList.classList.add('errorsList');
        errDiv.appendChild(errList);
        errList.appendChild(err);
        document.querySelector('.threadContainer')
          .append(errDiv);
      }
    } else {
      extantErr.innerHTML = error;
    }
  };

  // Function to remove elements from the page
  function removeElement(element) {
    if (element) {
      element.parentNode.removeChild(element);
    }
  };

  // Function to create HTML elements with IDs and classes inline
  function create(type, id = null, ...classes) {
    const el = document.createElement(String(type));
    if (id) el.setAttribute('id', String(id));
    if (classes.length) classes.forEach(hClass => el.classList.add(hClass));
    return el;
  };
});
