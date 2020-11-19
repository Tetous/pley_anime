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
	req.flash("success","Comment created")
    res.redirect(`/anime/${req.body.animeId}`)
	} catch(err) {
		console.log(err);
		req.flash("error","Error creating comment")
		res.redirect("/Anime")
	}
	
})

router.get("/:commentId/edit", checkCommentOwner,  async (req,res) =>{
	try{
		const anime = await Anime.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();
		
		res.render("Comments_Edit", {anime,comment});
	} catch(err) {
		console.log(err);
		
	}
})

router.put("/:commentId", checkCommentOwner, async (req,res) =>{
	try{
	const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true});
		req.flash("success","Comment edidted")
		res.redirect(`/anime/${req.params.id}`)
	} catch(err) {
		console.log(err);
		rreq.flash("error","Error editing comment")
		res.redirect("/Anime")
	}
})

router.delete("/:commentId", checkCommentOwner, async (req,res) =>{
	try{
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		req.flash("success","Comment deleted")
		res.redirect(`/anime/${req.params.id}`)
	} catch(err) {
		console.log(err);
		req.flash("error","Error deleting comment")
		res.redirect("/Anime")
	}
})

module.exports = router;