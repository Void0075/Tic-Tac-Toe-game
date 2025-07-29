const audio = document.getElementById('bgAudio');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');

// Toggle mute
muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? '🔇' : '🔊';
});

// Volume control
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
    audio.muted = audio.volume === 0;
    muteBtn.textContent = audio.muted ? '🔇' : '🔊';
});