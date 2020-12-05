const express = require("express");
const router = express.Router();
const Anime = require("../models/anime");
const Comment = require("../models/comment");
const isLoggedIn = require("../utils/isLoggedIn");
const checkAnimeOwner = require("../utils/checkAnimeOwner")

router.get("/", async (req, res) => {
  try {
    const anime = await Anime.find().exec()
    res.render("Anime", {
      anime
    });
  } catch (err) {
    console.log(err);
    res.send("You Broke It0!")
  }
})

router.post("/", isLoggedIn, async (req, res) => {
  const genre = req.body.genre.toLowerCase();
  const newAnime = {
    title: req.body.title,
    description: req.body.description,
    creator: req.body.creator,
    studio: req.body.studio,
    date: req.body.date,
    source: req.body.source,
    episodes: req.body.episodes,
    genre,
    age_restriction: !!req.body.age_restriction,
    image: req.body.img,
    owner: {
      id: req.user._id,
      username: req.user.username
    },
    upvotes: [],
    downvotes: []
  }

  try {
    const anime = await Anime.create(newAnime)
    req.flash("success", "Anime created")
    res.redirect("/anime/" + anime._id);
  } catch (err) {
    console.log(err);
    req.flash("error", "Error creating anime")
    res.redirect("/Anime")
  }
})

router.get("/new", isLoggedIn, (req, res) => {
  res.render("Anime_New");
})

router.get("/search", async (req, res) => {
  try {
    const anime = await Anime.find({
      $text: {
        $search: req.query.term
      }
    })
    res.render("Anime", {
      anime
    })
  } catch (err) {
    console.log(err);
    res.send("Broken Search");
  }
})

router.get("/genre/:genre", async (req, res) => {
  const validGenres = ["action", "slice-of-life", "sports", "comedy", "horror", "thirller"];
  if (validGenres.includes(req.params.genre.toLowerCase())) {
    const anime = await Anime.find({
      genre: req.params.genre
    }).exec();
    res.render("Anime", {
      anime
    })
  } else {
    res.send("Please enter a valid genre");
  }
});

router.post("/vote", isLoggedIn, async (req, res) => {
  console.log(req.body)

  const anime = await Anime.findById(req.body.animeId)
  const alreadyUpvoted = anime.upvotes.indexOf(req.user.username); //Will be -1 if not found
  const alreadyDownvoted = anime.downvotes.indexOf(req.user.username); //Will be -1 if not found


  let response = {}
  if (alreadyUpvoted === -1 && alreadyDownvoted === -1) {
    if (req.body.voteType === "up") {
      anime.upvotes.push(req.user.username);
      anime.save()
      response = {
        message: "Upvote tallied",
        code: 1
      }
    } else if (req.body.voteType === "down") {
      anime.downvotes.push(req.user.username);
      anime.save()
      response = {
        message: "Downvote tallied",
        code: -1
      }
    } else {
      response = {
        message: "Error 1",
        code: "err"
      }

    }


  } else if (alreadyUpvoted >= 0) {
    if (req.body.voteType === "up") {
      anime.upvotes.splice(alreadyUpvoted, 1)
      anime.save();
      response = {
        message: "Upvote removed",
        code: 0
      }
    } else if (req.body.voteType === "down") {
      anime.upvotes.splice(alreadyUpvoted, 1)
      anime.downvotes.push(req.user.username);
      anime.save()
      response = {
        message: "Changed to downvote",
        code: -1
      }

    } else {
      response = {
        message: "Error 2",
        code: "err"
      }
    }

  } else if (alreadyDownvoted >= 0) {
    if (req.body.voteType === "up") {
      anime.downvotes.splice(alreadyDownvoted, 1)
      anime.upvotes.push(req.user.username);
      anime.save()
      response = {
        message: "Changed to upvote",
        code: 1
      }

    } else if (req.body.voteType === "down") {
      anime.downvotes.splice(alreadyUpvoted, 1)
      anime.save();
      response = {
        message: "Downvote removed",
        code: 0
      }
    } else {
      response = {
        message: "Error 3",
        code: "err"
      }
    }

  } else {
    response = {
      message: "Error 4",
      code: "err"
    }
  }
  response.score = anime.upvotes.length - anime.downvotes.length
  res.json(response);
})

router.get("/:id", async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id).exec()
    const comments = await Comment.find({
      animeId: req.params.id
    })
    res.render("Anime_Display", {
      anime,
      comments
    })
  } catch (err) {
    console.log(err);
    res.render("error");
  }
})

router.get("/:id/edit", checkAnimeOwner, async (req, res) => {
  const anime = await Anime.findById(req.params.id).exec()
  res.render("Anime_Edit", {
    anime
  });
})


router.put("/:id", checkAnimeOwner, async (req, res) => {
  const genre = req.body.genre.toLowerCase();
  const updatedAnime = {
    title: req.body.title,
    description: req.body.description,
    creator: req.body.creator,
    studio: req.body.studio,
    date: req.body.date,
    source: req.body.source,
    episodes: req.body.episodes,
    genre,
    age_restriction: !!req.body.age_restriction,
    image: req.body.img
  }
  try {
    const anime = await Anime.findByIdAndUpdate(req.params.id, updatedAnime, {
      new: true
    }).exec()
    req.flash("success", "Anime updated")
    res.redirect(`/anime/${req.params.id}`)
  } catch (err) {
    console.log(err);
    req.flash("error", "Error updating anime")
    res.redirect("Anime")
  }
})

router.delete("/:id", checkAnimeOwner, async (req, res) => {
  try {
    const deletedAnime = await Anime.findByIdAndDelete(req.params.id).exec()
    req.flash("success", "Anime deleted")
    res.redirect("/anime")
  } catch (err) {
    console.log(err);
    req.flash("error", "Error deleting anime");
    res.redirect("back");
  }
})

module.exports = router;