// const { compileFunction } = require('vm');
const res = require('./fetch');

async function contest_details() {
  let response = await res.user_contest_details();


  let result = response["result"];
//   console.log(result)
let best_rank=100000;
let max_rating=0;
let current_rating=0;
let max_up=0;
let max_down=0;
let worst_rank=0;
for(let i in result){
    let rating_change= result[i]["newRating"]-result[i]["oldRating"]
    max_up= Math.max(rating_change, max_up);
    max_down= Math.min(rating_change,max_down);
    best_rank= Math.min(best_rank,result[i]["rank"]);
    worst_rank=Math.max(worst_rank,result[i]["rank"])
    max_rating= Math.max(max_rating,result[i]["newRating"])
    current_rating=result[i]["newRating"]


}

 
let contest_details=[]
contest_details.push({
    "Number of contests ": result.length,
})
contest_details.push({
    "current rating" : current_rating,
})
contest_details.push({
    "max rating" : max_rating,
})
contest_details.push({
    "best rank" : best_rank,
})
contest_details.push({
    "worst rank" : worst_rank,
})
contest_details.push({
    "max up" : max_up,
})
contest_details.push({
    "max down": max_down,
})

for(let i in contest_details){
    console.log(contest_details[i])
}
 
}

contest_details();
