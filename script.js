//script.js

// Accessing HTML elements
let artBtn = document.getElementById("loadArt");
let artworkImg = document.getElementById("artwork");
let art = document.getElementById("artImgContainer");
let submitBtn = document.getElementById("submitGuess");
let guesesList = document.getElementById("guessesList");
let popup = document.getElementById("popup");
let showInstructions = document.getElementById("showInstructions");
let instructionPopup = document.getElementById("instructionPopup");
let closePopupBtn = document.getElementById("closepopup");
let closeInstructionBtn = document.getElementById("closeInstructions");

// Get and display a random artwork from the Art Institute of Chicago API
function get_rand_artwork() {
    let timestamp = Math.floor(Date.now() / 1000);
    let requestArt = {
        "resources": "artworks",
        "fields": [
            "id",
            "title",
            "artist_title",
            "image_id", 
            "date_display",
            "medium_display"
        ],
        "boost": false,
        "limit": 1,
        "query": {
            "function_score": {
                "query": {
                    "constant_score": {
                        "filter": {
                            "bool": {
                                "filter": [
                                {
                                    "exists": {
                                    "field": "image_id"
                                    }
                                },
                                {
                                    "term": {
                                    "is_public_domain": true
                                    }
                                }
                                ]
                            }
                        }
                    }
                },
                "boost_mode": "replace",
                "random_score": {
                    "field": "id",
                    "seed": timestamp
                }
            }
        }
    };  

    return fetch("https://api.artic.edu/api/v1/search", {
        method: "POST",
        body: JSON.stringify(requestArt),
        headers: { "Content-Type": "application/json" }
    }).then(res => res.json())
      .then(obj => obj.data[0])
      .catch(e => console.error(e));

};

let artist;

artBtn.addEventListener("click", async () => {
    submitBtn.disabled = false;
    guessesList.innerHTML = "";
    art.innerHTML = "";
    let result = await get_rand_artwork();
    artist = result.artist_title.toLowerCase();
    console.log(result);
    let imgUrl = `https://www.artic.edu/iiif/2/${result.image_id}/full/843,/0/default.jpg`;
    
    const loadImg = document.createElement("loadImg");
    loadImg.innerHTML = `<img src=${imgUrl} alt="Random Artwork">`;
    art.append(loadImg);

})

// Displaying guesses and win popup

openPopup = () => {
    popup.classList.add("open-popup")
    submitBtn.disabled = true;
}

closePopupBtn.addEventListener("click", () => {
    popup.classList.remove("open-popup")
})

let i = 0;
submitBtn.addEventListener("click", () => {
    let guess = document.getElementById("guessInput").value;
    const guessItem = document.createElement("guessItem");
    guessItem.innerHTML = `<li>${guess}</li>`;
    guessesList.append(guessItem);
    if (guess.toLowerCase() === artist) {
        openPopup();
    }
    i += 1;
    if (i >= 5) {
        submitBtn.disabled = true;
    }

})

showInstructions.addEventListener("click", () => {
    instructionPopup.classList.add("open-popup")
});

closeInstructionBtn.addEventListener("click", () => {
    instructionPopup.classList.remove("open-popup")
});
