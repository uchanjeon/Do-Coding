document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "5de1d12aba74214884d2a9132966a1b8";
  const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // const clickedMovieId = localStorage.getItem("clickedidmovie");
      const urlParams = new URLSearchParams(window.location.search);
      const clickedMovieId = urlParams.get("id");
      console.log(clickedMovieId);
      const clickedMovie = data.results.find(
        (movie) => movie.id == clickedMovieId
      );

      if (clickedMovie) {
        const temp_html = `
        <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img class="img-fluid rounded-start" src="https://image.tmdb.org/t/p/w500${clickedMovie.poster_path}" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">영화제목 : ${clickedMovie.title}</h5>
              <p class="card-text">영화 평점 : ${clickedMovie.vote_average}</p>
              <p class="card-text">영화 출시일 : ${clickedMovie.release_date}</p>
              
              <p class="card-text">영화 내용 : ${clickedMovie.overview}</p>
            </div>
          </div>
        </div>
      </div>
      `;
        document.getElementById("bigbox1").innerHTML = temp_html;
      } else {
        console.error("Clicked movie not found in the movie list");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      a;
    });
});
