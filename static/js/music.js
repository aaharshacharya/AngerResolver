// Background music controller using Tone.js

let backgroundMusic;
let musicPlaying = false;

function initializeBackgroundMusic() {
    // Create a synth
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synth.volume.value = -20; // Lower volume
    
    // Create music player
    backgroundMusic = createMelodyPlayer(synth);
    
    // Set up music toggle button
    const musicBtn = document.getElementById('music-btn');
    
    if (musicBtn) {
        musicBtn.addEventListener('click', function() {
            toggleBackgroundMusic();
        });
    }
}

function createMelodyPlayer(synth) {
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
            backgroundMusic.start();
            musicPlaying = true;
            if (musicBtn) {
                musicBtn.classList.add('active');
                musicBtn.innerHTML = '<i class="fas fa-music"></i>';
                musicBtn.title = 'Turn Music Off';
            }
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