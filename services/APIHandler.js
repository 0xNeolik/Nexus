const axios = require('axios')
const keynews = process.env.APINEWS

class APIHandler {
  getFullList = () =>
  {
    return axios.get(
      `https://newsapi.org/v2/everything?q=videogames&sortBy=popularity&pageSize=3&apiKey=${keynews}`
    );
  }
}

module.exports = APIHandler