// const { reverse } = require("dns");
// const res = require("./fetch");

function max_current_rating(result) {
  result.reverse();
  let mp_for_tried_questions = new Map();
  let mp_for_solved_questions = new Map();
  let mp_for_attempt_to_each_questions = new Map();
  let mp_for_ifOk = new Map();

  for (let i in result) {
    let contestidindex = result[i]["problem"]["contestId"];
    contestidindex += "-";
    contestidindex += result[i]["problem"]["index"];
    // console.log(contestidindex)
    let ifOK = result[i]["verdict"];
    if (mp_for_ifOk.has(contestidindex) == false) {
      if (mp_for_attempt_to_each_questions.has(contestidindex))
        mp_for_attempt_to_each_questions.set(
          contestidindex,
          mp_for_attempt_to_each_questions.get(contestidindex) + 1
        );
      else mp_for_attempt_to_each_questions.set(contestidindex, 1);

      // mp_for_solved_questions.set(contestidindex,1)

      if (ifOK == "OK") {
        mp_for_ifOk.set(contestidindex, 1);
        mp_for_solved_questions.set(contestidindex, 1);
      }
    }
    mp_for_tried_questions.set(contestidindex, 1);
  }

  let max_attempt = 0;
  let max_question_name;
  let attempt_one = 0;
  let contestid;
  let index;
  const attempt_to_each_question = [];
  for (let i in result) {
    let contestidindex = result[i]["problem"]["contestId"];
    contestidindex += "-";
    contestidindex += result[i]["problem"]["index"];
    if (mp_for_attempt_to_each_questions.get(contestidindex) != -1) {
      let tag1 = contestidindex;
      let value = mp_for_attempt_to_each_questions.get(contestidindex);
      if (value == 1) {
        attempt_one++;
      }
      if (value > max_attempt) {
        max_attempt = value;
        max_question_name = tag1;
        contestid = result[i]["problem"]["contestId"];
        index = result[i]["problem"]["index"];
      }
      attempt_to_each_question.push({
        [tag1]: value,
      });
      mp_for_attempt_to_each_questions.set(contestidindex, -1);
    }
  }
  let percentage = attempt_one / mp_for_solved_questions.size;
  percentage = percentage * 100;
  percentage = percentage.toFixed(2);

  let average1 = result.length / mp_for_solved_questions.size;
  let average2 = average1.toFixed(2);

  let question_details = {
    tried: mp_for_tried_questions.size,
    solved: mp_for_solved_questions.size,
    unsolved: mp_for_tried_questions.size - mp_for_solved_questions.size,
    "max-attempt": {
      "max-attempt": max_attempt,
      "problem-name": max_question_name,
      link: `https://codeforces.com/contest/${contestid}/problem/${index}`,
    },
    "attempt-one": {
      "Solved with one submission": attempt_one,
      "percentage ": percentage,
    },
    "average ": average2,
  };

  return question_details;
}

async function user_question_details(result_handle1,result_handle2) {
  // let response_handle1 = await res.user_status_handle1();
  // let response_handle2 = await res.user_status_handle2();

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
// user_question_details();
module.exports={user_question_details};
