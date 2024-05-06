export const createMovieCards = async (movies) => {
  const cardList = document.querySelector(".movieCards"); // .은 class
  cardList.innerHTML = movies
    .map(
      (movie) => `
          <section class="movie-card" id="${movie.id}">
              <img class="movie-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
              <h3 class="movie-title">영화 제목 : ${movie.title}</h3>
              <p class="movie-rating">영화 평점 : ${movie.vote_average}</p>
          </section>`
    )
    .join("");
  cardList.addEventListener("click", clickCard);

  // 이벤트 위임
  function clickCard({ target }) {
    if (target === cardList) return; // 카드 외 영역 클릭 시 무시
    if (target.matches(".movie-card")) {
      let link = `moviePage.html?id=${target.id}`;
      location.href = link;
    } else {
      // 카드의 자식 태그 (img, h3, p) 클릭 시 부모의 id로 접근
      let link = `moviePage.html?id=${target.parentNode.id}`;
      location.href = link;
    }
  }
};
