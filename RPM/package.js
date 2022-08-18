// get url location hash
function getHash() {
    var hash = window.location.hash;
    if (hash.length > 0) {
        return hash.substring(1);
    }
    return "";
}



document.title = "RPM - " + getHash();

// https://RPM.amukh1.repl.co

// `https://RPM.amukh1.repl.co/getPackageData?package=${getHash()}`

let data = null

fetch(`https://RPM.amukh1.repl.co/getPackageData?name=${getHash()}`).then(res => res.json()).then(d => {
    console.log(d);
    data = d;
    document.querySelectorAll(".name").forEach(element => {
        element.innerHTML = getHash();
    });
    
    document.querySelectorAll(".author").forEach(element => {
        element.innerHTML = data.Author;
    });
    
    document.querySelectorAll(".downloads").forEach(element => {
        element.innerHTML = data.Downloads;
    });

    document.querySelectorAll(".downloadsl").forEach(element => {
        element.innerHTML = data.DownloadsL;
    });

    document.querySelectorAll(".mark").forEach(element => {
        element.innerHTML = marked.parse(data.Readme);
 
    });
});

// get elements with class
