export function sortMovies(movies, selectedValue) {
    let sortedMovies = movies.slice(); 
    switch (selectedValue) {
        case "name": // 이름 순으로 배열
        sortedMovies.sort((a, b) => {
            const nameA = a.title.toLowerCase();
            const nameB = b.title.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
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
  