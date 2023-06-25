async function user_status() {
    const user_name="anurup123aryan"
    const api=`https://codeforces.com/api/user.status?handle=${user_name}&from=1`
    let response=await fetch(api)
    response = await response.json()
    console.log(response);
    
    var result = [];
    var result = response["result"];
    
    var mp_for_verdict = new Map();
    var mp_for_language= new Map();
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
     for(let i in languages){
         console.log(languages[i]);
     }
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
}

user_status()

// console.log("hello")