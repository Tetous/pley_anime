const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User"
    },
    username: String
  },
  text: String,
  animeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Anime"
  },
});

module.exports = mongoose.model("comment", commentSchema);