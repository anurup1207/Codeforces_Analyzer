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





         // <<<=========== tags ==============>>>
         var contestidindex = result[i]["problem"]["contestId"]
         contestidindex += result[i]["problem"]["index"]
         var ifOK= result[i]["verdict"]
         if(ifOK=='OK'){
            
            if(mp_for_unique_question.has(contestidindex)==false){
                var alltags=result[i]["problem"]["tags"];
                for(let j in alltags){
                    if (mp_for_tags.has(alltags[j]))
                    mp_for_tags.set(alltags[j], mp_for_tags.get(alltags[j]) + 1)
                else
                    mp_for_tags.set(alltags[j], 1)
                }
                mp_for_unique_question.set(contestidindex,1)
            }
         }else{
            // console.log("hello")
         }
          
         // <<<=========== tags ==============>>>
        
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

    for(let i in tags){
        console.log(tags[i]);
    }
    // <<<=========== tags ==============>>>
}

user_status()

// console.log("hello")