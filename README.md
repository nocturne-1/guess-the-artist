### Guess The Artist
Hi! This project is Guess The Artist, a game where you have 5 tries to correctly guess the artist of a random artwork, loaded from the Art Institute of Chicago API. If you correctly guess the artist, a pop-up displays with a link where you can see three other works from the same artist, to try and give players some more exposure to similar artwork. 
[![Athena Award Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Faward.athena.hackclub.com%2Fapi%2Fbadge)](https://award.athena.hackclub.com?utm_source=readme)

## Why I made Guess The Artist
I made this game for a couple reasons!

One, I'm an avid player of Artle everyday, a similar game which has 4 pieces by the same artist and gives you 5 chances to correctly guess who the artist is. Seeing Artle, I always felt a bit limited by the fact I could only play for one artist a day, and wanted to make a game where you could guess the artist of as many pieces as you wanted, without the 1 a day limit of the "-le" games. 

Two, I wanted to make a project that builds upon my existing skills in HTML, CSS, and JavaScript while also allowing me to learn new skills - in this case, I really wanted to learn how to do an API call and use GET and POST requests to get data from an external API. And in Guess The Artist, all the data on the artwork and artist is loaded from an external API, so I thought it was a great project to utilize that skill!

## How I Made Guess The Artist
I used HTML, CSS, and JavaScript to make this game. 
For the elements on the main webpage, I used standard HTML tags (<header>, <body>, <div>, etc.) to section out my content and display it, and I used display: flex in CSS to ensure my elements were aligned correctly on the page. The CSS styling was also pretty typical, but one thing I did do (which made me like the overall look of the site much better), was make sure my buttons had no background (not even the default gray!) and, for most of them, no border.

The pop-ups (to display instructions, a win screen, and a lose screen) were made using standard HTML, and then setting their visibility to hidden (and placement to the top of the screen) until changed by a JS function openPopup() (or openLosePopup()) that added CSS elements making the popup visible to the styling of the element. 

To actually load the artwork on the first page, I used a JS request (POST) to the Art Institute of Chicago API. To ensure the artwork was random, I ended up adapting the structure from the project text-4-art by @anule  (https://github.com/anule/text-4-art/blob/master/helpers.js), with a couple modifications to ensure I only received public domain artworks. Once I got my image_id and artist_title data, I set the source of my art image to an IIIF url with the set image_id just retrieved and I stored the artist_title of the random piece as a variable.

From there, I checked the user's guesses (every time the submit button was pressed, using an event listener) to see if it matched the artist_title from earlier and counted off the user's guesses, disabling the submit button and opening the lose screen pop-up if 5 guesses went by without a correct answer being guessed. In the same function, I increased the guess count by one and displayed the number of guesses left below the input bar (using innerHTML). Additionally, I stored the user's input as a variable, and displayed it at the bottom of a list of previous guesses (using a combination of innerHTML and .append() in javaScript).

After winning or losing, a popup shows a win/lose screen, and a link at the bottom directs players to my second webpage displaying three more works of art by that same artist. To ensure I showed works from the same artist as earlier, I used localStorage to store/set (localStorage.setItem) the value of the artist in my script.js file (script for my index page) and retrieve it (localStorage.getItem) in my app.js file (script for my seemore page). 

To load up more images by that artist, I made another, much simpler, API request (GET) filtering for the artist and finding a limit of 3 works. I also used URLSearchParams to actually get a variable I could insert into my AIC API url and use in the fetch(url) function. From there, I took the image_id and inserted it into an IIIF url which would be the src of the <img> elements in the HTML file. 

For formatting on the second webpage, I used flexbox formatting (display: flex) to ensure images were inline.

And that's really it!
## Struggles and Learning Points
Struggles:
To be completely honest, I didn't struggle with a lot in this project. Much of the elements of this project built upon what I already knew (how to display elements in HTML and style them in CSS, how to add event listeners, how to create functions in JavaScript, how boolean operators work, etc.), which meant I faced a lot less errors. I also think I had fewer struggles this time around was because I ensured that I knew where exactly I was going wrong - if it was an error on the API side or if it was a coding mistake - and this was because I used console.log() frequently to tell me what exact data I was getting when making my request. However, I did have a couple struggles:
- Making API requests! This was something I'd never done before, especially making complex POST requests in Elasticsearch for a random artwork. Even though I was using a base request with the structure I adapted from the text-4-art project, I still had to modify it to add additional parameters, and the request would keep giving me a TypeError. I tried a lot of things to get my public domain check to work, including experimenting with bool-must, changing the function-score aspect of the request, changing the parameters, and more; but in the end, the place I needed to modify ended up being the filter aspect of the request.
- Storing the artist title in one JS file and accessing it in another! So, this just wouldn't work for a while, and it was because I was trying to use ES modules, exporting my artist variable from script.js and importing it in app.js. I never figured out exactly what was causing the issue, but I ended up changing the way I stored the artist variable, using localStorage instead - and localStorage worked like a charm!
- My request for more art by the same artist in the second webpage! I started off with a POST request similar to what I did in my script.js file, but it would send me to a TypeError every time, so I ended up shifting down to a GET request (as the request I was making was much simpler). I then used URLSearchParams to give me a string I could insert into my API call url when using fetch(), which ended up working to give me 3 pieces of art from the correct artist.

Learning Points:
I did still learn a lot! I mainly learned the structure of making an API request, the difference between GET and POST, how function-score and bool-must (and must-match and should-match) works, how to structure a request to ElasticSearch, and how to filter the parsed data from an API request to access a specific value. Especially when I was debugging my API requests, I had to do a lot more research into what exactly was happening at every part of the request, which taught me so much about how HTTP request works and what I was actually doing with my code. But other than that, I did learn a couple other things:
- how to make a popup! (learned about the transition property in CSS and how JS addclasslist can be used to modify styling of specific elements)
- how to use localStorage to set and get an item/variable (I used this when accessing my artist in the second webpage)
- what an SVG is (I used SVG icons for my question/instruction button, for my close buttons on all my pop-ups, and for a trophy icon on my win pop-up)
- how an SVG works and how to use SVG icons in buttons (the viewBox and path parts of an SVG were completely new to me!)
- how to create an element in JS and append it to another element in an HTML file (very first time doing this! I used createElement() and append() when displaying images called from the AIC API as well as when showing a list of previous guesses)
- kind of a minor learning point, but I learned what the input tag in HTML does and used it for the first time
- another minor learning point, but I learned what JS string methods (slice(), split(), join(), etc.) were and used them for the first time (when checking that an input matched the artist's last name as well as the first and last).

## Notes on Usage
One last clarification for actually playing this game - when I say inputs can be an artist's last name or first and last, I include the middle name as part of the last name. For example, the correct answer for an artist named Henry Stacy Marks would be "Henry Stacy Marks" or "Stacy Marks", but not simply "Marks". Also, there are pieces in the API that are "Artist Unknown" or just have an artist_title of "null", so if you think a piece not have a known artist, feel free to just type "Unknown". Hope you enjoy!




