//const apiToken = process.env.APINEWS;
class APIHandler {
  constructor() {
    this.axiosApp = axios.create({
      baseURL: `https://newsapi.org/v2`,
    });
  }

  getFullList = () =>
    this.axiosApp.get(
      "/everything?q=videogames&sortBy=popularity&pageSize=3&apiKey=92a37ed5eafe4315ab37d6eba1e4fd91"
    );
}
