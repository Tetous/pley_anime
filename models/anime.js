const mongoose = require("mongoose");
const animeSchema = new mongoose.Schema({
  title: String,
  description: String,
  creator: String,
  studio: String,
  date: String,
  source: String,
  episodes: Number,
  genre: String,
  age_restriction: Boolean,
  image: String,
  owner: {
    id: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User"
    },
    username: String
  },
 upvote: [String],
 downvote: [String]
 
	
	
});

animeSchema.index({
  "$**": "text"
});

module.exports = mongoose.model("anime", animeSchema);