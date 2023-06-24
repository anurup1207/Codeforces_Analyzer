async function user_status() {
    const user_name="anurup123aryan"
    const api=`https://codeforces.com/api/user.status?handle=${user_name}&from=1`
    let response=await fetch(api)
    response = await response.json()
    // console.log(response)
    // let response_length=Object.keys(response).length
    // console.log(response_length)
    // for(let i=0;i<response.size)
    var result = [];
    var result = response["result"];
    // console.log(result[0]["problem"]);
    var mp_for_verdict = new Map();
    for(var i in result){


        // <<<=========== verdict ==============>>>

        if (mp_for_verdict.has(result[i]["verdict"]))
        mp_for_verdict.set(result[i]["verdict"], mp_for_verdict.get(result[i]["verdict"]) + 1)
    else
        mp_for_verdict.set(result[i]["verdict"], 1)

       // <<<=========== verdict ==============>>>
        
    }
    const verdict=[];
    for(var i in result){
        if (mp_for_verdict.get(result[i]["verdict"]) != -1) {
            let tag1=result[i]["verdict"];
            let value=mp_for_verdict.get(result[i]["verdict"]);
            verdict.push({
                id:tag1,
                values:value,
            })
           
            mp_for_verdict.set(result[i]["verdict"], -1);
        }
    }
    for(let i in verdict){
        console.log(verdict[i]);
    }
}

user_status()

// console.log("hello")