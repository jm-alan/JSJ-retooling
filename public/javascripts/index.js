let currentPage = 1;
const navButton = (text, container) => {
  const btn = document.createElement('button');
  btn.classList.add('numberedButton');
  btn.innerText = `${text}`;
  container.appendChild(btn);
};

const fetchThreads = async (postArr, pageNumber) => {
  const targetArr = postArr.slice(10 * (pageNumber - 1), 10 * (pageNumber));

  // TODO: FIX: this 'fetch' is a GET requrest, which cannot contain a body.
  const res = await fetch(`/api/threads?list=${targetArr.join(',')}`);
  const body = res.json();
  const threadsArr = body.threadObjects; // might need to change this later
  return threadsArr;
};

const createQuestionDiv = (question) => {
  const outerDiv = document.createElement('div');
  outerDiv.classList.add('question');
  if (question.numberOfAnswers === 1) {
    const answerDiv = document.createElement('div');
    answerDiv.classList.add('answerNumber');
    answerDiv.innerHTML = `${question.numberOfAnswers} <div>answer</div>`;
    outerDiv.appendChild(answerDiv);
  } else {
    const answerDiv = document.createElement('div');
    answerDiv.classList.add('answerNumber');
    answerDiv.innerHTML = `${question.numberOfAnswers} <div>answers</div>`;
    outerDiv.appendChild(answerDiv);
  }

  if (question.score === 1) {
    const answerDiv = document.createElement('div');
    answerDiv.classList.add('answerNumber');
    answerDiv.innerHTML = `${question.numberOfAnswers} <div>answer</div>`;
    outerDiv.appendChild(answerDiv);
  } else {
    const answerDiv = document.createElement('div');
    answerDiv.classList.add('answerNumber');
    answerDiv.innerHTML = `${question.numberOfAnswers} <div>answers</div>`;
    outerDiv.appendChild(answerDiv);
  }
};

window.addEventListener('load', async (event) => {
  const res = await fetch('/api/recent');
  const body = await res.json();
  console.log(body.threads);
  const postArr = body.threads;

  let pageData = await fetchThreads(postArr, 1);
  const totalPages = Math.ceil(pageData.length / 10);
  const container = document.getElementById('pageSelection');
  if (totalPages > 1) {
    navButton('Prev', container);
    for (let i = 1; i <= totalPages; i++) {
      navButton(i, container);
    }
    navButton('Next', container);
  }

  container.addEventListener('click', async (event) => {
    const target = event.target.innerText;
    if (target === 'Prev' && currentPage !== 1) {
      currentPage--;
      // fetch new info at current page - 1
    } else if (target === 'Next' && totalPages !== currentPage) {
      currentPage++;
      // fetch new info at current page + 1
    } else {
      if (currentPage !== target) {
        currentPage = target;
        // fetch info page
      }
    }
    pageData = await fetchThreads(postArr, currentPage);
  });
});
