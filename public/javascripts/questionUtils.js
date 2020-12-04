const navButton = (text, container, lastPageEl, selected = false) => {
  const btn = document.createElement("button");
  btn.classList.add("numberedButton");
  btn.classList.add("buttonHover");
  btn.innerText = `${text}`;
  btn.id = `numberedButtonId__${text}`;
  if (selected) {
    btn.classList.add("numberedButton--selected");
    lastPageEl = btn;
  }
  container.appendChild(btn);
  return lastPageEl;
};

const fetchThreads = async (postArr, pageNumber) => {
  const targetArr = postArr.slice(10 * (pageNumber - 1), 10 * pageNumber);
  const link = `/api/threads?whatever=${targetArr.join(",")}`;
  const res = await fetch(link);
  const body = await res.json();
  const threadsArr = body.threadObjects;
  const returnArr = threadsArr.map((thread) => {
    const timeStamp = `created at ${new Date(
      thread.createdAt
    ).toLocaleTimeString()} on ${new Date(
      thread.createdAt
    ).toLocaleDateString()} by `;
    // this needs to be updated once the queries are finalized
    return {
      id: thread.id,
      numberOfAnswers: thread.Posts.length - 1,
      score: thread.Posts[0].score,
      title: thread.title,
      userId: thread.userId,
      userName: thread.User.userName,
      timeStamp,
    };
  });
  return returnArr;
};

const createQuestionDiv = (question) => {
  const outerDiv = document.createElement("div");
  outerDiv.classList.add("question");
  if (question.numberOfAnswers === 1) {
    const answerDiv = document.createElement("div");
    answerDiv.classList.add("answerNumber");
    answerDiv.innerHTML = `${question.numberOfAnswers} <div>answer</div>`;
    outerDiv.appendChild(answerDiv);
  } else {
    const answerDiv = document.createElement("div");
    answerDiv.classList.add("answerNumber");
    answerDiv.innerHTML = `${question.numberOfAnswers} <div>answers</div>`;
    outerDiv.appendChild(answerDiv);
  }

  if (question.score === 1) {
    const scoreDiv = document.createElement("div");
    scoreDiv.classList.add("score");
    scoreDiv.innerHTML = `${question.score} <div>vote</div>`;
    outerDiv.appendChild(scoreDiv);
  } else {
    const scoreDiv = document.createElement("div");
    scoreDiv.classList.add("score");
    scoreDiv.innerHTML = `${question.score} <div>votes</div>`;
    outerDiv.appendChild(scoreDiv);
  }

  const title = document.createElement("div");
  title.classList.add("titleDiv");
  const questionLink = document.createElement("a");
  questionLink.href = `/questions/${question.id}`;
  questionLink.innerHTML = question.title;
  questionLink.classList.add("title");
  title.appendChild(questionLink);
  outerDiv.appendChild(title);
  const author = document.createElement("div");
  author.classList.add("author");
  author.innerHTML = `${question.timeStamp} <span><a href='/users/${question.userId}' class='userLink'>${question.userName}</a></span>`;
  outerDiv.appendChild(author);
  const questionsDiv = document.getElementById("questions");
  questionsDiv.appendChild(outerDiv);
};

const refreshPage = (pageData) => {
  const questionsDiv = document.getElementById("questions");
  questionsDiv.innerHTML = "";
  pageData.forEach((post) => {
    createQuestionDiv(post);
  });
};

export { navButton, fetchThreads, createQuestionDiv, refreshPage };
