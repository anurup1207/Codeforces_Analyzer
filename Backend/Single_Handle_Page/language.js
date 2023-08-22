const res = require('../fetch');

async function language(result) {
//   let response = await res.user_status();
// //   console.log(response);

//   let result = response["result"];

 
  let mp_for_language = new Map();

  for (let i in result) {
    // <<<=========== language ==============>>>
    if (mp_for_language.has(result[i]["programmingLanguage"]))
      mp_for_language.set(result[i]["programmingLanguage"], mp_for_language.get(result[i]["programmingLanguage"]) + 1);
    else
      mp_for_language.set(result[i]["programmingLanguage"], 1);

   
  }

  // <<<=========== language ==============>>>
  const languages = {};
  for (let i in result) {
    if (mp_for_language.get(result[i]["programmingLanguage"]) != -1) {
      let tag1 = result[i]["programmingLanguage"];
      let value = mp_for_language.get(result[i]["programmingLanguage"]);
      // languages.push({
      //   [tag1]: value,
      // });
      languages[tag1]=value,
      mp_for_language.set(result[i]["programmingLanguage"], -1);
    }
  }
  return languages;
  // <<<=========== language ==============>>>

 
}

// language();
module.exports={language}
