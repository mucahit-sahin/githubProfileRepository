var closePanel = document.createElement("div");
closePanel.style.display = "none";
closePanel.style.background = "transparent";
closePanel.style.position = "absolute";
closePanel.style.width = "100vw";
closePanel.style.height = "100vh";
closePanel.style.zIndex = 10;

var container = document.querySelector(".container");
container.appendChild(closePanel);

var navActionMenu = document.querySelector(".navActionMenu");
var navProfileAvatar = document.querySelector(".navProfileAvatar");

navActionMenu.addEventListener("click", () => {
  closePanel.style.display = "block";
});
navProfileAvatar.addEventListener("click", () => {
  closePanel.style.display = "block";
});
closePanel.addEventListener("click", () => {
  closePanel.style.display = "none";
  navActionMenu.open = false;
  navProfileAvatar.open = false;
});
