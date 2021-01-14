import { navButton, fetchThreads, refreshPage } from './index.js';

let currentPage = 1;
let pageMode = 'recent';
let lastPageEl;

window.addEventListener('load', async (event) => {
  let res = await fetch(`${window.location.origin}/api/recent`);
  let body = await res.json();
  let postArr = body.threads;

  let pageData = await fetchThreads(postArr, 1);
  refreshPage(pageData);

  const totalPages = Math.ceil(postArr.length / 10);
  const container = document.getElementById('pageSelection');

  if (totalPages > 1) {
    lastPageEl = navButton('Prev', container, lastPageEl);
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1) {
        lastPageEl = navButton(i, container, lastPageEl, true);
      } else {
        lastPageEl = navButton(i, container, lastPageEl);
      }
    }
    lastPageEl = navButton('Next', container, lastPageEl);
  }

  container.addEventListener('mouseup', async (event) => {
    if (event.target.nodeName !== 'DIV') {
      const currentPageSave = currentPage;
      const target = event.target.innerText;
      if (target === 'Prev' && currentPage > 1) {
        currentPage--;
        const newFocusButton = document.getElementById(
          `numberedButtonId__${currentPage}`
        );
        lastPageEl.classList.remove('numberedButton--selected');
        newFocusButton.classList.add('numberedButton--selected');
        lastPageEl = newFocusButton;
      } else if (target === 'Next' && totalPages > currentPage) {
        currentPage++;
        const newFocusButton = document.getElementById(
          `numberedButtonId__${currentPage}`
        );
        lastPageEl.classList.remove('numberedButton--selected');
        newFocusButton.classList.add('numberedButton--selected');
        lastPageEl = newFocusButton;
      } else {
        if (currentPage !== target && target !== 'Prev' && target !== 'Next') {
          lastPageEl.classList.remove('numberedButton--selected');
          event.target.classList.add('numberedButton--selected');
          lastPageEl = event.target;
          currentPage = Number.parseInt(target, 10);
        }
      }
      if (currentPage !== currentPageSave) {
        pageData = await fetchThreads(postArr, currentPage);
        refreshPage(pageData);
      }
    }
  });

  const recentButton = document.getElementById('recent');
  const popularButton = document.getElementById('popular');

  recentButton.addEventListener('mouseup', async (event) => {
    // need to remove the numberedButton--selected when you hit recent or popular
    const allButtons = document.querySelectorAll('.numberedButton');
    allButtons.forEach((el) => {
      el.classList.remove('numberedButton--selected');
    });
    document
      .getElementById('numberedButtonId__1')
      .classList.add('numberedButton--selected');
    if (pageMode !== 'recent') {
      pageMode = 'recent';

      currentPage = 1;
      recentButton.classList.add('sortButton--selected');
      popularButton.classList.remove('sortButton--selected');
      res = await fetch(`${window.location.origin}/api/recent`);
      body = await res.json();
      postArr = body.threads;

      const pageData = await fetchThreads(postArr, 1);
      refreshPage(pageData);
    }
  });

  popularButton.addEventListener('mouseup', async (event) => {
    const allButtons = document.querySelectorAll('.numberedButton');
    allButtons.forEach((el) => {
      el.classList.remove('numberedButton--selected');
    });
    document
      .getElementById('numberedButtonId__1')
      .classList.add('numberedButton--selected');

    if (pageMode !== 'popular') {
      pageMode = 'popular';
      currentPage = 1;
      recentButton.classList.remove('sortButton--selected');
      popularButton.classList.add('sortButton--selected');
      res = await fetch(`${window.location.origin}/api/popular`);
      body = await res.json();
      postArr = body.threads;
      const pageData = await fetchThreads(postArr, 1);
      refreshPage(pageData);
    }
  });
});
