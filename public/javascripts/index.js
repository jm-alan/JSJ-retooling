const { mostPopular, mostRecent, getPostById } = require('../../utils/qyeryFunctions/');

let currentPage = 1;
const navButton = (text, container) => {
  const btn = document.createElement("button");
  btn.classList.add("numberedButton");
  btn.innerText = `${text}`;
  container.appendChild(btn);
};

window.addEventListener("load", (event) => {
  let container = document.getElementById("pageSelection");
  const totalPages = Math.ceil(array.length / 10);
  if (totalPages > 1) {
    navButton("Prev", container);
    for (let i = 1; i <= totalPages; i++) {
      navButton(i, container);
    }
    navButton("Next", container);
  }

container.addEventListener("click", (event) => {
    const target = event.target.innerText;
    if (target === "Prev" && currentPage !== 1) {
      // fetch new info at current page - 1
    } else if (target === "Next" && totalPages !== currentPage) {
      // fetch new info at current page + 1
    } else {
      if (currentPage !== target) {
        // fetch info page
      }
    }
  });
});
