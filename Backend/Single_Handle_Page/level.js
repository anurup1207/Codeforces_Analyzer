const res = require('../fetch');
async function level(result){
    // let response = await res.user_status();
    // let result = response["result"];
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
            // level.push({
            //     [tag1]:value,
            // })
            level[tag1]=value,
           
            mp_for_level.set(result[i]["problem"]["index"][0], -1);
        }
    }
    // console.log(level)
    return level;

    // <<<=========== level ==============>>>
}
// level();
module.exports={level}