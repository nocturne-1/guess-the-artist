//app.js
let moreArt = document.getElementById("moreArtContainer");
const cased_artist = localStorage.getItem("currentArtist")

function formatting_function() {
    let split_artist = cased_artist.split(" ");
    let formatted_artist = split_artist.join("+");
    return formatted_artist;
}

async function see_more_art(someArtist) {
    if (!someArtist) {
        return null
    }
    let requestMoreArt = {
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
        "limit": 3,
            "query": {
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
                        },
                        {
                            "term": {
                                "artist_title": someArtist
                            }
                        }
                    ]
                }
            }
        };

        return fetch("https://api.artic.edu/api/v1/search", {
        method: "POST",
        body: JSON.stringify(requestMoreArt),
        headers: { "Content-Type": "application/json" }
    }).then(res => res.json())
      .then(obj => obj.data)
      .catch(e => console.error(e));
    
}

async function display_art() {
    let more_art = await see_more_art(cased_artist);
    console.log(more_art);
    if (!more_art || more_art.length === 0) {
        moreArt.innerHTML = `<p>No more public domain art found for this artist from the Art Institute of Chicago's collection.</p>`;
        return;
    }
    let img_id_1 = more_art.data[0].image_id;
    let img_id_2 = more_art.data[1].image_id;
    let img_id_3 = more_art.data[2].image_id;

    let imgUrl_1 = `https://www.artic.edu/iiif/2/${img_id_1}/full/843,/0/default.jpg`;
    let imgUrl_2 = `https://www.artic.edu/iiif/2/${img_id_2}/full/843,/0/default.jpg`;
    let imgUrl_3 = `https://www.artic.edu/iiif/2/${img_id_3}/full/843,/0/default.jpg`;

    const moreArt1 = document.createElement("moreArt1");
    moreArt1.innerHTML = `<img src=${imgUrl_1} alt="Artwork">`;
    const moreArt2 = document.createElement("moreArt2");
    moreArt2.innerHTML = `<img src=${imgUrl_2} alt="Artwork">`;
    const moreArt3 = document.createElement("moreArt3");
    moreArt3.innerHTML = `<img src=${imgUrl_3} alt="Artwork">`;
    moreArt.append(moreArt1, moreArt2, moreArt3);
}

display_art();


