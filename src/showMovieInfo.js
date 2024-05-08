import { fetchMovieData } from "./nowPlayingAPI.js";

//movieId == movies.id일때, 정보 가져오기
export const showMovieInfo = async () => {
  const movies = await fetchMovieData(); //data.results
  const clickedMovieId = localStorage.getItem("clickedidmovie");
  const clickedMovie = movies.find((movie) => movie.id == clickedMovieId);
  //   console.log(clickedMovieId);
  //   console.log(clickedMovie);
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

  document.querySelector("#innertext").innerHTML = `
            <p class="card-text">개봉일 : ${movie.release_date}</p>
            <p class="card-text"> 평점 : ${movie.vote_average}</p>
            <br>
            <p class="card-text"> 상세정보</p>
            <p class="card-text"> ${movie.overview}</p>`;
}
