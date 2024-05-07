export function sortMovies(movies, selectedValue) {
    let sortedMovies = movies.slice(); 
    switch (selectedValue) {
      case "popular": //인기도순으로 배열
        sortedMovies.sort((a, b) => b.popularity - a.popularity);
        break;
      case "top_rated": // 평점순으로 배열
        sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case "release_date": //개봉일 순으로 배열
        sortedMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        break;
      default: //default는 전체부분임
        break;
    }
    return sortedMovies;
  }
  