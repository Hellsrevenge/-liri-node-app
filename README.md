# Liri-node-app
LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives back data.LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

# Requirements
The following NPM modules need to be integrated:
- Spotify, OMDb, Geocoder, Moment, axios, dotenv. 

You need to get the following API Keys to load Liri:
- spotify, ombd, mapquest, bandsintown.

# Technologies Used:
- JavaScript
- Node.js

# Commands to run LIRI:
   
   * `concert-this`[artist/band name here]
(This will search the Bands in Town Artist Events API and and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event)
     
   * `spotify-this-song`[song name here]
   (You will get the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from)

   * `movie-this`[movie name here]
   (This will output the following information to your terminal/bash window:
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie)

   * `do-what-it-says`
   (Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.It will run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.)

In addition, all data will be logged to a `log.txt`file.
