// const res = require('./fetch');
 function question_level(result){
   
    let mp_for_level = new Map();
    const mp_for_unique_question= new Map();



    for(let i in result){
  
         let contestidindex = result[i]["problem"]["contestId"]
         contestidindex += result[i]["problem"]["index"]
         let ifOK= result[i]["verdict"]
         if(ifOK=='OK'){
            
            if(mp_for_unique_question.has(contestidindex)==false){

                // ==================level solved========================
                if (mp_for_level.has(result[i]["problem"]["index"][0]))
                    mp_for_level.set(result[i]["problem"]["index"][0], mp_for_level.get(result[i]["problem"]["index"][0]) + 1)
                else
                    mp_for_level.set(result[i]["problem"]["index"][0], 1)


                // ==================level solved========================

                mp_for_unique_question.set(contestidindex,1)
            }
         }
        
        
    }


    // <<<=========== level ==============>>>
    const level={};
    for(let i in result){
        if (mp_for_level.get(result[i]["problem"]["index"][0]) != -1) {
            let tag1=result[i]["problem"]["index"][0];
            let value=mp_for_level.get(result[i]["problem"]["index"][0]);
           
            level[tag1]=value,
           
            mp_for_level.set(result[i]["problem"]["index"][0], -1);
        }
    }
    // console.log(level["A"])
    return level;
  

    // <<<=========== level ==============>>>
}

async function level(result_handle1,result_handle2) {
    // let response_handle1 = await res.user_status_handle1();
    // let response_handle2 = await res.user_status_handle2();
  
    // let result_handle1 = response_handle1["result"];
    // let result_handle2 = response_handle2["result"];
    let contest_details_handle1 = question_level(result_handle1);
    let contest_details_handle2 = question_level(result_handle2);
  
    let compare_handles = {
      handle1: contest_details_handle1,
      handle2: contest_details_handle2,
    };
    return compare_handles;
    console.log(compare_handles);
    
  }

level();
module.exports={level}