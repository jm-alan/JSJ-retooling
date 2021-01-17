import { navButton, refreshPage } from './index.js';

let currentPage = 1;
let pageMode = 'recent';
let lastPageEl;

window.addEventListener('load', async () => {
  const { threads } = await (await window.fetch(`/api/new/${pageMode}/${currentPage}`)).json();
  refreshPage(threads);

  const totalPages = Math.ceil((await (await window.fetch('/api/threads/count')).json()).count / 10);
  const container = document.getElementById('pageSelection');

  if (totalPages > 1) {
    lastPageEl = navButton('Prev', container, lastPageEl);
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1) lastPageEl = navButton(i, container, lastPageEl, true);
      else lastPageEl = navButton(i, container, lastPageEl);
    }
    lastPageEl = navButton('Next', container, lastPageEl);
  }

  document.querySelectorAll('.sortButton').forEach(button => {
    button.addEventListener('click', async ({ target }) => {
      const otherId = target.id === 'recent' ? 'popular' : 'recent';
      const otherButton = document.getElementById(otherId);
      pageMode = target.innerText.toLowerCase();
      target.classList.add('sortButton--selected');
      otherButton.classList.remove('sortButton--selected');
      currentPage = 1;
      document.querySelectorAll('.numberedButton').forEach(button => button.classList.remove('numberedButton--selected'));
      document.querySelector(`#numberedButtonId__${currentPage}`).classList.add('numberedButton--selected');
      const { threads } = await (await window.fetch(`/api/new/${pageMode}/${currentPage}`)).json();
      refreshPage(threads);
    });
  });
  document.querySelectorAll('.numberedButton').forEach(button => {
    button.addEventListener('click', async ({ target }) => {
      document.querySelectorAll('.numberedButton').forEach(button => button.classList.remove('numberedButton--selected'));
      if (target.innerText === 'Prev' && currentPage !== 1) currentPage--;
      else if (target.innerText === 'Next' && currentPage !== totalPages) currentPage++;
      else currentPage = target.innerText;
      const { threads } = await (await window.fetch(`/api/new/${pageMode}/${currentPage}`)).json();
      refreshPage(threads);
      document.querySelector(`#numberedButtonId__${currentPage}`).classList.add('numberedButton--selected');
    });
  });
});
