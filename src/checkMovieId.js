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
  const releaseDateElement = document.querySelectorAll(".card-text")[0];
  const voteAverageElement = document.querySelectorAll(".card-text")[1];
  const popularityElement = document.querySelectorAll(".card-text")[2];
  const overviewElement = document.querySelectorAll(".card-text")[3];
  // 영화 정보 삽입
  posterElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  titleElement.textContent = "영화 제목: " + movie.title;
  releaseDateElement.textContent = "영화 출시일 : " + movie.release_date;
  voteAverageElement.textContent = "영화 평점 : " + movie.vote_average;
  popularityElement.textContent = "인기 : " + movie.popularity;
  overviewElement.textContent = "영화 내용 : " + movie.overview;
}
//
async function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmFmYTFlODI1OGYwZDc3MWEwMzRjOWM3OTNiNjgzMCIsInN1YiI6IjY2MjZmZDQ4MTc2YTk0MDE3ZjgxMmVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NKjXh9Bx4UxPLwQzr6nBDrLrSEAQm89Mqcv8XlKgXms",
    },
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  );
  const data = await response.json();
  console.log("영화 정보 JSON \n", data.results);
  return data.results;
}
