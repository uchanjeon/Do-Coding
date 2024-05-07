export const createMovieCards = async (movies) => {
  const cardList = document.querySelector(".movieCards"); // .은 class
  cardList.innerHTML = movies
    .map(
      (movie) => `
          <section class="movie-card" id="${movie.id}">
              <img class="movie-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
              <h3 class="movie-title">${movie.title}</h3>
              <p class="movie-rating">평점 : ${movie.vote_average}</p>
          </section>`
    )
    .join("");
  cardList.addEventListener("click", clickCard);

  function clickCard() {
    document.querySelectorAll(".movie-card").forEach((card) => {
      card.addEventListener("click", function () {
        const movieId = card.id;
        let link = `moviePage.html?id=${movieId}`;
        localStorage.setItem("clickedidmovie", movieId);
        location.href = link;
      });
    });
  }
};
