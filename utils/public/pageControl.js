window.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.sidenav');
  const instances = M.Sidenav.init(elems);

  document.querySelectorAll('div.card')
    .forEach(qCard => {
      qCard.style.color = 'white';
      qCard.style.paddingLeft = '10px';
    });
});
