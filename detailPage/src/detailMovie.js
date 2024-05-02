// makeMovieList 라는 이름의 함수를 만든 후 외부와 연결시킨다.
export const makeMovieList = async () => {
    // fetchMovieData를 다 받은 후에 movies에 저장한다.
    const movies = await fetchMovieData();

    // movie-list 선택자를 만족하는 요소 하나를 movieList에 저장한다.
    const selectedMovie = document.querySelector("#detailInfo");
    // movies에서 html 요소를 moviList에 저장한다.
    selectedMovie.innerHTML = movies
        .map(
            (movie) =>`
            <li class="movie-card" id=${movie.id}>
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
              <h3 class="movie-title">${movie.title}</h3>
              <p>${movie.overview}</p>
              <p>Rating: ${movie.vote_average}</p>
            </li>`
        )
        // 데이터에서 ""를 빼고 연결해라
        .join("");

    // 

    
};

async function fetchMovieData() {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGJhZGZhMTMyM2YxYTQ4NzFiNzQxYTAxNTFmY2Q5YyIsInN1YiI6IjY2MjVhYjY0NjNkOTM3MDE2NDcyNDJkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nMR1kHl2C35maQQW1F3hkQd-uE-2VlDuJgSoP7J5vTc'
        }
    };
    const response = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
        const data = await response.json();
        return data.results;
    
};
