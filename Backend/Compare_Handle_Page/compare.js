const fetch1 = require('../fetch');
const { level } = require('./level');
const { user_question_details } = require('./question_details');
const {question_rating}  = require('./question_rating');
const {tags}= require('./tags');
const { tried_not_solved} = require('./tried_not_solved');



async function compare(user_name1,user_name2){
    let result_user_name1_user_status=await fetch1.user_status(user_name1);
    let result_user_name2_user_status=await fetch1.user_status(user_name2);
    
    let result_user_name1_user_contest_details=await fetch1.user_contest_details(user_name1);
    let result_user_name2_user_contest_details=await fetch1.user_contest_details(user_name2);

    if(result_user_name1_user_contest_details["status"]!='OK' || result_user_name1_user_status["status"]!='OK'){
        return {"status" : "NOT OK"};
    }
    if(result_user_name2_user_contest_details["status"]!='OK' || result_user_name2_user_status["status"]!='OK'){
        return {"status" : "NOT OK"};
    }

    let final_self={}
    final_self["status"]="OK"
    final_self["result"]={}

    let tried_not_solved1=await tried_not_solved(result_user_name1_user_status["result"],result_user_name2_user_status["result"]);
    final_self["result"]["tried_not_solved"]=tried_not_solved1;

    let tag= await tags(result_user_name1_user_status["result"],result_user_name2_user_status["result"]);
    final_self["result"]["tags"]=tag;

    let q_rating= await question_rating(result_user_name1_user_status["result"],result_user_name2_user_status["result"]);
    final_self["result"]["question_rating"]=q_rating;

    let q_details= await user_question_details(result_user_name1_user_status["result"],result_user_name2_user_status["result"]);
    final_self["result"]["question_details"]=q_details;

    let level1= await level(result_user_name1_user_status["result"],result_user_name2_user_status["result"]);
    final_self["result"]["level"]=level1;

    console.log(final_self);
    return final_self;

}

// compare("anurup123aryan","a1akashchauhan")
module.exports={compare}