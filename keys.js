require("dotenv").config(); // or is this right? 
// console.log(process.env.SPOTIFY_ID);


//in instructions
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
