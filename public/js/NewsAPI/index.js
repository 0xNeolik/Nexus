const newsAPI = new APIHandler();

newsAPI
  .getFullList()
  .then((res) => {
    console.log(res.data.articles);
    const newsCard = document.querySelector("#news-container");

    let newsInfo = "";
    res.data.articles.reverse().forEach((news) => {
      newsInfo += `<a href="${news.url}">
        <div class='col-4'>
            <div class="card mt-2 border-0">
            <img src="${news.image}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5></a>
                <p class="card-text">${news.description}</p>
            </div>
         </div>
        </div>`;
    });

    newsCard.innerHTML = newsInfo;
  })
  .catch((err) => console.log(err));
