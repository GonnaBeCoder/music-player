// References to HTML elements
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const volumeSlider = document.getElementById('volumeSlider');
const currentTimeLabel = document.getElementById('currentTime');
const totalTimeLabel = document.getElementById('totalTime');

// Audio Element
const audio = new Audio('"C:\VS CODES\html\music player\Imagine_Dragons_-_Bones_Official_Music_Video_(youconvert.net).mp3"');

// Variables to keep track of player state
let isPlaying = false;

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '▶️'; // Change icon to play
        console.log("Music paused");
    } else {
        audio.play();
        playPauseBtn.innerHTML = '⏸'; // Change icon to pause
        console.log("Music playing");
    }
    isPlaying = !isPlaying;
});

// Update progress bar and current time
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;

    // Update current time and total duration
    currentTimeLabel.textContent = formatTime(audio.currentTime);
    totalTimeLabel.textContent = formatTime(audio.duration);
});

// Skip to part of the song via progress bar
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    console.log("Seeked to: " + formatTime(seekTime));
});

// Volume control functionality
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
    console.log("Volume set to: " + volumeSlider.value);
});

// Previous and Next buttons (for demonstration purposes, skipping to start/end of song)
prevBtn.addEventListener('click', () => {
    audio.currentTime = 0; // Start song from the beginning
    console.log("Restarted song");
});

nextBtn.addEventListener('click', () => {
    audio.currentTime = audio.duration - 2; // Skip near the end of the song
    console.log("Skipped to end of song");
});

// Utility function to format time (MM:SS)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Load song details (could be dynamic in future)
audio.addEventListener('loadedmetadata', () => {
    totalTimeLabel.textContent = formatTime(audio.duration);
    console.log("Song loaded: " + formatTime(audio.duration));
});
