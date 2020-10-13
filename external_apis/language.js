const axios = require('axios')
// const librarianApi = require('librarian-api');

const BASE_URL = 'https://libraries.io/api'

const API_KEY = '72a4126ffde3661c036a8246ccd675f5'


const library = async () => {
    let res
    try {
        res = await axios.get(`${BASE_URL}/github/golang?api_key=${API_KEY}`)
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }

}

library()
// console.log(librarianApi('javascript'))

// export LIBRARIES_IO_TOKEN=API_KEY