document.getElementById("search").addEventListener("keyup", event => {
    if(event.key !== "Enter") return; // Use `.key` instead.
    alert(`Searching for: ${document.getElementById('search').value}`) // Things you want to do.
    event.preventDefault(); // No need to `return false;`.
});

// https://RPM.amukh1.repl.co

// `https://RPM.amukh1.repl.co/getPackageData?package=${getHash()}`

let data = null

fetch(`https://RPM.amukh1.repl.co/getTops`).then(res => res.json()).then(d => {
    console.log(d);
    data = d;
    data.forEach(package => {
        let x = document.createElement("a");
        x.href = `https://ritchie.js.org/RPM/package#${package.Name}`;
        let y = document.createElement("div");
        y.innerHTML = package.Name + ': ' + package.Downloads;
        y.classList.add("package");
        y.classList.add("ho");
        x.appendChild(y);
        document.getElementById('mp').appendChild(x);
    });
});