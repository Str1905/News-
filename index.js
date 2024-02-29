      
      window.addEventListener("load", () => fetchNews(1,"sports"));

function reload() {
    window.location.reload();
}
      const fetchNews = async (page,query) => {
            console.log(query);
            var url = 'https://newsapi.org/v2/everything?' +
                'q=' + query +
                '&from=2024-02-22&' +
                'pageSize=30&' +
                'page='+ page +
                '&sortBy=popularity&apiKey=706f17cb59914911b8303b331fb60d81';
            var req = new Request(url);
            let a = await fetch(req);
            let response = await a.json();
            bindData(response.articles);
        }
           


function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}


// event lisner

let search = document.getElementById("search-button")
let searchInput = document.getElementById("search-text");


search.addEventListener("click",(e)=>{
  console.log("serach clicked")
      let query = searchInput.value;
      console.log(query);
      if(query){
        fetchNews(1,query);
      }
      else{
        console.log("enter some value");
      }
     
})

const listofitem = document.getElementsByClassName("listofitem");
console.log(listofitem);


for(let list of listofitem){
 
    list.addEventListener("click",()=>{
        let query = list.innerHTML;
        if(query){
            fetchNews(1,query);
        }
    }
    )  
}

