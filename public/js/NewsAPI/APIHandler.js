//const apiToken = process.env.APINEWS;

class APIHandler {
  constructor() {
    this.axiosApp = axios.create({
      baseURL: `https://gnews.io/api/v4/search?q=videogames&token=-----Key-----&lang=en`,
    });
  }

  getFullList = () => this.axiosApp.get("/");
}
