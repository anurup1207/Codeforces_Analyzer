// const res = require("./fetch");


async function common_questions(result_handle1,result_handle2) {
  // let response_handle1 = await res.user_status_handle1();
  // let response_handle2 = await res.user_status_handle2();

  // let result_handle1 = response_handle1["result"];
  // let result_handle2 = response_handle2["result"];
  let mp_for_handle1_tried=new Map();
  let mp_for_handle1_solved= new Map();


  for(let i in result_handle1){
    
    let contestidindex = result_handle1[i]["problem"]["contestId"];
    contestidindex += "-";
    contestidindex += result_handle1[i]["problem"]["index"];

    let ifOK = result_handle1[i]["verdict"];
    if (ifOK == "OK" && mp_for_handle1_solved.has(contestidindex)==false) {
      mp_for_handle1_solved.set(contestidindex,1);
    }
    if(mp_for_handle1_tried.has(contestidindex)==false){
      mp_for_handle1_tried.set(contestidindex, 1);
    }
    
  }
  let common_tried_questions=[];
 
  let common_tried=0;
  let common_solved=0;
  for(let i in result_handle2){
    let contestidindex = result_handle2[i]["problem"]["contestId"];
    contestidindex += "-";
    contestidindex += result_handle2[i]["problem"]["index"];
    let ifOK = result_handle2[i]["verdict"];
    if ( ifOK=="OK" && mp_for_handle1_solved.has(contestidindex)) {
      if(mp_for_handle1_solved.get(contestidindex)!=-1){
      common_solved++;
      mp_for_handle1_solved.set(contestidindex,-1);
      }
    }
    if (  mp_for_handle1_tried.has(contestidindex)) {
        if(mp_for_handle1_tried.get(contestidindex)!=-1){
        common_tried_questions.push({
          "name": result_handle2[i]["problem"]["name"],
          "context_id":contestidindex,
          "link": `https://codeforces.com/contest/${result_handle2[i]["problem"]["contestId"]}/problem/${result_handle2[i]["problem"]["index"]}`
          
        })
        common_tried++;
        mp_for_handle1_tried.set(contestidindex,-1);
        }
      }
  }
  
  let common_questions={
    "common_solved":common_solved,
    "common_tried":common_tried,
    "common_tried_questions":common_tried_questions,
  };
  return common_questions;
  // console.log(common_questions)


}
// common_questions();
module.exports={common_questions}
