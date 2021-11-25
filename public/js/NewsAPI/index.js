const newsAPI = new APIHandler();

newsAPI
  .getFullList()
  .then((res) => {
    const newsCard = document.querySelector("#news-container");

    let newsInfo = "";
    res.data.articles.reverse().forEach((news) => {
      newsInfo += `<a href="${news.url}">
        <div class='col-3'>
            <div class="card border-0">
            <img src="${news.urlToImage}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5></a>
                <p class="card-text">${news.description}</p>
            </div>
         </div>
        </div>`;
    });

    newsCard.innerHTML = newsInfo;
    console.log(newsCard);
  })
  .catch((err) => console.log(err));
