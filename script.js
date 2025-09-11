//script.js
let artBtn = document.getElementById("loadArt");
let artworkImg = document.getElementById("artwork");
let art = document.getElementById("artImg");


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
                            "exists": {
                                "field": "image_id"
                            },
                            "term": { "is_public_domain": true }
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

    const response = fetch("https://api.artic.edu/api/v1/artworks/search", {
        method: "POST",
        body: JSON.stringify(requestArt),
        headers: { "Content-Type": "application/json" }
    }).then(res => res.json())
      .then(obj => obj.data[0])
      .catch(e => console.error(e));

    console.log(response);
};

artBtn.addEventListener("click", function loadImg() {
    get_rand_artwork()
        .then(response => {
            if (!response) throw new Error("No artwork found");
            const url = `https://www.artic.edu/iiif/2/${response.image_id}/full/843,/0/default.jpg`;
            art.innerHTML = `<img src="${url}" alt="Random Artwork">`;
        })
        .catch(e => {
            console.error("Error loading artwork:", e);
            art.innerHTML = "<p>Failed to load artwork. Try again please.</p>";
        });

});

