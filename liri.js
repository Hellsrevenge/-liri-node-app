require("dotenv").config();

var keys = require("./keys.js").keys;
var axios = require("axios");
var NodeGeocoder = require("node-geocoder");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var output = "";

var command = process.argv[2];
var argument = process.argv[3];

function print(string) {
    output += string + "\r\n";
}

function init() {
    print(" --=========< /|\ [ - LIRI SEARCH - ] \|/ >=========--");
    print(" ");
    print("            [  Command  ]-=-[ " + command + " ]");
    print("            [ Arguments ]-=-[ " + argument + " ]");
    print(" ");
}

function save() {
    print(" ");
    console.log(output);
    fs.appendFile('log.txt', output, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

if (command === "do-what-it-says") {
    var data = fs.readFileSync("random.txt", "utf8");
    var dataArr = data.split(",");
    command = dataArr[0];
    argument = dataArr[1];
}

init();

if (command === "concert-this") {
    concert(argument);
} else if (command === "spotify-this-song") {
    spotify_search(argument);
} else if (command === "movie-this") {
    movie_this(argument);
}

function concert(artist) {
    let count = 0;
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandsintown.key).then(
        function (response) {
            response.data.forEach(function (event) {
                var options = {
                    provider: "mapquest",
                    apiKey: keys.mapquest.key
                };
                var geocoder = NodeGeocoder(options);
                geocoder.reverse({lat: event.venue.latitude, lon: event.venue.longitude}, function (err, res) {
                    count++;
                    print("Venue:   " + event.venue.name);
                    print("Address: " + res[0].streetName + " " + res[0].city + " " + res[0].zipcode);
                    print("Date:    " + moment(event.datetime).format('MM/DD/YYYY'));
                    print("============================================================");

                    if (count === response.data.length) {
                        print("Total events: " + count);
                        save();
                    }
                });
            });
        });
}

function spotify_search(song) {
    if (!song) {
        song = "The Sign"
    }
    spotify.search({type: 'track', query: song}, function (err, data) {
        if (err) {
            return print('Error occurred: ' + err);
        }
        data.tracks.items.forEach(function (item) {

            item.artists.forEach(function (artist) {
                print("Artist(s): " + artist.name);
            });
            print("The song's name: " + item.name);
            print("link to Spotify: " + item.href);
            print("====================================================================");

        });
        save();
    });

}

function movie_this(title) {
    if (!title) {
        title = "Mr. Nobody."
    }
    axios.get("http://www.omdbapi.com/?apikey=" + keys.ombd.key + "&t=" + title).then(
        function (response) {
            print("Title: " + response.data.Title);
            print("Year: " + response.data.Year);
            print("imdbRating: " + response.data.imdbRating);
            response.data.Ratings.forEach(function (item) {

                if (item.Source === "Rotten Tomatoes") {
                    print("Rotten Tomatoes: " + item.Value);
                }
            });
            print("Country: " + response.data.Country);
            print("Language: " + response.data.Language);
            print("Plot: " + response.data.Plot);
            print("Actors: " + response.data.Actors);
            print("============================================================");
            save()
        });
}