const API_KEY = "AIzaSyBw_4nJ13fkX1Wk32xuq8jJgvg8M_6sUmY";
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search'
const axios = require('axios');


const vid = async (lang) => {
    try {
        let res = await axios.get(`${BASE_URL}`, {params: {
            'part': 'snippet', 'q': `${lang} tutorial`, 'maxResults': 6, 'type': 'video',
            'key': API_KEY, videoEmbeddable: true
        }} ) 
        return res.data.items 
        } catch (error) {
        console.log(error.response.data.error);
    }
}


module.exports = {vid}
