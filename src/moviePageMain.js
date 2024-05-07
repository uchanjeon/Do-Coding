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
        const temp_html = `
        <div class="movieInfo">
          <div class="imagesection">
            <img class="image" src="https://image.tmdb.org/t/p/w500${clickedMovie.poster_path}" alt="..." />
          </div>
          <div class="infotext">
            <div class="card-body">
              <h3 class="card-title">${clickedMovie.title}</h3>
              <p class="card-text">${clickedMovie.release_date}</p>
              <p class="card-text"> 평점 : ${clickedMovie.vote_average}</p>
              <p class="card-text">${clickedMovie.overview}</p>
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


//추가기능 - 출연진 / 예매하기 기능 다른 api에서 받아오기
async function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmFmYTFlODI1OGYwZDc3MWEwMzRjOWM3OTNiNjgzMCIsInN1YiI6IjY2MjZmZDQ4MTc2YTk0MDE3ZjgxMmVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NKjXh9Bx4UxPLwQzr6nBDrLrSEAQm89Mqcv8XlKgXms",
    },
  };

  const clickedMovieId = localStorage.getItem("clickedidmovie");
  let address = `https://api.themoviedb.org/3/movie/${clickedMovieId}?append_to_response=credits&language=en-en`

  fetch(address, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      moveToReserve(data);



    })
}

let moveToReserve = (data) => {
  document.querySelector("#reserve").addEventListener('click', () => {
    location.href=data['homepage'];
  });
}

fetchMovieData();

