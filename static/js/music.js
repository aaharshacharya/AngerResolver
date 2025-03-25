// Background music player functionality

let backgroundMusic;
let isMusicPlaying = false;
const musicIcon = document.getElementById('music-icon');
const musicToggle = document.getElementById('music-toggle');

document.addEventListener('DOMContentLoaded', function() {
    initializeBackgroundMusic();
    
    // Add event listener to music toggle button
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleBackgroundMusic);
    }
});

// Initialize the background music
function initializeBackgroundMusic() {
    // Create an audio element for the background music
    backgroundMusic = new Audio('/static/audio/ahatamatarmusic.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    
    // We'll also keep the Tone.js synth for effects
    const synthEffect = new Tone.Synth({
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 0.1,
            decay: 0.2,
            sustain: 0.5,
            release: 0.8
        }
    }).toDestination();
    synthEffect.volume.value = -20; // Lower volume
    
    // Create a PolySynth for effect chords
    const chordSynth = new Tone.PolySynth(Tone.Synth).toDestination();
    chordSynth.volume.value = -25; // Lower volume
    
    // Create a pattern for happy melody effects
    const melody = ["C5", "E5", "G5"];
    
    // Set toggle function for our audio
    backgroundMusic.onToggleMusic = function() {
        if (isMusicPlaying) {
            backgroundMusic.play().catch(e => console.log("Audio play error:", e));
            
            // Play a little effect when turning on
            if (Tone.context.state === 'running') {
                synthEffect.triggerAttackRelease("C6", "16n");
                setTimeout(() => {
                    synthEffect.triggerAttackRelease("E6", "16n");
                }, 100);
                setTimeout(() => {
                    synthEffect.triggerAttackRelease("G6", "16n");
                }, 200);
            }
        } else {
            backgroundMusic.pause();
            
            // Play a little effect when turning off
            if (Tone.context.state === 'running') {
                synthEffect.triggerAttackRelease("G5", "16n");
                setTimeout(() => {
                    synthEffect.triggerAttackRelease("E5", "16n");
                }, 100);
                setTimeout(() => {
                    synthEffect.triggerAttackRelease("C5", "16n");
                }, 200);
            }
        }
    };
}

// Toggle background music on/off
function toggleBackgroundMusic() {
    // We need to start audio context with user interaction for Tone.js effects
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }
    
    isMusicPlaying = !isMusicPlaying;
    
    // Update the icon
    if (musicIcon) {
        if (isMusicPlaying) {
            musicIcon.className = 'fas fa-volume-up';
            musicToggle.classList.add('active');
        } else {
            musicIcon.className = 'fas fa-volume-mute';
            musicToggle.classList.remove('active');
        }
    }
    
    // Toggle the music
    if (backgroundMusic && backgroundMusic.onToggleMusic) {
        backgroundMusic.onToggleMusic();
    }
}

// Attempt to autoplay music (will likely be blocked by browsers)
document.addEventListener('click', function startMusicOnInteraction() {
    // Only try to autoplay once
    document.removeEventListener('click', startMusicOnInteraction);
    
    if (!isMusicPlaying) {
        toggleBackgroundMusic();
    }
}, { once: true });