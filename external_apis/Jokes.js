const axios = require('axios')

const BASE_URL = 'https://programming-quotes-api.herokuapp.com'

const joke = async () => {
    let res
    try {
    res = await axios.get(`${BASE_URL}/quotes/random`)
    console.log(res.data);
    } catch (error) {
        console.log(error);   
    }
    return await res.data
}

export default joke

