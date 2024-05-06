const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGFhZWZmNTk2ZTdhZTEzODMxZGRlOTRhYWE0YTgxYiIsInN1YiI6IjY2MjYzNTlmNjNkOTM3MDE0YTcxOWRmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lWKw5grKuXOHrKv9iGfhk2x7VNULIlT17SauDeWb6VY",
  },
};

let movie; //영화 전체 API
let searchedMovie; // 검색어랑 일치하는 객체
let movieCard;
let allData;

//카드 로드 함수
let printMovieCards = (movie) => {
  movie.forEach((a) => {
    let movieIndex = movie.indexOf(a);
    let movieTitle = a["title"];
    let movieImage = a["poster_path"];
    let movieCardHTML = `
        <div class="cardsection" id=cardsection${movieIndex}>
            <input type="button" class="cardbtn" id="button${movieIndex}" style="display: none;">
              <label for="button${movieIndex}" class="card" id="card${movieIndex}">
                <div class="imagesection">
                  <img class="cardimage" id="carimage" 
                        src="https://image.tmdb.org/t/p/original${movieImage}" alt="...">
                </div>
                <div class="textsection">
                    <h5 class="cardtitle" id="title${movieIndex}">${movieTitle}</h5>
                </div>
              </label>
            </input>
        </div>`;
    document
      .querySelector(".movieCards")
      .insertAdjacentHTML("beforeend", movieCardHTML);
  });
  console.log(movie);
};

//첫 로드
let printTitle = function (data) {
  allData = data; // 데이터받고 그거 allDate에 저장
  movie = data["results"]; //데이터의 results를 movie에 저장
  searchedMovie = movie; //searchedMovie를 일단 movie로 저장= data["results"];
  printMovieCards(movie); // 카드 로드. movie로
  movieCard = document.querySelectorAll(".cardbtn"); // cardbtn이라는 클래스 참조를 MovieCard에 저장.
};

//카드 클릭시 실행할 함수
let cardAlert = (a) => {
  let number = a.target.id.slice(6);
  let idOfMovie = searchedMovie[number]["id"];
  alert("id : " + idOfMovie);
};

//카드 클릭 함수
let clickCard = (movieCards) => {
  movieCards.forEach((a) => {
    a.addEventListener("click", (a) => {
      let number = a.target.id.slice(6);
      let idOfMovie = searchedMovie[number]["id"];
      alert("id : " + idOfMovie);
    });
  });
};

//검색버튼 클릭시 실행할 함수
let clickBtn = () => {
  const a = document.querySelector(".search-input").value.toLowerCase();
  if (!a) {
    alert("검색어를 입력하세요");
  }
  searchedMovie = movie.filter((i) => {
    return i["title"].toLowerCase().includes(a.toLowerCase());
  });
  document.querySelectorAll(".movieCards").forEach(function (i) {
    i.innerHTML = ``;
  });
  printMovieCards(searchedMovie);
  movieCard = document.querySelectorAll(".cardbtn");
};

//검색버튼 클릭 함수
let printSearched = function () {
  const btn = document.querySelector(".search-btn");
  btn.addEventListener("click", () => {
    clickBtn();
    clickCard(movieCard);
  });
  document.querySelector(".search-input").addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      btn.click();
    }
  });
};

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    printTitle(data);
    clickCard(movieCard);
    printSearched(data);
  });
