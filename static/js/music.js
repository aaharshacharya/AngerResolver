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
    // Create a synth for our background music
    backgroundMusic = new Tone.Synth({
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
    
    // Create a PolySynth for chords
    const chordSynth = new Tone.PolySynth(Tone.Synth).toDestination();
    chordSynth.volume.value = -15; // Lower volume
    
    // Create a pattern for happy melody
    const melody = ["C4", "E4", "G4", "C5", "B4", "G4", "E4", "A4", 
                    "F4", "A4", "C5", "F5", "E5", "C5", "A4", "G4"];
    
    // Create a loop for the melody
    const melodyLoop = new Tone.Sequence((time, note) => {
        backgroundMusic.triggerAttackRelease(note, "8n", time);
    }, melody, "4n");
    
    // Create chords to play occasionally
    const chords = [
        ["C4", "E4", "G4"], 
        ["F4", "A4", "C5"], 
        ["G4", "B4", "D5"], 
        ["A4", "C5", "E5"]
    ];
    
    // Create a loop for the chords
    const chordLoop = new Tone.Sequence((time, chord) => {
        chordSynth.triggerAttackRelease(chord, "2n", time);
    }, chords, "2m");
    
    // Start the transport and loops when music is toggled on
    backgroundMusic.onToggleMusic = function() {
        if (isMusicPlaying) {
            Tone.Transport.start();
            melodyLoop.start();
            chordLoop.start();
        } else {
            Tone.Transport.stop();
            melodyLoop.stop();
            chordLoop.stop();
        }
    };
    
    // Set the tempo
    Tone.Transport.bpm.value = 100;
}

// Toggle background music on/off
function toggleBackgroundMusic() {
    // We need to start audio context with user interaction
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
