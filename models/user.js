const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
	email: {type: String, requried: true, unique: true},
	username: {type: String, requried: true, unique: true} 
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);