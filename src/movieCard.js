// 영화 카드 생성 함수
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.movieId = movie.id;
    //movie 이미지 불러오기
    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieImg.alt = movie.title;
    //moive 제목 가져오기
    const movieTitle = document.createElement('h2');
    movieTitle.classList.add('movie-title');
    movieTitle.textContent = movie.title;
    /*//movie 내용 가져오기
    const movieContent = document.createElement('p');
    movieContent.classList.add('movie-content');
    movieContent.textContent = movie.overview;*/
    /*movie 평점 가져오기
    const movieRating = document.createElement('p');
    movieRating.classList.add('movie-rating');
    movieRating.textContent = `평점: ${movie.vote_average}`;*/
    //card에 각각의 요소를 추가
    card.appendChild(movieImg);
    card.appendChild(movieTitle);
    /*card.appendChild(movieContent);
    card.appendChild(movieRating);*/
    // 위 추가된 요소를 card로 return
    return card;
}