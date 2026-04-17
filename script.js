const tear = document.getElementById("tear");
const story = document.getElementById("story");
const carouselx = story.getElementsByTagName('div')[0];;
const galleryOpenBtn = document.getElementById('open-disaster');
// Activate story on click
tear.addEventListener("click", () => {
  story.classList.add("active");
});

carouselx.addEventListener("click", () => {
  story.classList.remove("active");
});
galleryOpenBtn.addEventListener("click", () => {
  document.getElementsByClassName('carousel-container')[0].style.display = 'flex';
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
// Share links
const url = encodeURIComponent(window.location.href);
const text = encodeURIComponent("Help rebuild this home");

document.getElementById("share-wa").href =
  `https://wa.me/?text=${text}%20${url}`;

document.getElementById("share-tw").href =
  `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

document.getElementById("share-fb").href =
  `https://www.facebook.com/sharer/sharer.php?u=${url}`;