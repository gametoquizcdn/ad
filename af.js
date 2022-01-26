//af-itple 클래스를 가진 div 태그를 다 가져와서 배열로 저장한다.
let afElementArr = [...document.querySelectorAll(".af-itple")];

loadAf(
  "https://opensheet.elk.sh/1JnCOruPQKp9juaxckms-YTyp6CRgbdPbFr1Ocw59seQ/af"
);
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
        }
        //제휴마케팅 링크가 있다면
        if (isAf) {
          //url를 만든다.
          let url = af.url;
          let url1, url2, url3;
          let slice = Math.ceil(url.length / 3);
          url1 = url.substring(0, slice);
          url2 = url.substring(slice, slice * 2);
          url3 = url.substring(slice * 2);
          //element는 제휴div를 말한다.
          element.dataset.url1 = url1;
          element.dataset.url2 = url2;
          element.dataset.url3 = url3;
          //af의 type이 col라면 세로로 만든다.
          if (af.type == "col") {
            element.classList.add("col");
            //img가 나오는 부분을 div를 만든다.
            let imgElement = document.createElement("div");
            //ad-img라고 클래스를 만든다.
            imgElement.className = "af-img";
            //배경화면을 정한다.
            imgElement.style.backgroundImage = `url(${af.src})`;
            element.append(imgElement);
            let titleElement = document.createElement("p");
            titleElement.innerText = af.title;
            element.append(titleElement);
          }
        }
      }
    });
    //클릭 이벤트를 등록한다.
    element.addEventListener("click", clickAf);
  });
}

//클릭하면 제휴마케팅으로 새로운 창을 연다.
function clickAf(e) {
  //부모 엘리먼트의 클래스에 ad-itple가 있을 때까지 위로 올라간다.
  let clickElement = e.target;
  while (!clickElement.classList.contains("af-itple")) {
    clickElement = clickElement.parentElement;
  }
  window.open(
    clickElement.dataset.url1 +
      clickElement.dataset.url2 +
      clickElement.dataset.url3
  );
}
