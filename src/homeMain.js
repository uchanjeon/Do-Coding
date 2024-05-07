import { fetchMovieData } from "./nowPlayingAPI.js"; //1. API를 가져온다.
import { createMovieCards } from "./createMovieCards.js"; //2. 영화 카드를 생성한다.
import { searchMovieCards, pressEnter } from "./searchMovieCards.js";
import { sortMovies } from "./movieFilter.js"; // 정렬 기능 모듈 불러오기

// import { searchMovies } from "./search.js"; // 4.
// 1. API를 가져온다.
export const movies = await fetchMovieData(); //async

// 2. 영화 카드를 생성한다. 3. 영화 카드에 함수를 부여한다.
createMovieCards(movies);

// 4. 검색기능 : 엔터키안됨
const searchInput = document.querySelector("#searchInput");
searchInput.focus();
//검색버튼누르면 검색 실행
document.querySelector("#searchBtn").addEventListener("click", (event) => {
  event.preventDefault();
  searchMovieCards(searchInput.value);
});
//엔터누르면 검색 실행
document
  .getElementById("searchInput")
  .addEventListener("keyup", (event) => pressEnter(event));

      // 4. 정렬 기능
      const filterSelect = document.getElementById("filterSelect");
      filterSelect.addEventListener("change", () => {
        const selectedValue = filterSelect.value;
        const sortedMovies = sortMovies(movies, selectedValue);
        createMovieCards(sortedMovies); 
      });
    
  
  