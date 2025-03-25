// Background music controller using Tone.js

let backgroundMusic;
let musicPlaying = false;

function initializeBackgroundMusic() {
    // Create audio player for the mp3 file
    backgroundMusic = new Tone.Player({
        url: "/static/audio/background-song.mp3",
        loop: true,
        volume: -10,
        autostart: false,
        onload: function() {
            console.log("Background music loaded successfully");
        },
        onerror: function(e) {
            console.error("Error loading background music:", e);
        }
    }).toDestination();
    
    // Set up music toggle button
    const musicBtn = document.getElementById('music-btn');
    
    if (musicBtn) {
        musicBtn.addEventListener('click', function() {
            toggleBackgroundMusic();
        });
    }
}

function createMelodyPlayer(synth) {
    // This is a fallback melody player if the MP3 file doesn't load
    const melody = [
        { note: 'C4', duration: '8n', time: 0 },
        { note: 'E4', duration: '8n', time: '8n' },
        { note: 'G4', duration: '8n', time: '4n' },
        { note: 'B4', duration: '8n', time: '4n + 8n' },
        { note: 'A4', duration: '8n', time: '2n' },
        { note: 'G4', duration: '8n', time: '2n + 8n' },
        { note: 'E4', duration: '2n', time: '2n + 4n' },
        { note: 'C4', duration: '8n', time: '1n' },
        { note: 'D4', duration: '8n', time: '1n + 8n' },
        { note: 'E4', duration: '8n', time: '1n + 4n' },
        { note: 'G4', duration: '8n', time: '1n + 4n + 8n' },
        { note: 'F4', duration: '2n', time: '1n + 2n' },
    ];
    
    const part = new Tone.Part((time, note) => {
        synth.triggerAttackRelease(note.note, note.duration, time);
    }, melody).start(0);
    
    part.loop = true;
    part.loopEnd = '2n + 2n';
    
    return {
        start: function() {
            Tone.Transport.start();
        },
        stop: function() {
            Tone.Transport.stop();
        }
    };
}

function toggleBackgroundMusic() {
    const musicBtn = document.getElementById('music-btn');
    
    if (!musicPlaying) {
        // Tone.js requires user interaction to start audio
        Tone.start().then(() => {
            if (backgroundMusic.loaded) {
                backgroundMusic.start();
                musicPlaying = true;
                if (musicBtn) {
                    musicBtn.classList.add('active');
                    musicBtn.innerHTML = '<i class="fas fa-music"></i>';
                    musicBtn.title = 'Turn Music Off';
                }
            } else {
                console.log("Still loading audio, please try again");
            }
        }).catch(e => {
            console.error("Error starting Tone.js:", e);
        });
    } else {
        backgroundMusic.stop();
        musicPlaying = false;
        if (musicBtn) {
            musicBtn.classList.remove('active');
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            musicBtn.title = 'Turn Music On';
        }
    }
}