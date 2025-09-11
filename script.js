//script.js
let artBtn = document.getElementById("loadArt");
let artworkImg = document.getElementById("artwork");
let art = document.getElementById("artImgContainer");


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

artBtn.addEventListener("click", async () => {
    let result = await get_rand_artwork();
    console.log(result);
    let imgUrl = `https://www.artic.edu/iiif/2/${result.image_id}/full/843,/0/default.jpg`;
    
    const loadImg = document.createElement("loadImg");
    loadImg.innerHTML = `<img src=${imgUrl} alt="Random Artwork">`;
    art.append(loadImg);

})
