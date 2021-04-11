class Api {
  async user(username = "mucahit-sahin") {
    let response = await fetch(`https://api.github.com/users/${username}`);
    let data = await response.json();
    console.log(data);
    return data;
  }
  async githubRepos(username = "mucahit-sahin") {
    let response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    let data = await response.json();
    return data;
  }
}
export const api = new Api();
