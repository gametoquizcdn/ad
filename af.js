//object를 넣으면 광고를 만들어준다.
//id, src, url이 필요하다.
function makeAf(object) {
  let id = `#${object.id}`;
  let afElement = document.querySelector(id);
  let url = object.url;
  let url1, url2, url3;
  let slice = Math.ceil(url.length / 3);
  url1 = url.substring(0, slice);
  url2 = url.substring(slice, slice * 2);
  url3 = url.substring(slice * 2);
  //data-를 만든다.
  afElement.dataset.url1 = url1;
  afElement.dataset.url2 = url2;
  afElement.dataset.url3 = url3;
  if (object.src) {
    let imgElement = document.createElement("div");
    imgElement.className = "af-img";
    imgElement.style.backgroundImage = `url(${object.src})`;
    afElement.append(imgElement);
    afElement.addEventListener("click", clickAf);
  }
}

function clickAf(e) {
  //부모의 클래스에 ad-itple가 있을 때까지 위로 올라간다.
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
