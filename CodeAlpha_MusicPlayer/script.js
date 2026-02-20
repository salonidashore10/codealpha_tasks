const songs = [
    { title: "Neki ki Raftar", artist: "Muhammad Umair Abdul Rehman", src: "songs/song1.mp3" },
    { title: "Dil Dhadakne Do", artist: "Chamidu Sandaruwan", src: "songs/song2.mp3" },
    { title: "Rangin Sapne", artist: "Muhammad Umair Abdul Rehman", src: "songs/song3.mp3" },
    { title: "Saanjh Sunheri", artist: "Muhammad Umair Abdul Rehman", src: "songs/song4.mp3" },
    { title: "Tere Sang", artist: "Muhammad Umair Abdul Rehman", src: "songs/song5.mp3" },
    { title: "Sapne Khule", artist: "Nitesh Kumar", src: "songs/song6.mp3" },
    { title: "Khwaab Ka Musafir", artist: "Aryaman Singh", src: "songs/song7.mp3" },
    { title: "Tere Naal Zindagi", artist: "Chamidu Sandaruwan", src: "songs/song8.mp3" },
    { title: "Dil Da Mehmaan", artist: "Chamidu Sandaruwan", src: "songs/song9.mp3" },
    { title: "Tera Pyar Mera Junoon", artist: "Pixabay", src: "songs/song10.mp3" },
    { title: "Tera Roothna", artist: "Ashir", src: "songs/song11.mp3" }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");
const volumeSlider = document.getElementById("volume");

let songIndex = 0;
let isPlaying = false;

/* Load Song */
function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    updatePlaylist();
}

/* Play & Pause */
function playSong() {
    isPlaying = true;
    playBtn.textContent = "⏸";
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.textContent = "▶";
    audio.pause();
}

/* Next & Previous */
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playSong();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    playSong();
}

/* Progress Update */
audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

/* Seek */
progressContainer.addEventListener("click", e => {
    const width = progressContainer.clientWidth;
    audio.currentTime = (e.offsetX / width) * audio.duration;
});

/* Volume Control */
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

/* Autoplay */
audio.addEventListener("ended", nextSong);

/* Playlist */
function updatePlaylist() {
    playlistEl.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${song.title} - ${song.artist}`;
        if (index === songIndex) li.classList.add("active");
        li.onclick = () => {
            songIndex = index;
            loadSong(songIndex);
            playSong();
        };
        playlistEl.appendChild(li);
    });
}

/* Helpers */
function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}

/* Controls */
playBtn.onclick = () => isPlaying ? pauseSong() : playSong();
nextBtn.onclick = nextSong;
prevBtn.onclick = prevSong;

/* Init */
loadSong(songIndex);
audio.volume = volumeSlider.value;

const playlistBtn = document.getElementById("playlist-btn");
const playlistContainer = document.getElementById("playlist-container");

/* Toggle Playlist */
playlistBtn.addEventListener("click", () => {
    playlistContainer.classList.toggle("show");
});
