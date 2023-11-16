
const fetch1 = require('../fetch');
const { common_questions } = require('./common_questions');
const { rating_time } = require('./common_rating_time');
const { common_contest } = require('./compare_contest_rating');
const { user_submission_status } = require('./contest_details');
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

    let contest_details1= await user_submission_status(result_user_name1_user_contest_details["result"],result_user_name2_user_contest_details["result"]);
    final_self["result"]["contest_details"]=contest_details1;

    let comp_contest_rating= await common_contest(result_user_name1_user_contest_details["result"],result_user_name2_user_contest_details["result"]);
    final_self["result"]["contest_rating"]=comp_contest_rating;

    let common_questions1= await common_questions(result_user_name1_user_status["result"],result_user_name2_user_status["result"]);
    final_self["result"]["common_questions1"]=common_questions1;

    let Rating_time1 = await rating_time(result_user_name1_user_contest_details["result"],result_user_name2_user_contest_details["result"])
    final_self["result"]["rating_time"]=Rating_time1

    // console.log(final_self);
    return final_self;

}

// compare("anurup123aryan","a1akashchauhan")
module.exports={compare}