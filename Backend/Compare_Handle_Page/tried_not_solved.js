// const res = require("./fetch");

// tried by one user but not solved but the second user able to solve

async function tried_not_solved(result_handle1,result_handle2) {
  // let response_handle1 = await res.user_status_handle1();
  // let response_handle2 = await res.user_status_handle2();

  // let result_handle1 = response_handle1["result"];
  // let result_handle2 = response_handle2["result"];
  let mp_for_handle1_tried = new Map();
  let mp_for_handle2_tried = new Map();
  for (let i in result_handle1) {
    let contestidindex = result_handle1[i]["problem"]["contestId"];
    contestidindex += "-";
    contestidindex += result_handle1[i]["problem"]["index"];
    contestidindex += "-";
    contestidindex += result_handle1[i]["problem"]["name"];
    let ifOK = result_handle1[i]["verdict"];
    if (ifOK == "OK") {
      mp_for_handle1_tried.set(contestidindex, 1);
    } else if (mp_for_handle1_tried.has(contestidindex) == true) {
      if (mp_for_handle1_tried.get(contestidindex) != 1) {
        mp_for_handle1_tried.set(contestidindex, -1);
      }
    } else {
      mp_for_handle1_tried.set(contestidindex, -1);
    }
  }

  for (let i in result_handle2) {
    let contestidindex = result_handle2[i]["problem"]["contestId"];
    contestidindex += "-";
    contestidindex += result_handle2[i]["problem"]["index"];
    contestidindex += "-";
    contestidindex += result_handle2[i]["problem"]["name"];

    let ifOK = result_handle2[i]["verdict"];
    if (ifOK == "OK") {
      mp_for_handle2_tried.set(contestidindex, 1);
    } else if (mp_for_handle2_tried.has(contestidindex) == true) {
      if (mp_for_handle2_tried.get(contestidindex) != 1) {
        mp_for_handle2_tried.set(contestidindex, -1);
      }
    } else {
      mp_for_handle2_tried.set(contestidindex, -1);
    }
  }
  let tried_not_solved_handle1 = [];
  let tried_not_solved_handle2 = [];
  for (let [key, value] of mp_for_handle1_tried) {
    if (mp_for_handle2_tried.has(key)) {
      if (mp_for_handle2_tried.get(key) == 1 && value == -1) {
        const myArray = key.split("-");
        tried_not_solved_handle1.push({
          name: myArray[2],
          link: `https://codeforces.com/contest/${myArray[0]}/problem/${myArray[1]}`,
          id: myArray[0] + myArray[1],
        });
      } else if (mp_for_handle2_tried.get(key) == -1 && value == 1) {
        const myArray = key.split("-");
        tried_not_solved_handle2.push({
          name: myArray[2],
          link: `https://codeforces.com/contest/${myArray[0]}/problem/${myArray[1]}`,
          id: myArray[0] + myArray[1],
        });
      }
    }
  }

  let ans = {
    handle1: {
      "tried not solved ": tried_not_solved_handle1.length,
      questions: tried_not_solved_handle1,
    },
    handle2: {
      "tried not solved ": tried_not_solved_handle2.length,
      questions: tried_not_solved_handle2,
    },
  };

  return ans;
}


module.exports={tried_not_solved}
