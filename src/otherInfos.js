import { fetchData } from "./nowPlayingAPI.js";

export async function movieActors() {
  const clickedMovieId = localStorage.getItem("clickedidmovie");
  const address = `https://api.themoviedb.org/3/movie/${clickedMovieId}?append_to_response=credits&language=en-US`;
  const data = await fetchData(address);
  try {
    let actors = data["credits"]["cast"];
    let actor10 = actors
      .map((cur, idx) => {
        if (idx < 10) {
          return ` ${cur["name"]}(${cur["character"]})`;
        }
      })
      .slice(0, 10);
    document.querySelector("#nav-profile").innerHTML = `
        <p class="card-text">감독</p>
        <p class="card-text">${data["credits"]["crew"][0]["name"]}</p>
        <p class="card-text">출연진 </p>
        <p class="card-text">${actor10}</p>`;
  } catch (error) {
    console.log(error);
  }
}

export async function movieWatch() {
  const clickedMovieId = localStorage.getItem("clickedidmovie");
  const address = `https://api.themoviedb.org/3/movie/${clickedMovieId}?append_to_response=credits&language=en-US`;
  const data = await fetchData(address);
  try {
    document.querySelector("#nav-contact-tab").addEventListener("click", () => {
      window.open(data["homepage"]);
    });
  } catch (error) {
    console.log(error);
  }
}
