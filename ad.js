//
let adElementArr = [...document.querySelectorAll(".ad-itple")];

loadAd("ad.json");
async function loadAd(url) {
  let res = await fetch(url);
  let adData = await res.json();
  //type, category 순으로 찾는다.
  adElementArr.forEach((element) => {
    //같은 타입을 넣는다.
    let adTypeArr = [];
    //같은 타입 중에서 같은 category를 넣는다.
    let adCategoryArr = [];
    adData.forEach((ad) => {
      //data-type과 같은 것이 있는지 확인한다.
      if (element.dataset.type == ad.type) {
        adTypeArr.push(ad);
      }
    });
    //만약 adTypeArr에 있다면 거기에서 고른다.
    //여기 까지는 type을 정한 것이다.
    let isAd = false;
    if (adTypeArr.length > 0) {
      adTypeArr.forEach((type) => {
        if (element.dataset.category == type.category) {
          //원하는 광고를 찾았다.
          adCategoryArr.push(type);
          isAd = true;
        }
      });
    }
    if(isAd){
      let adChoice = adCategoryArr[randomIdx(adCategoryArr)];    
      let url = adChoice.url;
      let url1, url2, url3;
      let slice = Math.ceil(url.length / 3);
      url1 = url.substring(0, slice);
      url2 = url.substring(slice, slice * 2);
      url3 = url.substring(slice * 2);
      //element는 div를 말한다.
      element.classList.add(adChoice.type);
      element.dataset.url1 = url1;
      element.dataset.url2 = url2;
      element.dataset.url3 = url3;
      console.l
      let imgElement = document.createElement("div");
      imgElement.className = "ad-img";
      imgElement.style.backgroundImage = `url(${adChoice.src})`;
      element.append(imgElement);
      if (adChoice.necessary == 1) {      
        let commentElement = document.createElement("p");
        commentElement.innerText = adChoice.comment;
        element.append(commentElement);
      }    
      element.addEventListener("click", clickAd);
    }    
  });
}

function randomIdx(arr) {
  return Math.floor(Math.random() * arr.length);
}

function clickAd(e){  
  //부모 엘리먼트의 클래스에 ad-itple가 있을 때까지 위로 올라간다.
  let clickElement = e.target;
  while(!clickElement.classList.contains("ad-itple")){
    clickElement = clickElement.parentElement 
  }
  window.open(clickElement.dataset.url1+clickElement.dataset.url2+clickElement.dataset.url3);
}
