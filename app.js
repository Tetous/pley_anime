//NPM Imports
const express = require ("express");
const bodyParser = require("body-parser")
const app = express();
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const morgan = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const expressSesion = require("express-session");
const flash = require("connect-flash");

//Config Import
try{
	var config = require("./config");
} catch(err){
	console.log("Not working locally");
	console.log(err);
}

//Route Imports
const animeRoutes = require("./routes/anime")
const commentsRoutes = require("./routes/comments")
const mainRoutes = require("./routes/main")
const authRoutes = require("./routes/auth");

//Model Imports
const Anime = require("./models/anime")
const Comment = require("./models/comment")
const User = require("./models/user")

//Config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(morgan("tiny"));
app.use(expressSesion({
	secret: process.env.ES_SECRET || config.expressSession.secret,
	resave: false,
	saveUninitialized: false
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));


//Utils
// const seed = require("./utils/seed")
// seed();

//Connect to DB
try{
	mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
} catch(err) {
	console.log("Not working locally");
	mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
}


//Current User Middleware
app.use((req,res,next) =>{
	res.locals.user = req.user;
	next();
})

//Use Routes
app.use("/", mainRoutes);
app.use("/", authRoutes)
app.use("/anime", animeRoutes);
app.use("/anime/:id/comments", commentsRoutes);

app.listen(process.env.PORT ||3000, ()=>{console.log("Yelp Clone is running")});