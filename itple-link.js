// 배열에서 랜덤한 인덱스를 뽑는 함수다.
function randomIdx(arr) {
  return Math.floor(Math.random() * arr.length);
}
// 공통
// window.open을 사용해서 저품질 걱정하지 않고 사용한다.

// 1. 원하는 곳에 광고와 링크가 나오게 한다.
// 원하는 category와 원하는 type을 정할 수 있다.
// 크기가 정해진 곳에 사용한다.
// 임영웅 퀴즈 게임과 같이 크기가 정해진 곳에 사용한다.
// 사진 전체가 정해진 크기게 나올 수 있게 한다.
// ad-site 클래스를 가진 div 태그를 다 가져와서 배열로 저장한다.
let adElementArr = [...document.querySelectorAll(".ad-site")];
if( adElementArr.length > 0){
  loadAd(
    "https://opensheet.elk.sh/1JnCOruPQKp9juaxckms-YTyp6CRgbdPbFr1Ocw59seQ/ad"
  );
}
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
      //ok가 1이면 확인한다.
      if (ad.ok == "1") {
        //data-type과 같은 것이 있는지 확인한다.
        if (element.dataset.type == ad.type) {
          adTypeArr.push(ad);
        }
      }
    });
    //여기 까지는 type을 정한 것이다.
    //만약 adTypeArr에 원소가 있다면 category가 있는지 확인한다.
    //광고를 만들 수 있을 때만 광고를 만든다.
    if (adTypeArr.length > 0) {
      //같은 type에서 같은 category를 찾는다.
      adTypeArr.forEach((type) => {
        if (element.dataset.category == type.category) {
          //원하는 광고를 찾으면 배열에 추가한다.
          adCategoryArr.push(type);
        }
      });
    }
    if (adCategoryArr.length > 0) {
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
      // necessary가 1이면 글자를 넣어야 하는 경우다.
      // comment로 글자를 만든다.
      if (adChoice.necessary == "1") {
        let commentElement = document.createElement("p");
        commentElement.innerText = adChoice.comment;
        element.append(commentElement);
      }
      element.addEventListener("click", clickAd);
    }
  });
}
//클릭하면 새로운 창을 연다.
function clickAd(e) {
  //부모 엘리먼트의 클래스에 ad-site가 있을 때까지 위로 올라간다.
  let clickElement = e.target;
  while (!clickElement.classList.contains("ad-site")) {
    clickElement = clickElement.parentElement;
  }
  window.open(
    clickElement.dataset.url1 +
      clickElement.dataset.url2 +
      clickElement.dataset.url3
  );
}
// 2. 블로그에서 사용하는 링크와 광고 클릭
// 링크와 광고를 다 같이 만든다.
// 여러 종류를 사용해서 만든다.
// 이미지를 사용해서 만든다.
// 어떤 span#category를 사용해서 만든다.
// 그 페이지에 있는 것은 모두 같은 카테고리에 있는 링크가 나오도록 한다.
let categoryElement = document.querySelector("#category");
let linkElementArr = [...document.querySelectorAll(".ad-link")];
let linkData;
let linkCategoryArr = [];
let linkElement;
let linkChoice;
// categoryElement가 있으면 만든다.
if (categoryElement.length > 0) {
  loadLink(
    "https://opensheet.elk.sh/1JnCOruPQKp9juaxckms-YTyp6CRgbdPbFr1Ocw59seQ/link"
  );
}
//광고를 만드는 함수를 만든다.
async function loadLink(url) {
  let res = await fetch(url);
  linkData = await res.json();
  //광고div의 data-에서 type, category 순으로 찾는다.
  linkElementArr.forEach((element) => {
    //element는 빈 링크 div다.
    //ad는 광고json 데이터다
    linkElement = element;
    linkData.forEach((link) => {
      //ok가 1이면 확인한다.
      if (link.ok == "1") {
        //data-category과 같은 것이 있는지 확인한다.
        if (categoryElement.dataset.category == link.category) {
          linkCategoryArr.push(link);
        }
      }
    });
    // 광고를 다 확인한 뒤에 category와 맞는 것이 있는지 확인한다.
    if (linkCategoryArr.length > 0) {
      makeLink(linkCategoryArr);
    } else {
      // category에 맞는 것이 없다면
      // 그냥 하나 만든다.
      makeLink();
    }
    linkElement.addEventListener("click", clickLink);
  });
}

function makeLink(arr = "anything") {
  // 광고가 있으면 보이게 한다.
  linkElement.classList.add("active");
  // 광고를 하나 고른다.
  if (arr != "anything") {
    linkChoice = arr[randomIdx(arr)];
  } else {
    // category와 아무것도 맞는 것이 없다면 아무거나 하나 고른다.
    linkChoice = linkData[randomIdx(linkData)];
  }
  //url를 3등분으로 나눈다.
  let url = linkChoice.url;
  let url1, url2, url3;
  let slice = Math.ceil(url.length / 3);
  url1 = url.substring(0, slice);
  url2 = url.substring(slice, slice * 2);
  url3 = url.substring(slice * 2);
  linkElement.dataset.url1 = url1;
  linkElement.dataset.url2 = url2;
  linkElement.dataset.url3 = url3;
  selectLinkType();
}
// 랜덤하게 type을 선택한다.
let linkTypeArr = [linkType1, linkType2, linkType3];
let squareTypeArr = [linkType1, linkType2];
function selectLinkType() {
  let typeChoice = linkTypeArr[randomIdx(linkTypeArr)];
  // type을 선택했는데 square가 없는 경우
  if (typeChoice == linkType1) {
    if (linkChoice.square == "0") {
      typeChoice = linkType3;
    }
  } else if (typeChoice == linkType2) {
    if (linkChoice.square == "0") {
      typeChoice = linkType3;
    }
  }
  // type을 선택했는데 wide가 없는 경우를 나눈다.
  if (typeChoice == linkType3) {
    if (linkChoice.wide == "0") {
      typeChoice = squareTypeArr[randomIdx(squareTypeArr)];
    }
  }
  typeChoice();
}
// type1는 square 사진을 쓴다.
// 왼쪽에 색깔바가 있다.
// square 사진은 img가 아니라 background-img를 쓴다.
function linkType1() {
  // bg과 color를 가져온다.
  // 0이면 기본값으로 만든다.
  let bg = linkChoice.bg;
  let color = linkChoice.color;
  if (bg == "0") {
    bg = "#3db39e";
  }
  if (color == "0") {
    color = "#fff";
  }
  // img가 나오는 부분을 div를 만든다.
  let imgElement = document.createElement("div");
  // ad-img라고 클래스를 만든다.
  imgElement.className = "link-img";
  // 배경화면을 정한다.
  imgElement.style.backgroundImage = `url(${linkChoice.square})`;
  // linkElement에 추가한다.
  linkElement.append(imgElement);
  // summary를 만든다.
  let summaryElement = document.createElement("div");
  summaryElement.className = "link-summary";
  summaryElement.innerHTML = `  
  <div class="title-container type1">
    <p class="title">
      ${linkChoice.title}      
    </p>
    <div class="line" style="background-color:${bg};"></div>
  </div>   
  <div class="btn-open type1" style="background-color:${bg}; color:${color}">
    열기
  </div>
  `;
  // <p class="comment">${linkChoice.comment}</p>로 하면 줄바꿈이 안 된다.
  if (linkChoice.comment != "0") {
    let commentElement = document.createElement("p");
    commentElement.className = "comment";
    commentElement.innerText = linkChoice.comment;
    summaryElement.append(commentElement);
  }
  // linkElement에 추가한다.
  linkElement.append(summaryElement);
}
// type2는 square 사진을 쓴다.
// pc 화면에서 타이틀을 보이지 않는다.
function linkType2() {
  // img가 나오는 부분을 div를 만든다.
  let imgElement = document.createElement("div");
  // ad-img라고 클래스를 만든다.
  imgElement.className = "link-img";
  // 배경화면을 정한다.
  imgElement.style.backgroundImage = `url(${linkChoice.square})`;
  // linkElement에 추가한다.
  linkElement.append(imgElement);
  // summary를 만든다.
  let summaryElement = document.createElement("div");
  summaryElement.className = "link-summary";
  summaryElement.innerHTML = `  
   <div class="title-container type2">
     <p class="title">
       ${linkChoice.title}      
     </p>    
   </div>    
   <div class="btn-open type2">
     열기
   </div>
   `;
  if (linkChoice.comment != "0") {
    let commentElement = document.createElement("p");
    commentElement.className = "comment";
    commentElement.innerText = linkChoice.comment;
    summaryElement.append(commentElement);
  }
  // linkElement에 추가한다.
  linkElement.append(summaryElement);
}
// type3는 wide 사진을 쓴다.
// wide는 이미지를 쓴다.
function linkType3() {
  // .ad-link에 wide 클래스를 추가한다.
  linkElement.classList.add("wide");
  // 이미지를 만든다.
  let imgContainerElement = document.createElement("div");
  imgContainerElement.className = "img-container";
  imgContainerElement.innerHTML = `
  <img class="link-img-wide" src="${linkChoice.wide}" alt="${linkChoice.title}"/>  
  `;
  linkElement.append(imgContainerElement);
  let summaryElement = document.createElement("div");
  summaryElement.className = "link-summary type3";
  summaryElement.innerHTML = `    
   <p class="comment">${linkChoice.comment}</p>
   <div class="btn-open type3">
     열기
   </div>
   `;
  // linkType3은 줄바꿈이 없다.
  // linkElement에 추가한다.
  linkElement.append(summaryElement);
}
//클릭하면 제휴마케팅으로 새로운 창을 연다.
function clickLink(e) {
  //부모 엘리먼트의 클래스에 ad-link가 있을 때까지 위로 올라간다.
  let clickElement = e.target;
  while (!clickElement.classList.contains("ad-link")) {
    clickElement = clickElement.parentElement;
  }
  window.open(
    clickElement.dataset.url1 +
      clickElement.dataset.url2 +
      clickElement.dataset.url3
  );
}
// 3. 제휴 마케팅이다.
// 정해진 곳에 원하는 상품을 골라서 넣을 수 있다.
// 정사각형 광고가 있고, 직사각형 광고가 있다.
// af-link 클래스를 가진 div 태그를 다 가져와서 배열로 저장한다.
// blog-link도 여기서 사용한다.
let afElementArr = [...document.querySelectorAll(".af-link")];
let afElement;
let afChoice;

if ( afElementArr.length > 0){
  loadAf(
    "https://opensheet.elk.sh/1JnCOruPQKp9juaxckms-YTyp6CRgbdPbFr1Ocw59seQ/af"
  );
}
//제휴링크를 만드는 함수를 만든다.
async function loadAf(url) {
  let res = await fetch(url);
  let afData = await res.json();
  //광고div의 data-에서 type, category 순으로 찾는다.
  afElementArr.forEach((element) => {
    afData.forEach((af) => {
      let isAf = false;
      //ok가 1이면 확인한다.
      if (af.ok == "1") {
        //data-name, 즉 이름이 같은 것이 있는지 확인한다.
        if (element.dataset.name == af.name) {
          isAf = true;
          afElement = element;
          // 있으면 af를 선택한다.
          afChoice = af;
        }
        //제휴마케팅 링크가 있다면
        if (isAf) {
          makeAf();
        }
      }
    });
    //클릭 이벤트를 등록한다.
    afElement.addEventListener("click", clickAf);
  });
}

function makeAf() {
  afElement.classList.add("active");
  //url를 만든다.
  let url = afChoice.url;
  let url1, url2, url3;
  let slice = Math.ceil(url.length / 3);
  url1 = url.substring(0, slice);
  url2 = url.substring(slice, slice * 2);
  url3 = url.substring(slice * 2);
  //afElement는 제휴div를 말한다.
  afElement.dataset.url1 = url1;
  afElement.dataset.url2 = url2;
  afElement.dataset.url3 = url3;
  afType1();
}

function afType1() {
  // img가 나오는 부분을 div를 만든다.
  let imgElement = document.createElement("div");
  // link-img라고 클래스를 만든다.
  imgElement.className = "link-img";
  // 배경화면을 정한다.
  imgElement.style.backgroundImage = `url(${afChoice.src})`;
  // afElement에 추가한다.
  afElement.append(imgElement);
  // summary를 만든다.
  let summaryElement = document.createElement("div");
  summaryElement.className = "link-summary";
  summaryElement.innerHTML = `  
  <div class="title-container type1">
    <p class="title">
      ${afChoice.title}      
    </p>   
  </div>
  <div class="btn-open">
    열기
  </div>
  `;
  if (afChoice.comment != "0") {
    let commentElement = document.createElement("p");
    commentElement.className = "comment";
    commentElement.innerText = afChoice.comment;
    summaryElement.append(commentElement);
  }
  // afElement에 추가한다.
  afElement.append(summaryElement);
}

//클릭하면 제휴마케팅으로 새로운 창을 연다.
function clickAf(e) {
  //부모 엘리먼트의 클래스에 ad-site가 있을 때까지 위로 올라간다.
  let clickElement = e.target;
  while (!clickElement.classList.contains("af-link")) {
    clickElement = clickElement.parentElement;
  }
  window.open(
    clickElement.dataset.url1 +
      clickElement.dataset.url2 +
      clickElement.dataset.url3
  );
}
