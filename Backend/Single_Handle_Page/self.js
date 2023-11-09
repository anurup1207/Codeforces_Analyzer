const fetch1 = require('../fetch');
const  question_rating = require('./questions_rating');
const  question_details = require('./question_details');
const  lev = require('./level');
const tag = require('./tags');
const unsol = require('./unsolved');
// const tag= 
const ver = require('./verdict');
const lan = require('./language');
const c_details  = require('./contest_details');
const rating_d = require('./rating_time');





async function self (user_name){
       
    let result_user_status=await fetch1.user_status(user_name);
    
    let result_user_contest_details=await fetch1.user_contest_details(user_name);
    if(result_user_contest_details["status"]!='OK' || result_user_status["status"]!='OK'){
        return {"status" : "NOT OK"};
    }
    let final_self={}
    final_self["status"]="OK"
    final_self["result"]={}
    


    verdict=await ver.verdict(result_user_status["result"]);
    final_self["result"]["verdict"]=verdict;

    unsolve= await unsol.unsolved(result_user_status["result"]);
    final_self["result"]["unsolved"]=unsolve;

    tags=await tag.tags(result_user_status["result"]);
    final_self["result"]["tags"]=tags;

    q_rating= await question_rating.question_rating(result_user_status["result"]);
    final_self["result"]["question_rating"]=q_rating;

    q_details= await question_details.question_details(result_user_status["result"]);
    final_self["result"]["question_details"]=q_details;

    level= await lev.level(result_user_status["result"]);
    final_self["result"]["level"]=level;

    language= await lan.language(result_user_status["result"]);
    final_self["result"]["language"]=language;

    contest_details= await c_details.contest_details(result_user_contest_details["result"]);
    final_self["result"]["contest_details"]=contest_details;

    Rating_time= await rating_d.rating_time(result_user_contest_details["result"]);
    final_self["result"]["rating_time"]=Rating_time;

    return final_self;
    // console.log(final_self)
  
    

}
// self("anurup123aryan")
module.exports={self}