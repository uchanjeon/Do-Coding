// 검색 함수
function searchMovies(apiKey, keyword, movieCardsContainer) {
  const searchUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&include_adult=false&query=${keyword}&api_key=${apiKey}`;

  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      movieCardsContainer.innerHTML = "";

      if (data.results && data.results.length > 0) {
        data.results.forEach((movie) => {
          const card = createMovieCard(movie);
          movieCardsContainer.appendChild(card);
        });
      } else {
        movieCardsContainer.innerHTML = "검색 결과가 없습니다.";
      }
    })
    .catch((error) => {
      console.error("에러 발생:", error);
      movieCardsContainer.innerHTML = "영화를 검색하는 중 에러가 발생했습니다.";
    });
}

// 클릭된 영화 정보 확인 함수
function showMovieId(movieId) {
  alert("영화의 ID: " + movieId);
}
