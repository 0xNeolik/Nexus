document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("Nexus JS imported successfully!");
  },
  false
);

const news = document.getElementById("news-change-class")
const userID = document.getElementById("userID")

if(userID.value){
  news.classList.replace("quarter-section","quarter-section-full");
}


