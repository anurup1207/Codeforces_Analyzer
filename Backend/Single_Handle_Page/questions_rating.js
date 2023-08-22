const res = require('../fetch');
async function question_rating(result){
    // let response = await res.user_status();
    // let result = response["result"];
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
    // question_rating.sort(function(a, b) { 
        
    //     return a - b;
    // });
    return question_rating;
    // <<<=========== level ==============>>>
}
module.exports={question_rating}