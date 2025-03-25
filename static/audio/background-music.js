// Tone.js implementation of background music
// This file is imported by music.js and provides the musical patterns

// Define musical notes and patterns for the background music
const backgroundMusicPatterns = {
    // Happy, playful melody in C major
    happyMelody: {
        notes: ["C4", "E4", "G4", "C5", "B4", "G4", "E4", "C4", 
                "F4", "A4", "C5", "F4", "G4", "B4", "D5", "G4"],
        durations: ["8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n",
                    "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n"],
        tempo: 120
    },
    
    // Romantic, gentle melody in F major
    romanticMelody: {
        notes: ["F4", "A4", "C5", "F5", "E5", "C5", "A4", "F4",
                "G4", "Bb4", "D5", "G4", "A4", "C5", "F5", "E5"],
        durations: ["8n", "8n", "4n", "8n", "8n", "8n", "4n", "8n",
                    "8n", "8n", "4n", "8n", "8n", "8n", "4n", "8n"],
        tempo: 90
    },
    
    // Playful chord progression
    chordProgression: {
        chords: [
            ["C4", "E4", "G4"], // C major
            ["F4", "A4", "C5"], // F major
            ["G4", "B4", "D5"], // G major
            ["C4", "E4", "G4"]  // C major
        ],
        durations: ["2n", "2n", "2n", "2n"],
        tempo: 100
    }
};

// Function to create a melody player with Tone.js
function createMelodyPlayer(synth, pattern) {
    const notes = pattern.notes;
    const durations = pattern.durations;
    const tempo = pattern.tempo;
    
    // Create a sequence for the melody
    const melodySequence = new Tone.Sequence((time, index) => {
        synth.triggerAttackRelease(notes[index], durations[index], time);
    }, [...Array(notes.length).keys()], "8n");
    
    // Set the tempo
    Tone.Transport.bpm.value = tempo;
    
    return melodySequence;
}

// Function to create a chord player with Tone.js
function createChordPlayer(synth, pattern) {
    const chords = pattern.chords;
    const durations = pattern.durations;
    
    // Create a sequence for the chords
    const chordSequence = new Tone.Sequence((time, index) => {
        synth.triggerAttackRelease(chords[index], durations[index], time);
    }, [...Array(chords.length).keys()], "1m");
    
    return chordSequence;
}

// Export the patterns and player creation functions
export { 
    backgroundMusicPatterns, 
    createMelodyPlayer, 
    createChordPlayer 
};
