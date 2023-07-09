const fetch1 = require('./fetch');
const  question_rating = require('./questions_rating');
const  question_details = require('./question_details');
const  lev = require('./level');
const tag = require('./tags');
const unsol = require('./unsolved');
// const tag= 
const ver = require('./verdict');
const lan = require('./language');
const c_details  = require('./contest_details');





async function self (user_name){
       
    let result_user_status=await fetch1.user_status(user_name);
    
    let result_user_contest_details=await fetch1.user_contest_details(user_name);
    let final_self={}
    


    verdict=await ver.verdict(result_user_status["result"]);
    final_self["verdict"]=verdict;

    unsolve= await unsol.unsolved(result_user_status["result"]);
    final_self["unsolved"]=unsolve;

    tags=await tag.tags(result_user_status["result"]);
    final_self["tags"]=tags;

    q_rating= await question_rating.question_rating(result_user_status["result"]);
    final_self["question_rating"]=q_rating;

    q_details= await question_details.question_details(result_user_status["result"]);
    final_self["question_details"]=q_details;

    level= await lev.level(result_user_status["result"]);
    final_self["level"]=level;

    language= await lan.language(result_user_status["result"]);
    final_self["language"]=language;

    contest_details= await c_details.contest_details(result_user_contest_details["result"]);
    final_self["contest_details"]=contest_details;

    return final_self;
    // console.log(final_self)
  
    

}
// self("anurup123aryan")
module.exports={self}