async function user_status() {
    // try{
        const user_name="anurup123aryan"
        const api=`https://codeforces.com/api/user.status?handle=${user_name}&from=1`
        let response=await fetch(api)
        response = await response.json();
        return response;
    // }catch(e){
    //     console.log("Error detected");
    //     return;

    // }
   
}    

async function user_contest_details(){
    const user_name="anurup123aryan"
    const api=`https://codeforces.com/api/user.rating?handle=${user_name}`
    let response=await fetch(api)
    response = await response.json();
    return response;
}


module.exports={user_status,user_contest_details}