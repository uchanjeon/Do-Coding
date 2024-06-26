const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmFmYTFlODI1OGYwZDc3MWEwMzRjOWM3OTNiNjgzMCIsInN1YiI6IjY2MjZmZDQ4MTc2YTk0MDE3ZjgxMmVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NKjXh9Bx4UxPLwQzr6nBDrLrSEAQm89Mqcv8XlKgXms",
  },
};
const clickedMovieId = localStorage.getItem("clickedidmovie");
let youtubeKey = "";
let address = `https://api.themoviedb.org/3/movie/${clickedMovieId}/videos?language=en-US`;
fetch(address, options)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data.results);
    youtubeTrailer = data.results.find((movie) => movie.type === "Trailer");
    // console.log(youtubeTrailer);
    onYouTubeIframeAPIReady();
  })
  .catch((err) => console.error(err));

// 2. This code loads the IFrame Player API code asynchronously.
const tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
let player;
function onYouTubeIframeAPIReady() {
  // console.log("clikced Movie Id : ", youtubeTrailer.key);
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: youtubeTrailer.key,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.pauseVideo(); //playVideo() or pauseVideo()
}

// 5. The API calls this function when the player's state changes.
const done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
