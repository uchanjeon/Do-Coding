//추가기능 - 출연진 / 예매하기 기능 다른 api에서 받아오기
let fetchData2 = (address) => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmFmYTFlODI1OGYwZDc3MWEwMzRjOWM3OTNiNjgzMCIsInN1YiI6IjY2MjZmZDQ4MTc2YTk0MDE3ZjgxMmVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NKjXh9Bx4UxPLwQzr6nBDrLrSEAQm89Mqcv8XlKgXms",
        },
    };
    const response = fetch(address, options);
    return response.then(res => res.json());
}

const clickedMovieId = localStorage.getItem("clickedidmovie");
let address = `https://api.themoviedb.org/3/movie/${clickedMovieId}?append_to_response=credits&language=en-US`

async function movieActors() {
    let data = await fetchData2(address);
    try {
        let actors = data['credits']['cast'];
        let actor10 = actors.map((cur, idx) => {
            if (idx < 10) {
                return cur["name"];
            }
        }).slice(0, 10);
        document.querySelector("#nav-profile").innerHTML = `
        <p class="card-text">감독</p>
        <p class="card-text">${data['credits']['crew'][0]['name']}</p>
        <p class="card-text">출연진 </p>
        <p class="card-text">${actor10}</p>`;
    } catch (error) {
        console.log(error);
    }
}

async function movieWatch() {
    let data = await fetchData2(address);
    try {
        document.querySelector("#nav-contact-tab").addEventListener('click', () => {
            window.open(data['homepage']);
        });
    } catch (error) {
        console.log(error);
    }
}

movieActors();
movieWatch();




// async function fetchMovieData2() {
//     const options = {
//         method: "GET",
//         headers: {
//             accept: "application/json",
//             Authorization:
//                 "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmFmYTFlODI1OGYwZDc3MWEwMzRjOWM3OTNiNjgzMCIsInN1YiI6IjY2MjZmZDQ4MTc2YTk0MDE3ZjgxMmVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NKjXh9Bx4UxPLwQzr6nBDrLrSEAQm89Mqcv8XlKgXms",
//         },
//     };
//     const clickedMovieId = localStorage.getItem("clickedidmovie");
//     let address = `https://api.themoviedb.org/3/movie/${clickedMovieId}?append_to_response=credits&language=en-US`

//     fetch(address, options)
//         .then(response => response.json())
//         .then(data => {
//             moveToActors(data);
//             moveToReserve(data);
//         })
// }

// let moveToReserve = (data) => {
//     document.querySelector("#nav-contact-tab").addEventListener('click', () => {
//         window.open(data['homepage']);
//     });
// }
// let moveToActors = (data) => {
//     let actors = data['credits']['cast']
//     let actor10 = actors.map((cur, idx) => {
//         if (idx < 10) {
//             return cur["name"];
//         }
//     }).slice(0, 10);
//     console.log(actor10);
//     document.querySelector("#nav-profile").innerHTML = `
//         <p class="card-text">감독</p>
//         <p class="card-text">${data['credits']['crew'][0]['name']}</p>
//         <p class="card-text">출연진 </p>
//         <p class="card-text">${actor10}</p>`;
// }

// fetchMovieData2();

