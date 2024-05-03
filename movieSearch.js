document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '5de1d12aba74214884d2a9132966a1b8';
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`;
  
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const movieCardsContainer = document.querySelector('.movieCards');
  
    // 영화 카드 생성 함수
    function createMovieCard(movie) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.movieId = movie.id; 
  
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieImg.alt = movie.title;
  
        const movieTitle = document.createElement('h2');
        movieTitle.classList.add('movie-title');
        movieTitle.textContent = movie.title;
  
        const movieContent = document.createElement('p');
        movieContent.classList.add('movie-content');
        movieContent.textContent = movie.overview;
  
        const movieRating = document.createElement('p');
        movieRating.classList.add('movie-rating');
        movieRating.textContent = `평점: ${movie.vote_average}`;
  
        card.appendChild(movieImg);
        card.appendChild(movieTitle);
        card.appendChild(movieContent);
        card.appendChild(movieRating);
  
        return card;
    }
  
    // 초기화 함수
    function restart() {
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
   restart();
    // 페이지 로드 시 초기화 함수 호출
  
    // 검색 함수
    function searchMovies(keyword) {
        const searchUrl = `https://api.themoviedb.org/3/search/movie?language=en-US&page=1&query=${keyword}&api_key=${apiKey}`;
  
        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                movieCardsContainer.innerHTML = '';
  
                if (data.results && data.results.length > 0) {
                    data.results.forEach(movie => {
                        const card = createMovieCard(movie);
                        movieCardsContainer.appendChild(card);
                    });
                } else {
                    movieCardsContainer.innerHTML = '검색 결과가 없습니다.';
                }
            })
            .catch(error => {
                console.error('에러 발생:', error);
                movieCardsContainer.innerHTML = '영화를 검색하는 중 에러가 발생했습니다.';
            });
    }
  
    // 검색 버튼 클릭 이벤트 리스너
    searchBtn.addEventListener('click', function () {
        const keyword = searchInput.value.trim();
        if (keyword !== '') {
            searchMovies(keyword); 
        } else {
            movieCardsContainer.innerHTML = '...!';
        }
    });
  
    // Enter 키로 클릭이랑 같은효과
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const keyword = searchInput.value.trim();
            if (keyword !== '') {
                searchMovies(keyword); 
            } else {
                movieCardsContainer.innerHTML = '검색어를 입력하세요.';
            }
        }
    });
  
    // 클릭된 영화 정보 확인 함수
    function showMovieId(movieId) {
        alert("영화의 ID: " + movieId);
    }
  
    // 각각의 영화 카드에 클릭 이벤트를 추가합니다.
    movieCardsContainer.addEventListener('click', function (event) {
        const clickedCard = event.target.closest('.card');
        if (clickedCard) {
            const movieId = clickedCard.dataset.movieId;
            showMovieId(movieId);
        }
    });
  });
  