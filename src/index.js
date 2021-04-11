import "./style.css";
import { api } from "./api";
import { ui } from "./ui";

var closePanel = document.createElement("div");
closePanel.style.display = "none";
closePanel.style.background = "transparent";
closePanel.style.position = "absolute";
closePanel.style.left = 0;
closePanel.style.top = 0;
closePanel.style.width = "100vw";
closePanel.style.height = "100vh";
closePanel.style.zIndex = 20;

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
/* Github Api GET User Data*/
api.user().then((data) => {
  ui.showUser(data);
});
/* Github Api GET Repositories*/

api.githubRepos().then((data) => {
  ui.showRepositories(data);
});

/*Repository Filter */

var searchInput = document.querySelector(".profileReposColHeader input");
searchInput.addEventListener("input", (e) => {
  ui.filterRepositories(e);
});

/* Mobile Menu Open */

var menuButtonDiv = document.querySelector(".menu");
var menuButton = document.querySelector(".mobileMenu button");

menuButton.addEventListener("click", () => {
  menuButtonDiv.classList.toggle("active");
});

/*search username */

var searchUserInput = document.querySelector("nav>.searchInput input");

searchUserInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value !== "") {
    api.user(e.target.value).then((data) => {
      ui.showUser(data);
    });
    api.githubRepos(e.target.value).then((data) => {
      ui.showRepositories(data);
    });
    e.target.value = "";
  }
});
