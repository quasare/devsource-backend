const axios = require('axios')

const { Octokit } = require("@octokit/rest");


const API_KEY = '8eef5bba3468782bfe28dd8424f14d55e8f1112d'

const octokit = new Octokit({
    auth: API_KEY,
  });

let gh = async (lang) => {
    let res = await octokit.search.repos({
        q: `${lang}+awesome`,
        per_page: 3
    })
    return res.data.items[0]
}





module.exports = {gh}