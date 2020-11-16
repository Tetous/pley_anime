const express = require("express");
const router = express.Router({mergeParams: true});
const Comment = require("../models/comment");
const Anime = require("../models/anime");
const isLoggedIn = require("../utils/isLoggedIn");
const checkCommentOwner = require("../utils/checkCommentOwner")



router.get("/new", isLoggedIn, (req,res) =>{
	res.render("Comments_New", {animeId: req.params.id})
})

router.post("/", isLoggedIn, async (req,res) =>{
	try{
		const comment = await Comment.create({
		user: {
			id: req.user._id,
			username: req.user.username
		},
		text: req.body.text,
		animeId: req.body.animeId
	})
	console.log(comment)
    res.redirect(`/anime/${req.body.animeId}`)
	} catch(err) {
		console.log(err);
		res.send("Broken")
	}
	
})

router.get("/:commentId/edit", checkCommentOwner,  async (req,res) =>{
	try{
		const anime = await Anime.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();
		console.log("anime:", anime);
		console.log("comment:", comment);
		res.render("Comments_Edit", {anime,comment});
	} catch(err) {
		console.log(err);
		res.send("Broken");
	}
})

router.put("/:commentId", checkCommentOwner, async (req,res) =>{
	try{
	const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true});
		console.log(comment);
		res.redirect(`/anime/${req.params.id}`)
	} catch(err) {
		console.log(err);
		res.send("Broken Update");
	}
})

router.delete("/:commentId", checkCommentOwner, async (req,res) =>{
	try{
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		console.log(comment);
		res.redirect(`/anime/${req.params.id}`)
	} catch(err) {
		console.log(err);
		res.send("Broken Delete");
	}
})

module.exports = router;