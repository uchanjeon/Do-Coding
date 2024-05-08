import { fetchData } from "./nowPlayingAPI.js";

//movieId == movies.id일때, 정보 가져오기
export const showMovieInfo = async () => {
  const address = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  const data = await fetchData(address); //data.results
  const movies = data.results;
  const clickedMovieId = localStorage.getItem("clickedidmovie");
  const clickedMovie = movies.find((movie) => movie.id == clickedMovieId);
  if (clickedMovie) {
    displayMovieInfo(clickedMovie);
  } else {
    alert("해당 영화를 찾을 수 없습니다.");
  }
};

// 영화 상세정보 가져오고 값 넣기
function displayMovieInfo(movie) {
  document.querySelector("#imagesection").innerHTML = `
    <img class="image" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="..." />`;

  document.querySelector("#cardtitle").innerHTML = `
    ${movie.title}`;

  document.querySelector("#nav-home").innerHTML = `
            <p class="card-text">개봉일 : ${movie.release_date}</p>
            <p class="card-text"> 평점 : ${movie.vote_average}</p>
            <p class="card-text"> ${movie.overview}</p>`;
}

