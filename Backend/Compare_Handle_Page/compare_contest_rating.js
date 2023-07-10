// const res = require("./fetch");


async function common_contest(result_handle1,result_handle2) {
//   let response_handle1 = await res.user_contest_details_handle1();
//   let response_handle2 = await res.user_contest_details_handle2();

//   let result_handle1 = response_handle1["result"];
//   let result_handle2 = response_handle2["result"];

 let mp_for_contest_handle1= new Map();
 let common_contest=[];
 for(let i in result_handle1){
    let id=result_handle1[i]["contestId"];
    let rank=result_handle1[i]["rank"]
    mp_for_contest_handle1.set(id,rank);
 }
 for(let i in result_handle2){
    let id=result_handle2[i]["contestId"];
    
    if(mp_for_contest_handle1.has(id)){
        let rank1=mp_for_contest_handle1.get(id);
         let rank2=result_handle2[i]["rank"];
         let winner;
         let diffrence;
         if(rank1<rank2){
            winner="handle1";
            diffrence=rank2-rank1;
         }else{
            winner="handle2";
            diffrence=rank1-rank2;
         }
         common_contest.push({
           "contestId" : id,
           "rank handle1": rank1,
           "rank handle2": rank2,
           "rank diffrence":  diffrence,
           "winner":winner,
           "link": `https://codeforces.com/contest/${id}`
         })
    }
 }
 
 return common_contest;
 console.log(common_contest);





}
// common_contest();
module.exports={common_contest}
