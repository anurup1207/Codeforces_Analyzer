async function user_status() {
    const user_name="anurup123aryan"
    const api=`https://codeforces.com/api/user.status?handle=${user_name}&from=1`
    let response=await fetch(api)
    response = await response.json()
    
    var result = [];
    var result = response["result"];
   
    
    
    var mp_for_verdict = new Map();
    var mp_for_language= new Map();
    const mp_for_unique_question= new Map();
    var mp_for_tags= new Map();
    var mp_for_level=new Map();
    var mp_for_question_rating= new Map();

   
    
    for(var i in result){
        // <<<=========== language ==============>>>

        if (mp_for_language.has(result[i]["programmingLanguage"]))
        mp_for_language.set(result[i]["programmingLanguage"], mp_for_language.get(result[i]["programmingLanguage"]) + 1)
    else
        mp_for_language.set(result[i]["programmingLanguage"], 1)

       // <<<=========== language ==============>>>
        






        // <<<=========== verdict ==============>>>

        if (mp_for_verdict.has(result[i]["verdict"]))
        mp_for_verdict.set(result[i]["verdict"], mp_for_verdict.get(result[i]["verdict"]) + 1)
    else
        mp_for_verdict.set(result[i]["verdict"], 1)

       // <<<=========== verdict ==============>>>





         
         var contestidindex = result[i]["problem"]["contestId"]
         contestidindex += result[i]["problem"]["index"]
         var ifOK= result[i]["verdict"]
         if(ifOK=='OK'){
            
            if(mp_for_unique_question.has(contestidindex)==false){


                // <<<=========== tags ==============>>>
                var alltags=result[i]["problem"]["tags"];
                for(let j in alltags){
                    if (mp_for_tags.has(alltags[j]))
                    mp_for_tags.set(alltags[j], mp_for_tags.get(alltags[j]) + 1)
                else
                    mp_for_tags.set(alltags[j], 1)
                }
                 // <<<=========== tags ==============>>>



                // ==================level solved========================
                if (mp_for_level.has(result[i]["problem"]["index"][0]))
                    mp_for_level.set(result[i]["problem"]["index"][0], mp_for_level.get(result[i]["problem"]["index"][0]) + 1)
                else
                    mp_for_level.set(result[i]["problem"]["index"][0], 1)


                // ==================level solved========================


            


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





     // <<<=========== language ==============>>>

     const languages=[];
     for(var i in result){
         if (mp_for_language.get(result[i]["programmingLanguage"]) != -1) {
             let tag1=result[i]["programmingLanguage"];
             let value=mp_for_language.get(result[i]["programmingLanguage"]);
             languages.push({
                
                 [tag1]:value,
             })
            
             mp_for_language.set(result[i]["programmingLanguage"], -1);
         }
     }
    //  for(let i in languages){
    //      console.log(languages[i]);
    //  }
     // <<<=========== language ==============>>>











    // <<<=========== verdict ==============>>>
    const verdict=[];
    for(var i in result){
        if (mp_for_verdict.get(result[i]["verdict"]) != -1) {
            let tag1=result[i]["verdict"];
            let value=mp_for_verdict.get(result[i]["verdict"]);
            verdict.push({
                [tag1]:value,
            })
           
            mp_for_verdict.set(result[i]["verdict"], -1);
        }
    }
    // for(let i in verdict){
    //     console.log(verdict[i]);
    // }
    // <<<=========== verdict ==============>>>




    // <<<=========== tags ==============>>>
    const tags=[];
    for(var i in result){
        var alltags=result[i]["problem"]["tags"];
        for(var j in alltags )
       { 
        if (mp_for_tags.get(alltags[j]) != -1) {
            let tag1=alltags[j];
            let value=mp_for_tags.get(alltags[j]);
            tags.push({
                [tag1]:value,
            })
           
            mp_for_tags.set(alltags[j], -1);
        }
        }
    }

    // for(let i in tags){
    //     console.log(tags[i]);
    // }
    // <<<=========== tags ==============>>>



     


    // <<<=========== level ==============>>>
    const level=[];
    for(var i in result){
        if (mp_for_level.get(result[i]["problem"]["index"][0]) != -1) {
            let tag1=result[i]["problem"]["index"][0];
            let value=mp_for_level.get(result[i]["problem"]["index"][0]);
            level.push({
                [tag1]:value,
            })
           
            mp_for_level.set(result[i]["problem"]["index"][0], -1);
        }
    }
    // for(let i in level){
    //     console.log(level[i]);
    // }

    // <<<=========== level ==============>>>









    // <<<=========== rating ==============>>>

    const question_rating=[];
    for(var i in result){
        if (mp_for_question_rating.get(result[i]["problem"]["rating"]) != -1) {
            let tag1=result[i]["problem"]["rating"];
            let value=mp_for_question_rating.get(result[i]["problem"]["rating"]);
            question_rating.push({
                [tag1]:value,
            })
           
            mp_for_question_rating.set(result[i]["problem"]["rating"], -1);
        }
    }
    // question_rating.sort(function(a, b) { 
        
    //     return a - b;
    // });
    for(let i in question_rating){
        console.log(question_rating[i]);
    }

    // <<<=========== rating ==============>>>



}

user_status()

// console.log("hello")