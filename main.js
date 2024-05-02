document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '5de1d12aba74214884d2a9132966a1b8';
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`;

    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const movieCardsContainer = document.querySelector('.movieCards');

    // 초기화 함수
function restart(apiUrl, movieCardsContainer) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                data.results.forEach(movie => {
                    const card = createMovieCard(movie);
                    movieCardsContainer.appendChild(card);
                });
            } else {
                movieCardsContainer.innerHTML = '에러 발생.';
            }
        })
        .catch(error => {
            console.error('에러 발생:', error);
            movieCardsContainer.innerHTML = '에러 발생.';
        });
}

    // 초기화
    restart(apiUrl, movieCardsContainer);

    // 검색 버튼 클릭 이벤트 리스너
    searchBtn.addEventListener('click', function () {
        const keyword = searchInput.value.trim();
        if (keyword !== '') {
            searchMovies(apiKey, keyword, movieCardsContainer);
        } else {
            movieCardsContainer.innerHTML = '검색어를 입력하세요.';
        }
    });

    // Enter 키로 검색
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const keyword = searchInput.value.trim();
            if (keyword !== '') {
                searchMovies(apiKey, keyword, movieCardsContainer);
            } else {
                movieCardsContainer.innerHTML = '검색어를 입력하세요.';
            }
        }
    });

    // 각각의 영화 카드에 클릭 이벤트 추가
    movieCardsContainer.addEventListener('click', function (event) {
        const clickedCard = event.target.closest('.card');
        if (clickedCard) {
            const movieId = clickedCard.dataset.movieId;
            // showMovieId(movieId);
                  // 새창 이동
                  let link = 'movie_detail.html?id=${id}'
                  location.href=link;
        }
    });
});
