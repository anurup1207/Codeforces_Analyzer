const rating_t = require('../Single_Handle_Page/rating_time');
async function rating_time(result_handle1,result_handle2){
    
    rating_time_handle1 = await rating_t.rating_time(result_handle1)
    rating_time_handle2 = await rating_t.rating_time(result_handle2)
    let rating={
        handle1 : rating_time_handle1,
        handle2 : rating_time_handle2,
    }
    
    
    return rating;
}

module.exports={rating_time}