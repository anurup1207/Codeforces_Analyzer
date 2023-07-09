// const res = require("./fetch");

async function unsolved(result) {

  // let response = await res.user_status();
  // let result = response["result"];
 

  let mp_for_unsolved = new Map();
  let mp_for_solved_questions = new Map();

  for (let i in result) {
    let contestidindex = result[i]["problem"]["contestId"];
    contestidindex += "-";
    contestidindex += result[i]["problem"]["index"];

    let ifOK = result[i]["verdict"];
    if (ifOK == "OK") {
      mp_for_solved_questions.set(contestidindex, 1);
    }
  }

  for (let i in result) {
    let contestidindex = result[i]["problem"]["contestId"];
    contestidindex += "-";
    contestidindex += result[i]["problem"]["index"];

    if (mp_for_solved_questions.has(contestidindex) == false) {
      mp_for_unsolved.set(contestidindex, 1);
    }
  }

  const unsolved = [];
  for (let i in result) {
    let contestidindex = result[i]["problem"]["contestId"];
    contestidindex += "-";
    contestidindex += result[i]["problem"]["index"];
    if (
      mp_for_unsolved.has(contestidindex) &&
      mp_for_unsolved.get(contestidindex) != -1
    ) {
      let contestid = result[i]["problem"]["contestId"];
      let index = result[i]["problem"]["index"];
      unsolved.push({
        problem_name: contestidindex,
        link: `https://codeforces.com/contest/${contestid}/problem/${index}`,
      });
      mp_for_unsolved.set(contestidindex, -1);
    }
  }
    return unsolved;
}

module.exports={unsolved}
