const axios = require('axios')

const BASE_URL = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?"

const quote = async () => {
    let res 
    try {
        res = await axios.get(`${BASE_URL}`)
        return res.data
    } catch (error) {
        return error.response.data
    }   
}

module.exports = {quote}