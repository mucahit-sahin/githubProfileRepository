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
async function getUserData(username = "mucahit-sahin") {
  let response = await fetch(`https://api.github.com/users/${username}`);
  let data = await response.json();
  getGithubRepos(username);
  return data;
}
getUserData().then((data) => {
  document.querySelector(".profileBioUsername").innerHTML = data.login;
  document.querySelector(".profileBio img").src = data.avatar_url;
  document.querySelector("#navProfileIcon").src = data.avatar_url;
  document.querySelector(".navProfileAvatar img").src = data.avatar_url;
  document.querySelector(".followersCount").innerHTML = data.followers;
  document.querySelector(".followingCount").innerHTML = data.following;
  document.querySelector(".profileLinks").innerHTML = "";
  if (data.company !== null || data.company !== "")
    document.querySelector(".profileLinks").innerHTML += `<div>
  <svg
    class="octicon octicon-organization"
    viewBox="0 0 16 16"
    version="1.1"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"
    ></path>
  </svg>
  <span id="company">${data.company}</span>
</div>`;
  if (data.location !== null || data.location !== "")
    document.querySelector(".profileLinks").innerHTML += `<div>
  <svg class="octicon octicon-location" viewBox="0 0 16 16" version="1.1" width="16" height="16"
      aria-hidden="true">
      <path fill-rule="evenodd"
          d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z">
      </path>
  </svg>
  <span id="location">
  ${data.location}
  </span>
</div>`;
  if (data.blog !== null || data.blog !== "")
    document.querySelector(".profileLinks").innerHTML += ` 
  <div>
      <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16"
          aria-hidden="true">
          <path fill-rule="evenodd"
              d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z">
          </path>
      </svg>
      <span id="blog">
      ${data.blog}
      </span>
  </div>`;
});

/* Github Api GET Repositories*/

var profileRepositories = document.querySelector(".profileRepositories");
var repoList = [];

function getGithubRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => response.json())
    .then((data) => {
      repoList = data;
      profileRepositories.innerHTML = "";
      data.map((repo) => {
        var repositoryElement = `<div class="repository">
        <div class="repositoryHeader">
            <a href="${repo.html_url}">${repo.name}</a>
            <div>
                <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16"
                    height="16" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                    </path>
                </svg>
                <span>Star</span>
            </div>
        </div>
        ${
          repo.description !== null
            ? `
            <div class="repositoryDescription">
              <span>${repo.description}</span>
            </div>
          `
            : ``
        }
        <div class="repositoryInfo">
            <div class="programLang">
                <span> </span>
                <span>${repo.language}</span>
            </div>
            <div class="repositoryDate">
                <span>${repo.updated_at}</span>
            </div>
        </div>
    </div>`;
        profileRepositories.innerHTML += repositoryElement;
      });
    });
}

/*Repository Filter */

var searchInput = document.querySelector(".profileReposColHeader input");
console.log(searchInput);
searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  let pattern = new RegExp(e.target.value);
  var filterList = repoList.filter(function (repo) {
    return repo.name.match(pattern);
  });
  profileRepositories.innerHTML = "";
  filterList.map((repo) => {
    var repositoryElement = `<div class="repository">
    <div class="repositoryHeader">
       <a href="${repo.html_url}">${repo.name}</a>
        <div>
            <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16"
                height="16" aria-hidden="true">
                <path fill-rule="evenodd"
                    d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                </path>
            </svg>
            <span>Star</span>
        </div>
    </div>
    ${
      repo.description !== null
        ? `
        <div class="repositoryDescription">
          <span>${repo.description}</span>
        </div>
      `
        : ``
    }
    <div class="repositoryInfo">
        <div class="programLang">
            <span> </span>
            <span>${repo.language}</span>
        </div>
        <div class="repositoryDate">
            <span>${repo.updated_at}</span>
        </div>
    </div>
</div>`;
    profileRepositories.innerHTML += repositoryElement;
  });
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
    getUserData(e.target.value).then((data) => {
      if (data) {
        document.querySelector(".profileBioUsername").innerHTML = data.login;
        document.querySelector(".profileBio img").src = data.avatar_url;
        document.querySelector("#navProfileIcon").src = data.avatar_url;
        document.querySelector(".navProfileAvatar img").src = data.avatar_url;
        document.querySelector(".followersCount").innerHTML = data.followers;
        document.querySelector(".followingCount").innerHTML = data.following;
        document.querySelector(".profileLinks").innerHTML = "";
        if (data.company !== null && data.company !== "") {
          document.querySelector(".profileLinks").innerHTML += `<span>
        <svg
          class="octicon octicon-organization"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"
          ></path>
        </svg>
        <span id="company">${data.company}</span>
      </span>`;
        }
        if (data.location !== null && data.location !== "") {
          document.querySelector(".profileLinks").innerHTML += `<span>
        <svg class="octicon octicon-location" viewBox="0 0 16 16" version="1.1" width="16" height="16"
            aria-hidden="true">
            <path fill-rule="evenodd"
                d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z">
            </path>
        </svg>
        <span id="location">
        ${data.location}
        </span>
      </span>`;
        }
        if (data.blog !== null && data.blog !== "") {
          document.querySelector(".profileLinks").innerHTML += ` 
        <span>
            <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                aria-hidden="true">
                <path fill-rule="evenodd"
                    d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z">
                </path>
            </svg>
            <span id="blog">
            ${data.blog}
            </span>
        </span>`;
        }
      }
    });
    e.target.value = "";
  }
});
