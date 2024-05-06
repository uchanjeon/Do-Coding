import { fetchMovieData } from "./nowPlayingAPI.js"; //1. API를 가져온다.
import { createMovieCards } from "./createMovieCards.js"; //2. 영화 카드를 생성한다.
// import { searchMovieCards } from "./searchMovieCards.js";

// import { searchMovies } from "./search.js"; // 4.
// 1. API를 가져온다.
const movies = await fetchMovieData(); //async

// 2. 영화 카드를 생성한다. 3. 영화 카드에 함수를 부여한다.
createMovieCards(movies);

// 4. 영화 상단 keyword 검색기능을 부여한다.
// input과 동일하지 않으면 사라짐. 그리고 다시 영화 카드에 함수를 부여.
// enter키도 가능한거 여기다 넣자.
