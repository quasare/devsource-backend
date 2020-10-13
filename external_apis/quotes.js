const axios = require('axios')

const BASE_URL = "http://api.forismatic.com/api/1.0"

const quote = async () => {
    let res 
    try {
        res = await axios.get(`${BASE_URL}/`)
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }   
}

quote()