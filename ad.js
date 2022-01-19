//ad-itple 클래스를 가진 div 태그를 다 가져와서 배열로 저장한다.
let adElementArr = [...document.querySelectorAll(".ad-itple")];

loadAd("ad.json");
//광고를 만드는 함수를 만든다.
async function loadAd(url) {
  let res = await fetch(url);
  let adData = await res.json();
  //광고div의 data-에서 type, category 순으로 찾는다.
  adElementArr.forEach((element) => {
    //element는 광고div다.
    //빈 배열을 만든다.
    let adTypeArr = [];
    //같은 타입 중에서 같은 category를 넣는다.
    //빈 배열을 만든다.
    let adCategoryArr = [];
    //ad는 광고json 데이터다
    adData.forEach((ad) => {
      //data-type과 같은 것이 있는지 확인한다.
      if (element.dataset.type == ad.type) {
        //같은 것이 있으면 추가한다.
        adTypeArr.push(ad);
      }
    });
    //여기 까지는 type을 정한 것이다.
    //만약 adTypeArr에 원소가 있다면 category가 있는지 확인한다.
    //광고를 만들 수 있을 때만 광고를 만든다.
    let isAd = false;
    if (adTypeArr.length > 0) {
      //같은 type에서 같은 category를 찾는다.
      adTypeArr.forEach((type) => {
        if (element.dataset.category == type.category) {
          //원하는 광고를 찾으면 배열에 추가한다.
          //isAd를 true로 바꾼다.
          adCategoryArr.push(type);
          isAd = true;
        }
      });
    }
    if(isAd){
      //광고를 하나 고른다.
      let adChoice = adCategoryArr[randomIdx(adCategoryArr)];    
      //url를 3등분으로 나눈다.
      let url = adChoice.url;
      let url1, url2, url3;
      let slice = Math.ceil(url.length / 3);
      url1 = url.substring(0, slice);
      url2 = url.substring(slice, slice * 2);
      url3 = url.substring(slice * 2);
      //element는 광고div를 말한다.
      //type에 따라서 클래스를 추가한다.
      element.classList.add(adChoice.type);
      element.dataset.url1 = url1;
      element.dataset.url2 = url2;
      element.dataset.url3 = url3;     
      //img가 나오는 부분을 div를 만든다.
      let imgElement = document.createElement("div");
      //ad-img라고 클래스를 만든다.
      imgElement.className = "ad-img";
      //배경화면을 정한다.
      imgElement.style.backgroundImage = `url(${adChoice.src})`;
      element.append(imgElement);
      //necessary가 1이면 글자를 넣어야 하는 경우다.
      //comment로 글자를 만든다.
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

//클릭하면 제휴마케팅으로 새로운 창을 연다.
function clickAd(e){  
  //부모 엘리먼트의 클래스에 ad-itple가 있을 때까지 위로 올라간다.
  let clickElement = e.target;
  while(!clickElement.classList.contains("ad-itple")){
    clickElement = clickElement.parentElement 
  }
  window.open(clickElement.dataset.url1+clickElement.dataset.url2+clickElement.dataset.url3);
}
