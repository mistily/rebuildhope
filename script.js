const tear = document.getElementById("tear");
const story = document.getElementById("story");
const carouselx = story.getElementsByTagName('div')[0];;
const galleryOpenBtn = document.getElementById('open-disaster');
const galleryClose = document.getElementById('detail-carousel').children[0].children[0];
const leftSwipe = document.getElementById('car-left');
const rightSwipe = document.getElementById('car-right');
const donateBtn = document.getElementById('donateBtn');
const langSwitch = document.getElementById("langSwitch");
let langs = document.getElementsByClassName("lang-link");
const supported = ["en", "hu", "ro"];

function getLangFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("lang");
}
async function getTranslations(){
  const response = await fetch('./translations.json');
  return await response.json();
}
async function changeLanguage(lang){
  localStorage.setItem("lang",lang);
  const translations = await getTranslations();
  const url = new URL(window.location);
  url.searchParams.set("lang", lang);
  window.history.replaceState({},"",url);
  document.querySelector('html').setAttribute('lang',lang);
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.dataset.translate;

    if(el.tagName === "META") {
      el.setAttribute("content", translations[lang][key]);
    } else {
      el.textContent = translations[lang][key];
    }
  });

}
document.addEventListener("DOMContentLoaded", () =>{
  const urlLang = getLangFromURL();
  const savedLang = localStorage.getItem("lang");
  const lang = supported.includes(urlLang)? urlLang || savedLang || "en": "en";
  changeLanguage(lang);
});

donateBtn.addEventListener("click",()=>{
  donateBtn.classList.add("pulse");
  setTimeoute(() => {
      window.open("https://revolut.me/istvangodt?amount=5", "_blank");
    }, 300);
  
});
Array.from(langs).forEach((item) => {
  item.addEventListener("click", () => {
      item.classList.add("pointed");
  });
});
langSwitch.addEventListener("click", () => {
  let isOpening = false;
  let selList = document.querySelectorAll(".lang-link.selected");
  if(selList.length == 1) { isOpening = true; selList[0].classList.add("prevSel") };
  if(isOpening)
    document.querySelectorAll(".lang-link").forEach((item) => { item.classList.add("selected");});
  else {
    Array.from(langs).forEach((item) => {
      if(!item.classList.contains("pointed"))
        item.classList.remove("selected");
    });
    let sels = document.querySelectorAll(".pointed.selected");
    if(sels.length == 2) { 
      let elem = document.querySelector(".pointed.prevSel");
      elem.classList.remove("selected"); elem.classList.remove("prevSel");
      document.querySelectorAll(".pointed").forEach((it) => it.classList.remove("pointed"));
    }
    changeLanguage(document.querySelector(".lang-link.selected>img").getAttribute("alt").toLowerCase());
  }
});


// Activate story on click
tear.addEventListener("click", () => {
  story.classList.add("active");
});

carouselx.addEventListener("click", () => {
  story.classList.remove("active");
});
galleryOpenBtn.addEventListener("click", () => {
  document.getElementsByClassName('carousel-container')[0].style.display = 'flex';
  let dimsRef = document.getElementById("detail-carousel").getBoundingClientRect().height;
  let caretLeftPos = document.getElementById("detail-carousel").getBoundingClientRect().left - 120;
  let caretRightPos = document.getElementById("detail-carousel").getBoundingClientRect().right + 20;
  document.getElementById("bg1-carousel").style.height = dimsRef + "px";
  document.getElementById("bg2-carousel").style.height = dimsRef + "px";
  if(caretLeftPos<0) caretLeftPos = 0;
  else document.getElementById("car-right").style.left = caretRightPos + "px";
  document.getElementById("car-left").style.left = caretLeftPos + "px";
});
galleryClose.addEventListener("click", () => {
  document.getElementsByClassName('carousel-container')[0].style.display = 'none';
});
document.querySelectorAll(".card").forEach((card) => {
  const inner = card.querySelector(".card-inner");

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) - 0.5;
    const py = (y / rect.height) - 0.5;

    const rotateX = (-py * 10).toFixed(2);
    const rotateY = (px * 10).toFixed(2);

    inner.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0px)`;
  });

  card.addEventListener("mouseleave", () => {
    inner.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});
leftSwipe.addEventListener("click", () => {
  let slide = document.getElementsByClassName("slide active")[0];
  let prevSlide = slide.previousElementSibling;
  if(prevSlide!=null && prevSlide!=undefined && prevSlide.classList.contains("slide")) {
    slide.classList.remove("active");
    prevSlide.classList.add("active");
  }
});
rightSwipe.addEventListener("click", () => {
  let slide = document.getElementsByClassName("slide active")[0];
  let nextSlide = slide.nextElementSibling;
  if(nextSlide!=null && nextSlide!=undefined && nextSlide.classList.contains("slide")) {
    slide.classList.remove("active");
    nextSlide.classList.add("active");
  }
});
// Share links
const url = encodeURIComponent(window.location.href);
const text = encodeURIComponent("Help rebuild this home");

document.getElementById("share-wa").href =
  `https://wa.me/?text=${text}%20${url}`;

document.getElementById("share-tw").href =
  `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

document.getElementById("share-fb").href =
  `https://www.facebook.com/sharer/sharer.php?u=${url}`;