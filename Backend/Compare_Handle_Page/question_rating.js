// const res = require("./fetch");

function max_current_rating(result) {
    let mp_for_question_rating = new Map();
    const mp_for_unique_question= new Map();



    for(let i in result){
       
         let contestidindex = result[i]["problem"]["contestId"]
         contestidindex += result[i]["problem"]["index"]
         let ifOK= result[i]["verdict"]
         if(ifOK=='OK'){
            
            if(mp_for_unique_question.has(contestidindex)==false){

                // ==================problem rating========================
                if (mp_for_question_rating.has(result[i]["problem"]["rating"]))
                    mp_for_question_rating.set(result[i]["problem"]["rating"], mp_for_question_rating.get(result[i]["problem"]["rating"]) + 1)
                else
                    mp_for_question_rating.set(result[i]["problem"]["rating"], 1)

                // ==================problem rating========================

                mp_for_unique_question.set(contestidindex,1)
            }
         }
        
        
    }


    // <<<=========== level ==============>>>
    const question_rating={};
    for(let i in result){
        if (mp_for_question_rating.get(result[i]["problem"]["rating"]) != -1) {
            let tag1=result[i]["problem"]["rating"];
            let value=mp_for_question_rating.get(result[i]["problem"]["rating"]);
            // question_rating.push({
            //     [tag1]:value,
            // })
            question_rating[tag1]=value,
           
            mp_for_question_rating.set(result[i]["problem"]["rating"], -1);
        }
    }
    delete question_rating["undefined"];

  return question_rating;
}

async function question_rating(result_handle1,result_handle2) {
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
  // console.log(compare_handles);
}
// question_rating();
module.exports={question_rating};
