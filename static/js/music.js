
// Background music controller using Tone.js

let backgroundMusic;
let musicPlaying = false;

function initializeBackgroundMusic() {
    // Create audio player for the mp3 file
    backgroundMusic = new Tone.Player({
        url: "/static/audio/background-song.mp3",
        loop: true,
        volume: -10,
        autostart: true,
        onload: function() {
            console.log("Background music loaded successfully");
        },
        onerror: function(e) {
            console.error("Error loading background music:", e);
        }
    }).toDestination();
    
    // Set up music toggle button
    const musicBtn = document.getElementById('music-btn');
    
    document.addEventListener('DOMContentLoaded', function() {
        Tone.start().then(() => {
            if (backgroundMusic.loaded) {
                backgroundMusic.start();
                musicPlaying = true;
                if (musicBtn) {
                    musicBtn.classList.add('active');
                    musicBtn.innerHTML = '<i class="fas fa-music"></i>';
                    musicBtn.title = 'Turn Music Off';
                }
            }
        });
    });
    
    if (musicBtn) {
        musicBtn.addEventListener('click', function() {
            toggleBackgroundMusic();
        });
    }
}
