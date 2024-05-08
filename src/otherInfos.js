//추가기능 - 출연진 / 예매하기 기능 다른 api에서 받아오기
async function fetchMovieData2() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmFmYTFlODI1OGYwZDc3MWEwMzRjOWM3OTNiNjgzMCIsInN1YiI6IjY2MjZmZDQ4MTc2YTk0MDE3ZjgxMmVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NKjXh9Bx4UxPLwQzr6nBDrLrSEAQm89Mqcv8XlKgXms",
        },
    };

    const clickedMovieId = localStorage.getItem("clickedidmovie");
    let address = `https://api.themoviedb.org/3/movie/${clickedMovieId}?append_to_response=credits&language=en-US`

    fetch(address, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            moveToActors(data);
            moveToReserve(data);

        })
}

let moveToReserve = (data) => {
    document.querySelector("#reserve").addEventListener('click', () => {
        window.open(data['homepage']);
    });
}
let moveToActors = (data) => {
        document.querySelector("#actors").addEventListener('click', () => {
            let actors = data['credits']['cast']
            let actor10 = actors.map((cur, idx)=> {
                if (idx<10) {
                    return cur["name"];
                }
            }).slice(0,10);
            console.log(actor10);
            document.querySelector("#innertext").innerHTML = `
                  <p class="card-text">감독 : ${data['credits']['crew'][0]['name']}</p>
                  <br>
                  <p class="card-text">출연진 </p>
                  <p class="card-text">${actor10}</p>`;

        
    })
}

fetchMovieData2();




//원래대로
async function fetchMovieData() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmFmYTFlODI1OGYwZDc3MWEwMzRjOWM3OTNiNjgzMCIsInN1YiI6IjY2MjZmZDQ4MTc2YTk0MDE3ZjgxMmVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NKjXh9Bx4UxPLwQzr6nBDrLrSEAQm89Mqcv8XlKgXms",
        },
    };
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => response.json())
        .then(data => {
            let movie = findMovie(data);
            moveToInfo(movie);
        });
}

fetchMovieData();

let findMovie = (data) => {
    const clickedMovieId = localStorage.getItem("clickedidmovie");
    const clickedMovie = data.results.find(
        (movie) => movie.id == clickedMovieId
    )
    return clickedMovie;
}

let moveToInfo = (data) => {
        document.querySelector("#info").addEventListener('click', () => {

        document.querySelector("#innertext").innerHTML = `
                <p class="card-text">개봉일 : ${data.release_date}</p>
                <p class="card-text"> 평점 : ${data.vote_average}</p>
                <br>
                <p class="card-text"> 상세정보</p>
                <p class="card-text"> ${data.overview}</p>`;
        
    })
}
