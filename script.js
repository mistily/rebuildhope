const tear = document.getElementById("tear");
const story = document.getElementById("story");
const carouselx = story.getElementsByTagName('div')[0];;
const galleryOpenBtn = document.getElementById('open-disaster');
const galleryClose = document.getElementById('detail-carousel').children[0].children[0];
const leftSwipe = document.getElementById('car-left');
const rightSwipe = document.getElementById('car-right');
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
  document.getElementById("bg1-carousel").style.height = dimsRef + "px";
  document.getElementById("bg2-carousel").style.height = dimsRef + "px";
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