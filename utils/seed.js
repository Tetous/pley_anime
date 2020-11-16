const Anime = require("../models/anime");
const Comment = require("../models/comment")  

const animeSeeds = [
	{
	title: "Attack on Titan",
	description: "Attack on Titan is set in a world where humanity lives inside cities surrounded by enormous Walls that protect them from Titans; gigantic humanoid creatures who devour humans seemingly without reason.",
	creator: "Hajime Isayama",
	studio: "Wit Studio",
	date: "2013-04-07",
	source: "Manga",
	episodes: 59,
	genre: "Action",
	age_restriction: true,
	image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
	},
	{
		title: "Banana Fish",
	description: "Banana Fish follows the relationship between Ash Lynx, a teenage gang leader in New York City, and Eiji Okumura, a Japanese photographer's assistant. ",
	creator: "Akimi Yoshida",
	studio: "MAPPA",
	date: "2017-07-06",
	source: "Manga",
	episodes: 24,
	genre: "Action",
	age_restriction: true,
	image: "https://cdn.myanimelist.net/images/anime/1190/93472.jpg",
	},
	{
		title: "Haikyu!!",
	description: "Hakyu!! follows Shōyō Hinata, a boy determined to become a great volleyball player despite his small    stature.",
	creator: "Haruichi Furudate",
	studio: "Production I.G",
	date: "2014-04-06",
	source: "Manga",
	episodes: 73,
	genre: "Sports",
	age_restriction: false,
	image: "https://cdn.myanimelist.net/images/anime/7/76014.jpg",
	}
		]

const seed = async () =>{
	await Anime.deleteMany();
	console.log("Deleted all the Anime");
	
	await Comment.deleteMany();
	console.log("Deleted all the comments");
	
	// for(const animeSeed of animeSeeds){
	// 	let anime = await Anime.create(animeSeed)
	// 	console.log("Created a new anime: ", anime.title)
	// 	// await Comment.create({
	// 	// 	text: "I love this anime",
	// 	// 	user: "GodlyOtaku",
	// 	// 	animeId: anime._id	
	// 	// })
	// 	// console.log("Created a new comment:")
	// }
}

module.exports = seed;