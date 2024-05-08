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
    event.preventDefault();
    document.getElementById("searchBtn").click(); // 검색버튼 클릭
  }
}
