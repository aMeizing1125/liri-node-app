// inputs action and name of movie song etc
var axios = require('axios');
//don't forget to do the rest of the requires
var action = process.argv[2];
var input = process.argv[3];

//if time allows update this to a switch statement
if ((action === "movie-this") && (!input)) {
  movieDefault = "Mr.Robot";
  console.log("It's on Netflix!");
  omdb(movieDefault);
} else if (action === "movie-this") {
  omdb(input);
};



function omdb(movie) {
console.log(movie);
    // console.log(input);
    axios.get('https://www.omdbapi.com/?y=&plot=short&apikey=trilogy&t=' + movie)
    .then(function (response) {
      console.log(response.data.Title,
        response.data.Year,
        response.data.Ratings[0],
        response.data.Ratings[1],
        response.data.Country,
        response.data.Plot,
        response.data.Actors);
    })
    .catch(function (error) {
      // console.log(error);
    });
}

if (action === "spotify-this-song") {
  spotify();
}

function spotify() {
  console.log("spotify-this-song")
  console.log('artist, songName, previewlink, album');
}

if (action === "concert-this") {
  band();
}

function band() {
  console.log("band is working");
  console.log('venue, venue location, eventDate');
  // axios.get('rest.bandsintown.com' + movie)
  //   .then(function (response) {
  //     console.log(response.data.Title,
  //       response.data.Year,
  //       response.data.Ratings[0],
  //       response.data.Ratings[1],
  //       response.data.Country,
  //       response.data.Plot,
  //       response.data.Actors);;
  //   })
  //   .catch(function (error) {
  //     // console.log(error);
  //   });
}