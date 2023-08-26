// const res = require("./fetch");

function max_current_rating(result) {
  let best_rank = 100000;
  let max_rating = 0;
  let current_rating = 0;
  let max_up = 0;
  let max_down = 0;
  let worst_rank = 0;
  let contestid_best_rank;
  let contestid_worst_rank;
  let contestid_max_up;
  let contestid_max_low = 0;
  for (let i in result) {
    let rating_change = result[i]["newRating"] - result[i]["oldRating"];

    if (max_up < rating_change) {
      max_up = rating_change;
      contestid_max_up = result[i]["contestId"];
    }

    if (max_down > rating_change) {
      max_down = rating_change;
      contestid_max_low = result[i]["contestId"];
    }

    if (best_rank > result[i]["rank"]) {
      best_rank = result[i]["rank"];
      contestid_best_rank = result[i]["contestId"];
    }

    if (worst_rank < result[i]["rank"]) {
      worst_rank = result[i]["rank"];
      contestid_worst_rank = result[i]["contestId"];
    }
    max_rating = Math.max(max_rating, result[i]["newRating"]);
    current_rating = result[i]["newRating"];
  }
  let contest_details = {
    "Number_of_contests": result.length,
    "current_rating": current_rating,
    "max_rating": max_rating,
    "best_rank": {
      "best_rank": best_rank,
      "link": `https://codeforces.com/contest/${contestid_best_rank}`,
    },
    "worst_rank": {
      "worst_rank": worst_rank,
      "link": `https://codeforces.com/contest/${contestid_worst_rank}`,
    },
    "max_up": {
      "max_up": max_up,
      "link": `https://codeforces.com/contest/${contestid_max_up}`,
    },
    "max_down": {
      "max_down": max_down,
      "link": `https://codeforces.com/contest/${contestid_max_low}`,
    },
  };

  return contest_details;
}

async function user_submission_status(result_handle1,result_handle2) {
  // let response_handle1 = await res.user_contest_details_handle1();
  // let response_handle2 = await res.user_contest_details_handle2();

  // let result_handle1 = response_handle1["result"];
  // let result_handle2 = response_handle2["result"];
  let contest_details_handle1 = max_current_rating(result_handle1);
  let contest_details_handle2 = max_current_rating(result_handle2);

  let compare_handles = {
    handle1: contest_details_handle1,
    handle2: contest_details_handle2,
  };
  return compare_handles;
  console.log(compare_handles);
}
// user_submission_status();
module.exports={user_submission_status}
