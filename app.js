//app.js
import { cased_artist } from './script.js';

function formatting_function() {
    let split_artist = cased_artist.split(" ");
    let formatted_artist = split_artist.join("+");
    return formatted_artist;
}

formatting_function();