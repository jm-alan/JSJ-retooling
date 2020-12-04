let currentPage = 1;
let pageMode = "recent";

const navButton = (text, container) => {
  const btn = document.createElement("button");
  btn.classList.add("numberedButton");
  btn.innerText = `${text}`;
  container.appendChild(btn);
};

const fetchThreads = async (postArr, pageNumber) => {
  const targetArr = postArr.slice(10 * (pageNumber - 1), 10 * pageNumber);
  const link = `/api/threads?whatever=${targetArr.join(",")}`;
  const res = await fetch(link);
  const body = await res.json();
  const threadsArr = body.threadObjects;
  let returnArr = threadsArr.map((thread) => {
    const timeStamp = `created at ${new Date(
      thread.createdAt
    ).toLocaleTimeString()} on ${new Date(
      thread.createdAt
    ).toLocaleDateString()} by `;
    //this needs to be updated once the queries are finalized
    return {
      id: thread.id,
      numberOfAnswers: thread.Posts.length-1,
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

window.addEventListener("load", async (event) => {
  let res = await fetch(`${window.location.origin}/api/recent`);
  let body = await res.json();
  let postArr = body.threads;

  let pageData = await fetchThreads(postArr, 1);
  refreshPage(pageData);

  const totalPages = Math.ceil(postArr.length / 10);
  const container = document.getElementById("pageSelection");
  if (totalPages > 1) {
    navButton("Prev", container);
    for (let i = 1; i <= totalPages; i++) {
      navButton(i, container);
    }
    navButton("Next", container);
  }

  container.addEventListener("mouseup", async (event) => {
    const currentPageSave = currentPage;
    const target = event.target.innerText;
    if (target === "Prev" && currentPage > 1) {
      currentPage--;
    } else if (target === "Next" && totalPages > currentPage) {
      currentPage++;
    } else {
      if (currentPage !== target && target !== "Prev" && target !== "Next") {
        currentPage = Number.parseInt(target, 10);
      }
    }
    if (currentPage !== currentPageSave) {
      pageData = await fetchThreads(postArr, currentPage);
      refreshPage(pageData);
    }
  });

  const recentButton = document.getElementById("recent");
  const popularButton = document.getElementById("popular");

  recentButton.addEventListener("mouseup", async (event) => {
    if (pageMode !== "recent") {
      pageMode = "recent";

      currentPage = 1;
      recentButton.classList.add("sortButton--selected");
      popularButton.classList.remove("sortButton--selected");
      res = await fetch(`${window.location.origin}/api/recent`);
      body = await res.json();
      postArr = body.threads;

      let pageData = await fetchThreads(postArr, 1);
      refreshPage(pageData);
    }
  });

  popularButton.addEventListener("mouseup", async (event) => {
    if (pageMode !== "popular") {
      pageMode = "popular";
      currentPage = 1;
      recentButton.classList.remove("sortButton--selected");
      popularButton.classList.add("sortButton--selected");
      res = await fetch(`${window.location.origin}/api/popular`);
      body = await res.json();
      postArr = body.threads;
      let pageData = await fetchThreads(postArr, 1);
      refreshPage(pageData);
    }
  });
});
