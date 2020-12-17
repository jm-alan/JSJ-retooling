export default function (question) {
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
    const scoreDiv = document.createElement('div');
    scoreDiv.classList.add('score');
    scoreDiv.innerHTML = `${question.score} <div>vote</div>`;
    outerDiv.appendChild(scoreDiv);
  } else {
    const scoreDiv = document.createElement('div');
    scoreDiv.classList.add('score');
    scoreDiv.innerHTML = `${question.score} <div>votes</div>`;
    outerDiv.appendChild(scoreDiv);
  }

  const title = document.createElement('div');
  title.classList.add('titleDiv');
  const questionLink = document.createElement('a');
  questionLink.href = `/questions/${question.id}`;
  questionLink.innerHTML = question.title;
  questionLink.classList.add('title');
  title.appendChild(questionLink);
  outerDiv.appendChild(title);
  const author = document.createElement('div');
  author.classList.add('author');
  author.innerHTML = `${question.timeStamp} <span><a href='/users/${question.userId}' class='userLink'>${question.userName}</a></span>`;
  outerDiv.appendChild(author);
  const questionsDiv = document.getElementById('questions');
  questionsDiv.appendChild(outerDiv);
}
