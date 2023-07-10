const res = require('../fetch');

async function verdict(result){
    // let response = await res.user_status();
    // let result = response["result"];
      let mp_for_verdict = new Map();


  for (let i in result) {
    

    // <<<=========== verdict ==============>>>
    if (mp_for_verdict.has(result[i]["verdict"]))
      mp_for_verdict.set(result[i]["verdict"], mp_for_verdict.get(result[i]["verdict"]) + 1);
    else
      mp_for_verdict.set(result[i]["verdict"], 1);
  }

   // <<<=========== verdict ==============>>>
  const verdict1 = {};
  for (let i in result) {
    if (mp_for_verdict.get(result[i]["verdict"]) != -1) {
      let tag1 = result[i]["verdict"];
      let value = mp_for_verdict.get(result[i]["verdict"]);
      verdict1[tag1]=value,
      mp_for_verdict.set(result[i]["verdict"], -1);
    }
  }
  // console.log(verdict1)
  return verdict1
  // <<<=========== verdict ==============>>>
}
module.exports={verdict}