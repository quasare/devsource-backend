const axios = require('axios')

const BASE_URL = 'https://programming-quotes-api.herokuapp.com'

const joke = async () => {
    let res
    try {
    res = await axios.get(`${BASE_URL}/quotes/random`)
        return res.data
    } catch (error) {
        console.log(error.response.data);   
    }
    return await res.data
}

module.exports = {joke}

