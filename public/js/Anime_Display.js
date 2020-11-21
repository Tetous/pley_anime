const upvoteBtn = document.getElementById("upvoteBtn");
const downvoteBtn = document.getElementById("downvoteBtn");


const sendVote = async (voteType) =>{
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		}
	}
	
	if (voteType === "up"){
		options.body = JSON.stringify({
			voteType:"up",
			animeId
		})
	} else if (voteType === "down"){
		options.body = JSON.stringify({
			voteType:"down",
			animeId
		})
	} else {
		throw "VoteType must be up or down"
	}
	
	await fetch("/anime/vote", options)
	.then(data=>{
	  return data.json();
	})
	.then(res=>{
		console.log(res)
	})
	.catch(err =>{
		console.log(err);
	})
}

upvoteBtn.addEventListener("click", async function(){
	sendVote("up");
});

downvoteBtn.addEventListener("click", async function(){
	sendVote("down");
});

