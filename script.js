const tear = document.getElementById("tear");
const story = document.getElementById("story");

// Activate story on click
tear.addEventListener("click", () => {
  story.classList.add("active");
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