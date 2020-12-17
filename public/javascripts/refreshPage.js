import { createQuestionDiv } from './index.js';

export default function (pageData) {
  const questionsDiv = document.getElementById('questions');
  questionsDiv.innerHTML = '';
  pageData.forEach((post) => {
    createQuestionDiv(post);
  });
}
