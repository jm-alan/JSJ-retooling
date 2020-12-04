

window.addEventListener("load", async (event) => {
    const bar = document.getElementById('searchBar')
    bar.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') {
            const searchData = bar.value;
            const url = `/search?entry=${searchData}`
            window.location.href = url;
        }
    })
})
