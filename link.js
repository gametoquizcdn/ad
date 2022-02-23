function randomIdxArr(arr) {
  return Math.floor(Math.random() * arr.length);
}
// 1. 블로그에서 사용하는 링크와 광고 클릭
// 링크와 광고를 다 같이 만든다.
// 여러 종류를 사용해서 만든다.
// 이미지를 사용해서 만든다.
// id가 category를 사용해서 만든다.
// 어떤 data-category가 있는지 확인한다.
// out은 바깥쪽에 있는 걸로 다른 모양으로 만든다.
// 그 페이지에 있는 것은 모두 같은 카테고리에 있는 링크가 나오도록 한다.
// 링크는 여러 종류로 만든다.
// 랜덤하게 정한다.
// 어떤 이미지의 url이 있는지 확인하고 만든다.
// categoryElement가 없어도 만들어야 한다.
let categoryElement = document.querySelector("#category");
// 카테고리를 저장하는 배열이다.
// 카테고리는 쉼표로 구분한다. 빈 칸을 없애서 사용한다.
// 어떤 카테고리를 사용할지 정한다.
let categoryArr = [];
// ad-link 클래스 있는 걸로 만든다.
let linkElementArr = [...document.querySelectorAll(".ad-link")];
// linkData는 link에 대한 정보를 저장한다.
let linkData;
// link을 넣을 element다.
let linkElement;
// 고른 link다.
let linkChoice;
// 모든 링크를 저장하는 배열이다.
// categoryElement가 없으면 여기에서 랜덤하게 골라서 링크를 만든다.
// 같은 type으로 배열을 정리한다.
// 모든 링크를 저장하는 배열이다.
let squareLinkAllArr = [];
// 맨 위나 아래는 wide 이미지로 만든다.
// 따로 저장한다.
let wideLinkAllArr = [];
let longLinkAllArr = [];
// category에 맞는 링크를 저장하는 배열이다.
let squareLinkArr = [];
// category에 맞는 wide type의 링크를 저장하는 배열이다.
let wideLinkArr = [];
let longLinkArr = [];
// linkElement가 있으면 만든다.
if (linkElementArr.length > 0) {
  loadLink(
    "https://opensheet.elk.sh/1JnCOruPQKp9juaxckms-YTyp6CRgbdPbFr1Ocw59seQ/link"
  );
}

// 링크를 만드는 함수다.
async function loadLink(url) {
  let res = await fetch(url);
  linkData = await res.json();
  // type이 중요하다.
  // type을 따로 배열로 저장하고 거기에서 같은 category가 있는지 확인한다.
  linkSort();
  // categoryElement가 있을 때는 linkCategoryArr와 wideLinkArr에서 만든다.
  // categoryElement가 없을 때는 linkAllArr@@와 wideLinkAllArr에서 만든다.
  makeLink();
}
// 링크를 분류한다.
// 카테고리에 맞는 것을 따로 저장한다.
function linkSort() {
  if (categoryElement) {
    // 쉼표로 구분한다.
    let categorySplit = categoryElement.dataset.category.split(",");
    // categoryArr에 어떤 category의 링크가 나올지 배열로 저장한다.
    // categoryArr가 없다면 빈 칸을 없애고 추가한다.
    categorySplit.forEach((item) => {
      if (!categoryArr.includes(item.trim())) {
        categoryArr.push(item.trim());
      }
    });
  }
  linkData.forEach((link) => {
    // ok 값이 1인 것만 배열에 넣는다.
    if (link.ok == "1") {
      if (link.square != "0") {
        // squareLinkAllArr에 없으면 추가한다.
        if (!squareLinkAllArr.includes(link)) {
          squareLinkAllArr.push(link);
        }
      }
      if (link.wide != "0") {
        // wideLinkAllArr에 없으면 추가한다.
        if (!wideLinkAllArr.includes(link)) {
          wideLinkAllArr.push(link);
        }
      }
      if (link.long != "0") {
        // longLinkAllArr에 없으면 추가한다.
        if (!longLinkAllArr.includes(link)) {
          longLinkAllArr.push(link);
        }
      }
      // 구글 스프레드시트로 광고를 만들 때 category를 여러 개 정할 수 있다.
      // link에 있는 카테고리를 확인하다. 쉼표로 구분한다.
      let linkSplit = link.category.split(",");
      // link 카테고리를 배열로 저장한다.
      let linkArr = [];
      linkSplit.forEach((item) => {
        if (!linkArr.includes(item.trim())) {
          linkArr.push(item.trim());
        }
      });
      // categoryArr에 원소가 있으면
      if (categoryArr.length > 0) {
        // 배열에 있는 것을 하나씩 비교한다.
        linkArr.forEach((item) => {
          // category가 있으면 추가한다.
          if (categoryArr.includes(item)) {
            // 배열에 없으면 포함시킨다.
            if (link.square != "0") {
              if (!squareLinkArr.includes(link)) {
                squareLinkArr.push(link);
              }
            }
            if (link.wide != "0") {
              if (!wideLinkArr.includes(link)) {
                wideLinkArr.push(link);
              }
            }
            if (link.long != "0") {
              if (!longLinkArr.includes(link)) {
                longLinkArr.push(link);
              }
            }
          }
        });
      }
    }
  });
}

function makeLink() {
  // linkElementArr 배열로 링크를 만든다.
  // categoryElement가 있을 때는 linkCategoryArr와 wideLinkArr에서 만든다.
  // categoryElement가 없을 때는 linkAllArr@@와 wideLinkAllArr에서 만든다.
  linkElementArr.forEach((element) => {
    linkElement = element;
    // active 클래스를 추가한다.
    linkElement.classList.add("active");
    selectLinkType();
    linkElement.addEventListener("click", clickLink);
  });
}

// long type은 data-type을 long으로 정한다.
let wideType = ["square", "wide"];
// wideTypeChoice에 따라서 다른 링크를 만든다.
let wideTypeChoice;
let longType = ["square", "long"];
let longTypeChoice;

function selectLinkType() {
  if (linkElement.classList.contains("out")) {
    // categoryElement가 있다면
    if (categoryElement) {
      if (wideLinkArr.length > 0) {
        linkChoice = wideLinkArr[randomIdxArr(wideLinkArr)];
      } else {
        // 모든 wide type에서 링크를 하나 고른다.
        linkChoice = wideLinkAllArr[randomIdxArr(wideLinkAllArr)];
      }
    }
    // categoryElement가 없다면
    else {
      linkChoice = wideLinkAllArr[randomIdxArr(wideLinkAllArr)];
    }
    makeUrl();
    linkWideType2();
  } else {
    // out 클래스가 없다면 여러 가지 type의 링크를 만들 수 있다.
    // categoryElement의 data-type이 long이 아니라면 wide에서 광고를 만든다.
    if (categoryElement.dataset.type != "long") {
      wideTypeChoice = wideType[randomIdxArr(wideType)];
      if (wideTypeChoice == "square") {
        // square가 있는지 확인한다.
        if (squareLinkArr.length > 0) {
          linkChoice = squareLinkArr[randomIdxArr(squareLinkArr)];
        } else {
          // square가 없고 wide가 있다면
          if (wideLinkArr.length > 0) {
            linkChoice = wideLinkArr[randomIdxArr(wideLinkArr)];
            wideTypeChoice = "wide";
          } else {
            //wide도 없다면 그냥 모든 square에서 고른다.
            linkChoice = squareLinkAllArr[randomIdxArr(squareLinkAllArr)];
          }
        }
      } else if (wideTypeChoice == "wide") {
        // wide광고가 있다면
        if (wideLinkArr.length > 0) {
          linkChoice = wideLinkArr[randomIdxArr(wideLinkArr)];
        } else {
          // wide광고가 없다면
          if (squareLinkArr.length > 0) {
            linkChoice = squareLinkArr[randomIdxArr(squareLinkArr)];
            wideTypeChoice = "square";
          } else {
            //square도 없다면 그냥 모든 wide에서 고른다.
            adChoice = wideAdAllArr[randomIdxArr(wideAdAllArr)];
          }
        }
      }
      linkWide();
    } else {
      longTypeChoice = longType[randomIdxArr(longType)];
      if (longTypeChoice == "square") {
        // square가 있는지 확인한다.
        if (squareLinkArr.length > 0) {
          linkChoice = squareLinkArr[randomIdxArr(squareLinkArr)];
        } else {
          // square가 없고 long이 있다면
          if (longLinkArr.length > 0) {
            linkChoice = longLinkArr[randomIdxArr(longLinkArr)];
            longTypeChoice = "long";
          } else {
            // long도 없다면 그냥 모든 square에서 고른다.
            linkChoice = squareLinkAllArr[randomIdxArr(squareLinkAllArr)];
          }
        }
      } else if (longTypeChoice == "long") {
        if (longLinkArr.length > 0) {
          linkChoice = longLinkArr[randomIdxArr(longLinkArr)];
        } else {
          // long가 없고 square가 있다면
          if (squareLinkArr.length > 0) {
            linkChoice = squareLinkArr[randomIdxArr(squareLinkArr)];
            longTypeChoice = "square";
          } else {
            // square도 없다면 모든 long에서 고른다.
            linkChoice = longLinkAllArr[randomIdxArr(longLinkAllArr)];
          }
        }
      }
      linkLong();
    }
  }
}

function linkWide() {
  makeUrl();
  linkElement.classList.add("wide");
  if (wideTypeChoice == "square") {
    linkWideType1();
  } else if (wideTypeChoice == "wide") {
    linkWideType2();
  }
}
// square 사진은 img가 아니라 background-img를 쓴다.
// 왼쪽에는 사진이 있고, 오른쪽에는 제목과 설명이 있다.
function linkWideType1() {
  // 클래스를 추가한다.
  linkElement.classList.add("type1");
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
  summaryElement.className = "link-summary type1";
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

// wide 이미지를 사용한다.
function linkWideType2() {
  // 클래스를 추가한다.
  linkElement.classList.add("type2");
  // 이미지를 만든다.
  let imgContainerElement = document.createElement("div");
  imgContainerElement.className = "img-container";
  imgContainerElement.innerHTML = `
  <img class="link-img-wide" src="${linkChoice.wide}" alt="${linkChoice.title}"/>  
  `;
  linkElement.append(imgContainerElement);
  let summaryElement = document.createElement("div");
  summaryElement.className = "link-summary type2";
  summaryElement.innerHTML = `    
   <p class="comment">${linkChoice.comment}</p>
   <div class="btn-open type2">
     열기
   </div>
   `;
  // linkType3은 줄바꿈이 없다.
  // linkElement에 추가한다.
  linkElement.append(summaryElement);
}

function linkLong() {
  makeUrl();
  linkElement.classList.add("long");
  // 나중에 만든다.
}
function makeUrl() {
  let url = linkChoice.url;
  let url1, url2, url3;
  let slice = Math.ceil(url.length / 3);
  url1 = url.substring(0, slice);
  url2 = url.substring(slice, slice * 2);
  url3 = url.substring(slice * 2);
  linkElement.dataset.url1 = url1;
  linkElement.dataset.url2 = url2;
  linkElement.dataset.url3 = url3;
  linkElement.addEventListener("click", clickLink);
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

// 2. 제휴 마케팅이다.
// 정해진 곳에 원하는 상품을 골라서 넣을 수 있다.
// 정사각형 광고가 있고, 직사각형 광고가 있다.
// af-link 클래스를 가진 div 태그를 다 가져와서 배열로 저장한다.
// blog-link도 여기서 사용한다.
let afElementArr = [...document.querySelectorAll(".af-link")];
let afElement;
let afChoice;

if (afElementArr.length > 0) {
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
// 일단 한가지 type의 af 링크를 만든다.
// 나중에 추가한다.
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
