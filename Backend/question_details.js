const res = require('./fetch');

async function question_details() {
  let response = await res.user_status();
//   console.log(response);

  let result = response["result"];
  result.reverse();

 
  let mp_for_tried_questions = new Map();
  let mp_for_solved_questions = new Map();
  let mp_for_attempt_to_each_questions= new Map();
  let mp_for_ifOk= new Map();

  for (let i in result) {
    let contestidindex = result[i]["problem"]["contestId"]
    contestidindex += "-"
    contestidindex += result[i]["problem"]["index"]
    // console.log(contestidindex)
    let ifOK= result[i]["verdict"]
    if(mp_for_ifOk.has(contestidindex)==false){
        

            if (mp_for_attempt_to_each_questions.has(contestidindex))
                mp_for_attempt_to_each_questions.set(contestidindex, mp_for_attempt_to_each_questions.get(contestidindex) + 1);
            else
                mp_for_attempt_to_each_questions.set(contestidindex, 1);
             
            // mp_for_solved_questions.set(contestidindex,1)
       
        if(ifOK=='OK'){
            mp_for_ifOk.set(contestidindex,1);
            mp_for_solved_questions.set(contestidindex,1);
        }
    }
    mp_for_tried_questions.set(contestidindex,1);

   

   
  }


  let max_attempt=0;
  let max_question_name;
  let attempt_one=0;
  let contestid;
  let index;
  const attempt_to_each_question = [];
  for (let i in result) {
    let contestidindex = result[i]["problem"]["contestId"]
    contestidindex += "-"
    contestidindex += result[i]["problem"]["index"]
    if (mp_for_attempt_to_each_questions.get(contestidindex) != -1) {
      let tag1 = contestidindex;
      let value = mp_for_attempt_to_each_questions.get(contestidindex);
      if(value==1){
        attempt_one++;
      }
      if(value > max_attempt){
        max_attempt=value
        max_question_name=tag1
        contestid=result[i]["problem"]["contestId"]
        index=result[i]["problem"]["index"]
      }
      attempt_to_each_question.push({
        [tag1]: value,
      });
      mp_for_attempt_to_each_questions.set(contestidindex, -1);
    }
  }
     
    let question_details=[]
    question_details.push({
        "tried": mp_for_tried_questions.size,
    });
    question_details.push({
        "solved": mp_for_solved_questions.size,
    })
    question_details.push({
        "max-attempt" : max_attempt,
        "problem-name" : max_question_name,
        "link" : `https://codeforces.com/contest/${contestid}/problem/${index}`,
    })
    question_details.push({
         "Solved with one submission" : attempt_one,
    })
    let average1=result.length/mp_for_solved_questions.size;
    let average2=average1.toFixed(2);

    question_details.push({
        "average" : average2,
    })
    for(let i in question_details){
        console.log(question_details[i])
    }
  

 
}

question_details();
