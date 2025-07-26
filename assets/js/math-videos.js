
const videoGrid = document.getElementById("videoGrid");
const videoPopup = document.getElementById("videoPopup");
const popupIframe = document.getElementById("popupIframe");

const apiKey = "AIzaSyCMPPi9ozCobJFNi5cUxMi9_CVkocGbkiM";
const channelId = "UC8IOLP9s2OIR2Y68zgZD1lg";  // TIENS-MathEducate Channel ID
const maxResults = 12;

fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`)
  .then(response => response.json())
  .then(data => {
    const videos = data.items.filter(item => item.id.kind === "youtube#video");
    videos.forEach(video => {
      const id = video.id.videoId;
      const tile = document.createElement("div");
      tile.className = "video-tile";
      tile.innerHTML = `<img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="Video Thumbnail">`;
      tile.addEventListener("click", () => playVideo(id));

      videoGrid.appendChild(tile);
    });
  });

function playVideo(videoId) {
  popupIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  videoPopup.style.display = "flex";
}

function closeVideo() {
  popupIframe.src = "";
  videoPopup.style.display = "none";
}
