window.addEventListener("load", async (event) => {
  const bar = document.getElementById("searchBar");
  bar.addEventListener("keypress", async (event) => {
    if (event.key === "Enter" && bar.value !== "" && bar.value !== " ") {
      const searchData = bar.value;
      const url = `/search?entry=${searchData}`;
      window.location.href = url;
    }
  });
  const icon = document.getElementById("searchIcon");

  icon.addEventListener("click", async (event) => {
    if (bar.value !== "" && bar.value !== " ") {
      const searchData = bar.value;
      const url = `/search?entry=${searchData}`;
      window.location.href = url;
    }
  });
});
