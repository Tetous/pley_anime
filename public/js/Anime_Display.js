const upvoteBtn = document.getElementById("upvoteBtn");
const downvoteBtn = document.getElementById("downvoteBtn");
const score = document.getElementById("score");
document.getElementById("updownTrigger").style.visibility = "hidden"



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
		handleVote(res.score,res.code)
	})
	.catch(err =>{
		console.log(err);
	})
}

const handleVote = (newScore,code)=>{
	score.innerText = newScore;
	if(code === 0){
		upvoteBtn.classList.remove("btn-success")
		upvoteBtn.classList.add("btn-outline-success")
		downvoteBtn.classList.remove("btn-danger")
		downvoteBtn.classList.add("btn-outline-danger")
	} else if(code === 1){
		upvoteBtn.classList.add("btn-success")
		upvoteBtn.classList.remove("btn-outline-success")
		downvoteBtn.classList.remove("btn-danger")
		downvoteBtn.classList.add("btn-outline-danger")
		
	} else if (code === -1) {
		upvoteBtn.classList.remove("btn-success")
		upvoteBtn.classList.add("btn-outline-success")
		downvoteBtn.classList.add("btn-danger")
		downvoteBtn.classList.remove("btn-outline-danger")
	} else {
		 console.log("Handle vote error")
	}
}

upvoteBtn.addEventListener("click", async function(){
if(upvoteBtn.classList.contains("btn-outline-secondary")){
   document.getElementById("updownTrigger").style.visibility = "visible"
	} else {
	sendVote("up");	
	}
});

downvoteBtn.addEventListener("click", async function(){
if(downvoteBtn.classList.contains("btn-outline-secondary")){
   document.getElementById("updownTrigger").style.visibility = "visible"
	} else {
	sendVote("down");	
	}});
