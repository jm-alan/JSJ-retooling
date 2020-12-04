window.addEventListener("load", (event) => {
  const loginButton = document.getElementById("demoUser");
  loginButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    usernameInput.value = "demo_user";
    passwordInput.value = "password";
  });
});
