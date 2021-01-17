import { createQuestionDiv } from './index.js';

export default async function (pageData) {
  const questionsDiv = document.getElementById('questions');
  questionsDiv.innerHTML = '';
  for (let i = 0; i < pageData.length; i++) {
    await createQuestionDiv(pageData[i]);
  }
}
