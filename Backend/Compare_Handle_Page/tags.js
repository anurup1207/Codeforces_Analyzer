// const res = require('./fetch');
 function question_level(result){
   
    let mp_for_tags = new Map();
    const mp_for_unique_question= new Map();



    for(let i in result){
         
         let contestidindex = result[i]["problem"]["contestId"]
         contestidindex += result[i]["problem"]["index"]
         let ifOK= result[i]["verdict"]
         if(ifOK=='OK'){
            
            if(mp_for_unique_question.has(contestidindex)==false){


                // <<<=========== tags ==============>>>
                let alltags=result[i]["problem"]["tags"];
                for(let j in alltags){
                    if (mp_for_tags.has(alltags[j]))
                    mp_for_tags.set(alltags[j], mp_for_tags.get(alltags[j]) + 1)
                else
                    mp_for_tags.set(alltags[j], 1)
                }
                 // <<<=========== tags ==============>>>




                mp_for_unique_question.set(contestidindex,1)
            }
         }
        
        
    }


    const tags={};
    for(let i in result){
        let alltags=result[i]["problem"]["tags"];
        for(let j in alltags )
       { 
        if (mp_for_tags.get(alltags[j]) != -1) {
            let tag1=alltags[j];
            let value=mp_for_tags.get(alltags[j]);
            // tags.push({
            //     [tag1]:value,
            // })
            tags[tag1]=value,
           
            mp_for_tags.set(alltags[j], -1);
        }
        }
    }
    return tags;
  

    // <<<=========== level ==============>>>
}

async function tags(result_handle1,result_handle2) {
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
    
  }

module.exports={tags}