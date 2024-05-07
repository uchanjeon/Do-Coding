import { fetchMovieData } from "./nowPlayingAPI.js"; //1. API를 가져온다.
import { createMovieCards } from "./createMovieCards.js"; //2. 영화 카드를 생성한다.
import { searchMovieCards, pressEnter } from "./searchMovieCards.js"; // 3. 검색 함수 불러온다.
import { sortMovies } from "./movieFilter.js"; // 정렬 기능 모듈 불러오기

export const movies = await fetchMovieData(); //async

createMovieCards(movies);

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
