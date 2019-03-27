// inputs action and name of movie song etc
var axios = require('axios');
var dotenv = require("dotenv").config(); // is this right 
var moment = require('moment');
require("dotenv").config(); // or is this right? 
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

//don't forget to do the rest of the requires
var action = process.argv[2];
//maybe a forEach loop to iterate through the remainder like process.argv[i]


var input = process.argv[3];

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
  spotify();
} else {
  console.log("Nope, don't know what that means! Try again");
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
        
        // moment().format(console.log(response.data[1].datetime));
        // console.log(response.data);
        // console.log(JSON.stringify(response, null, 2)); I tried
      }

    })
    .catch(function (error) {
      // console.log(error);
    });
}

function spotify() {
  console.log("spotify-this-song")
  // console.log('artist, songName, previewlink, album');
}

function line() {
  console.log("-----------------");
}