import { fetchMovieData } from "./nowPlayingAPI.js";

//movieId == movies.id일때, 정보 가져오기
export const showMovieDetail = async () => {
  const movies = await fetchMovieData(); //data.results
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  // const url = window.location.href; //url가져옴
  // const match = url.match(/[?&]id=(\d+)/); // id=뒤에 숫자 match에 저장.
  // const movieId = match ? match[1] : null; // 그중 두번째꺼가 진짜임.
  const movie = movies.find((m) => m.id == movieId);
  console.log(movieId);
  console.log(movie);

  if (movie) {
    displayMovieInfo(movie);
  } else {
    alert("해당 영화를 찾을 수 없습니다.");
  }
};
// 영화 상세정보 가져오고 값 넣기
function displayMovieInfo(movie) {
  //참조 따오기
  const posterElement = document.querySelector(".img-fluid");
  const titleElement = document.querySelector(".card-title");
  const voteAverageElement = document.querySelectorAll(".card-text")[0];
  const releaseDateElement = document.querySelectorAll(".card-text")[1];
  const overviewElement = document.querySelectorAll(".card-text")[2];
  // 영화 정보 삽입
  posterElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  titleElement.textContent = "영화 제목: " + movie.title;
  voteAverageElement.textContent = "영화 평점 : " + movie.vote_average;
  releaseDateElement.textContent = "영화 출시일 : " + movie.release_date;
  overviewElement.textContent = "영화 내용 : " + movie.overview;
}
