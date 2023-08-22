const res = require('../fetch');
async function tags(result){
    // let response = await res.user_status();
    // let result = response["result"];
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
                tags[tag1]=value,
            // })
           
            mp_for_tags.set(alltags[j], -1);
        }
        }
    }
    for(let i in tags){
        if(tags[i]==undefined){
            tags[i]=0;
        }
    }
    return tags
    // console.log(result.length)

    // for(let i in tags){
    //     console.log(tags[i]);
    // }
    // <<<=========== tags ==============>>>
}
// tags();
module.exports={tags}