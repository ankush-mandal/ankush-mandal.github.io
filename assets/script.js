
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.dataset.theme = savedTheme;
else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) root.dataset.theme = "dark";

const themeButton = document.querySelector("[data-theme-toggle]");
function setThemeIcon(){
  if(!themeButton) return;
  themeButton.textContent = root.dataset.theme === "dark" ? "☀" : "◐";
}
setThemeIcon();
themeButton?.addEventListener("click",()=>{
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme",root.dataset.theme);
  setThemeIcon();
});
const menuButton=document.querySelector("[data-menu-toggle]");
const navLinks=document.querySelector(".nav-links");
menuButton?.addEventListener("click",()=>navLinks?.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks?.classList.remove("open")));
document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());


// Automatically adapt each research topic to the intrinsic aspect ratio
// of its movie. No per-movie CSS classes need to be added manually.
function classifyResearchMedia(video) {
  const topic = video.closest(".research-topic");
  if (!topic || !video.videoWidth || !video.videoHeight) return;

  const ratio = video.videoWidth / video.videoHeight;

  topic.classList.remove(
    "media-portrait",
    "media-square",
    "media-landscape",
    "media-ultrawide"
  );

  if (ratio < 0.82) {
    topic.classList.add("media-portrait");
  } else if (ratio < 1.25) {
    topic.classList.add("media-square");
  } else if (ratio > 2.05) {
    topic.classList.add("media-ultrawide");
  } else {
    topic.classList.add("media-landscape");
  }
}

document.querySelectorAll(".research-topic video").forEach(video => {
  if (video.readyState >= 1) {
    classifyResearchMedia(video);
  } else {
    video.addEventListener("loadedmetadata", () => classifyResearchMedia(video), {
      once: true
    });
  }
});

// Also support static research figures automatically, should you use them later.
function classifyResearchImage(img) {
  const topic = img.closest(".research-topic");
  if (!topic || !img.naturalWidth || !img.naturalHeight) return;

  const ratio = img.naturalWidth / img.naturalHeight;

  topic.classList.remove(
    "media-portrait",
    "media-square",
    "media-landscape",
    "media-ultrawide"
  );

  if (ratio < 0.82) topic.classList.add("media-portrait");
  else if (ratio < 1.25) topic.classList.add("media-square");
  else if (ratio > 2.05) topic.classList.add("media-ultrawide");
  else topic.classList.add("media-landscape");
}

document.querySelectorAll(".research-topic img.research-figure").forEach(img => {
  if (img.complete) classifyResearchImage(img);
  else img.addEventListener("load", () => classifyResearchImage(img), {once:true});
});

fetch("footer.html")
.then(response => response.text())
.then(data => {
  document.getElementById("footer-placeholder").innerHTML = data;

  // Update copyright year after footer has been loaded
  const year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
