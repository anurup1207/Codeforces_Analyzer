async function user_status_handle1() {
    
        
        const user_name="anurup123aryan"
        const api=`https://codeforces.com/api/user.status?handle=${user_name}&from=1`
        let response=await fetch(api)
        response = await response.json();
        return response;
    
   
}    

async function user_status_handle2() {
    
        
    const user_name="a1akashchauhan"
    const api=`https://codeforces.com/api/user.status?handle=${user_name}&from=1`
    let response=await fetch(api)
    response = await response.json();
    return response;


}   

module.exports={user_status_handle1,user_status_handle2}