// inputs action and name of movie song etc
var axios = require('axios');
var dotenv = require("dotenv").config(); // is this right 
var moment = require('moment');

var keys = require("./keys.js");
var Spotify = require('node-spotify-api'); //Spotify (package) vs spotify(importing keys) **
var spotify = new Spotify(keys.spotify); //might need to inside spotify()


//don't forget to do the rest of the requires
var action = process.argv[2];
//maybe a forEach loop to iterate through the remainder like process.argv[i]
var input = process.argv[3];

console.log(process.env.SPOTIFY_ID);

//if time allows update this to a switch state
if ((action === "movie-this") && (!input)) {
  movieDefault = "Mr.Robot"; //better than Mr.Nobody
  console.log("It's on Netflix!");
  omdb(movieDefault);
} else if (action === "movie-this") {
  omdb(input);
} else if ((action === "concert-this") && (!input)) {
  defaultArtist = "sublime";
  band();
} else if (action === "concert-this") {
  band();
} else if (action === "spotify-this-song") {
  spotifyFunction();
} else {
  console.log("Either you typed in a command I don't understand or you didn't type ib a command!");
  console.log("Commands: movie-this, concert-this, & spotify-this-song");
}

function omdb(movie) {
  console.log(movie);
  // console.log(input);
  axios.get('https://www.omdbapi.com/?y=&plot=short&apikey=trilogy&t=' + movie)
    .then(function (response) {
      line();
      console.log(response.data.Title,
        response.data.Year,
        response.data.Ratings[0], //imdbRating was another option to how I wrote this. 
        response.data.Ratings[1],
        response.data.Country,
        response.data.Plot,
        response.data.Actors);
    })
  // .catch(function (error) {
  // console.log(error);
  // });
}




function band() {
  // console.log("band is working");
  // console.log('venue, venue location, eventDate');
  axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
    .then(function (response) {
      for (i = 0; i <= 9; i++) { //not looping through just getting the first one. 
        var convertedDate = moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a');
        // console.log("band() working");        
        line();
        console.log("Band Name: " + input);
        console.log("Date of Concert: " + convertedDate);
        console.log("Venue Name: " + response.data[i].venue.name);
        console.log("Venue City: " + response.data[i].venue.city);
      }
    })
    .catch(function (error) {
      // console.log(error);
    });
}

function spotifyFunction() {
  console.log("spotify-this-song")
  // console.log('artist, songName, previewlink, album');
  // this is a promise you have to have the object defined. .. why no work
  spotify.search({
      type: 'track',
      query: input,
      limit: 5
    })
    .then(function (response) {

      // console.log(response.tracks.items[0].name);
      allTracks = response.tracks.items;
      // console.log(allTracks);
      allTracks.forEach(function(thisTrack){
        console.log(thisTrack.name);
      })
    })
    .catch(function (err) {
      console.log(err);
    });
}

//I got real tired of typing console.log('-------') a bunch! lazy makes you better a coder :) 
function line() {
  console.log("-----------------");
}


//TRASHCAN
// function bandArtist(){
//constructor here????
// }

//below is from w3
// Constructor function for Person objects
// function Person(first, last, age, eye) {
//   this.firstName = first;
//   this.lastName = last;
//   this.age = age;
//   this.eyeColor = eye;
// }