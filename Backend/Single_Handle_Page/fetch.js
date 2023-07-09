async function user_status(username) {
    // try{
        
        let user_name=username;
        let api=`https://codeforces.com/api/user.status?handle=${user_name}&from=1`
        let response=await fetch(api)
       
        response = await response.json();
        // if(response["status"]!='OK'){
        //     return [];
        // }
        // let count =Object.keys(response["result"]).length;
        // console.log(response["result"]);
       
        
        return response;
    // }catch(e){
    //     console.log("Error detected");
    //     return;

    // }
   
}    

async function user_contest_details(username){
    const user_name=username
    const api=`https://codeforces.com/api/user.rating?handle=${user_name}`
    let response=await fetch(api)
    response = await response.json();
    // if(response["status"]!='OK'){
    //     return [];
    // }
  
    return response;
}


module.exports={user_status,user_contest_details}