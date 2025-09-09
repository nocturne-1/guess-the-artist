//script.js
artBtn = document.getElementById("loadArt");
artworkImg = document.getElementById("artwork");

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

let randInt = getRandomInt(0, 200000); 
let randId = randInt.toString();

artBtn.addEventListener("click", async function fetchArt() {
    const urlOver = "https://api.artic.edu/api/v1/artworks/"
    const url = urlOver.concat(randId);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error fetching art: ', error);
    }
});