export function searchMovieCards(searchInput) {
  const movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach((card) => {
    const title = card.querySelector(".movie-title").textContent.toLowerCase();
    const searchInputLower = searchInput.toLowerCase();

    title.includes(searchInputLower)
      ? (card.style.display = "block")
      : (card.style.display = "none");
  });
}

export function pressEnter(event) {
  let key = event.key || event.keyCode;
  if (key === "Enter" || key === 13) {
    event.preventDefault(); // 어떤 이벤트가 명시적으로 처리하지 않은 경우, 해당이벤트에 대한 브라우저의 기본동작을 실행 ㄴㄴ하도록
    document.getElementById("searchBtn").click(); // 검색버튼 클릭
  }
}
