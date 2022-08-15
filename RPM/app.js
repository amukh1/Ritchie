document.getElementById("search").addEventListener("keyup", event => {
    if(event.key !== "Enter") return; // Use `.key` instead.
    alert(`Searching for: ${document.getElementById('search').value}`) // Things you want to do.
    event.preventDefault(); // No need to `return false;`.
});