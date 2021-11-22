//const apiToken = process.env.APINEWS;

class APIHandler {
  constructor() {
    this.axiosApp = axios.create({
      baseURL: `https://gnews.io/api/v4/search?q=videogames&token=bb382de8566152f7304c7b5f84423d40&lang=en`,
    });
  }

  getFullList = () => this.axiosApp.get("/");
}
