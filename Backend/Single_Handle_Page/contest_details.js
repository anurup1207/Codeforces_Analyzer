// const { compileFunction } = require('vm');
const res = require('./fetch');

async function contest_details(result) {
  // let response = await res.user_contest_details();


  // let result = response["result"];
//   console.log(result)
let best_rank=100000;
let max_rating=0;
let current_rating=0;
let max_up=0;
let max_down=0;
let worst_rank=0;
let contestid_best_rank;
let contestid_worst_rank;
let contestid_max_up;
let contestid_max_low=0;
for(let i in result){
    let rating_change= result[i]["newRating"]-result[i]["oldRating"]
    
    if(max_up<rating_change){
        max_up=rating_change;
        contestid_max_up=result[i]["contestId"];
    }
    
    if(max_down>rating_change){
        max_down=rating_change;
        contestid_max_low=result[i]["contestId"];
    }
    
    if(best_rank>result[i]["rank"]){
        best_rank=result[i]["rank"];
        contestid_best_rank=result[i]["contestId"];
    }
    
    if(worst_rank<result[i]["rank"]){
        worst_rank=result[i]["rank"];
        contestid_worst_rank=result[i]["contestId"]
    }
    max_rating= Math.max(max_rating,result[i]["newRating"])
    current_rating=result[i]["newRating"]


}

 

let contest_details = {
    "Number of contests ": result.length,
    "current rating": current_rating,
    "max rating": max_rating,
    "best rank": {
      "best rank": best_rank,
      "link ": `https://codeforces.com/contest/${contestid_best_rank}`,
    },
    "worst_rank": {
      "worst rank": worst_rank,
      "link ": `https://codeforces.com/contest/${contestid_worst_rank}`,
    },
    "max_up": {
      "max up": max_up,
      "link ": `https://codeforces.com/contest/${contestid_max_up}`,
    },
    "max_down": {
      "max down": max_down,
      "link ": `https://codeforces.com/contest/${contestid_max_low}`,
    },
  };

return contest_details;
 
}

// contest_details();
module.exports={contest_details}
