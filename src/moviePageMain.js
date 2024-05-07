document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "5de1d12aba74214884d2a9132966a1b8";
  const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const clickedMovieId = localStorage.getItem("clickedidmovie");
      // const urlParams = new URLSearchParams(window.location.search);
      // const clickedMovieId = urlParams.get("id");
      console.log(clickedMovieId);
      const clickedMovie = data.results.find(
        (movie) => movie.id == clickedMovieId
      );

      if (clickedMovie) {
        document.querySelector("#imagesection").innerHTML = `
        <img class="image" src="https://image.tmdb.org/t/p/w500${clickedMovie.poster_path}" alt="..." />`;

        document.querySelector("#cardtitle").innerHTML = `
        ${clickedMovie.title}`;

        document.querySelector("#innertext").innerHTML = `
                <p class="card-text">개봉일 : ${clickedMovie.release_date}</p>
                <p class="card-text"> 평점 : ${clickedMovie.vote_average}</p>
                <br>
                <p class="card-text"> 상세정보</p>
                <p> ${clickedMovie.overview}</p>`;

      } else {
        console.error("Clicked movie not found in the movie list");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      a;
    });
});
