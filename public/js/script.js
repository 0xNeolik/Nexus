const userIDforNews = document.getElementById("userID")

document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("Nexus JS imported successfully!");
  },
  false
);

if(userIDforNews.value){
  document.getElementById("news-change-class").classList.replace("quarter-section","quarter-section-full");
}


