const res = require('../fetch');
async function rating_time(result){

    const rating=[]
    for( let i in result){
        contestid=result[i]["contestId"]
        rating_update_time= result[i]["ratingUpdateTimeSeconds"]
        rank = result[i]["rank"]
        old_rating= result[i]["newRating"]
        contest_name= result[i]["contestName"]
        var dummy = new Date(rating_update_time * 1000);
        var day=dummy.getDate()
        var month = dummy.getMonth() + 1
        var year = dummy.getFullYear()

        newdate = year + "/" + month + "/" + day;

        rating.push({
            Contest_name : contest_name,
            Date_of_contest: newdate,
            rating_after_contest:old_rating,
            rank_of_contest: rank,
            link:`https://codeforces.com/contest/${contestid}`

        })

    }
    // console.log(rating)
    return rating;
}

module.exports={rating_time}