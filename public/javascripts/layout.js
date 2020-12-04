window.addEventListener('DOMContentLoaded', async () => {
  document.querySelector('a#profileButton')
    .href = await checkAuth() ? `/users/${await checkAuth()}` : '/users/login';
});

async function checkAuth () {
  const responseObj = await fetch('/users/auth');
  if (responseObj.ok) {
    const { authenticated, userId } = await responseObj.json();
    return authenticated ? userId : authenticated;
  }
}
