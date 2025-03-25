// Main script file for interactive elements and effects

// Sound effects for interactions
let hoverSound, clickSound, successSound;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize sound effects
    hoverSound = new Tone.Player({
        url: "https://tonejs.github.io/audio/berklee/tap_mellow.mp3",
        volume: -10
    }).toDestination();
    
    clickSound = new Tone.Player({
        url: "https://tonejs.github.io/audio/berklee/tap_cool.mp3",
        volume: -5
    }).toDestination();
    
    successSound = new Tone.Player({
        url: "https://tonejs.github.io/audio/berklee/guitar_chord.mp3",
        volume: -5
    }).toDestination();
});

function playHoverSound() {
    if (hoverSound && hoverSound.loaded) {
        hoverSound.start();
    }
}

function playClickSound() {
    if (clickSound && clickSound.loaded) {
        clickSound.start();
    }
}

function playSuccessSound() {
    if (successSound && successSound.loaded) {
        successSound.start();
    }
}

// Create decorative heart elements
function createHearts() {
    const container = document.getElementById('hearts-container');
    if (!container) return;
    
    const heartCount = 15;
    const heartSVG = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="rgba(255, 99, 132, 0.7)"/>
        </svg>
    `;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = heartSVG;
        
        // Randomize position and animation
        const left = Math.random() * 100;
        const size = Math.random() * 20 + 10;
        const animDuration = Math.random() * 10 + 5;
        const animDelay = Math.random() * 5;
        
        heart.style.left = `${left}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.animation = `float ${animDuration}s ease-in-out ${animDelay}s infinite`;
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(heart);
    }
}

// Create decorative balloon elements
function createBalloons() {
    const container = document.getElementById('balloons-container');
    if (!container) return;
    
    const balloonCount = 8;
    const balloonColors = [
        'rgba(255, 99, 132, 0.7)', // pink
        'rgba(54, 162, 235, 0.7)',  // blue
        'rgba(255, 206, 86, 0.7)',  // yellow
        'rgba(75, 192, 192, 0.7)',  // teal
        'rgba(153, 102, 255, 0.7)'  // purple
    ];
    
    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        
        // Create balloon SVG
        const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        const balloonSVG = `
            <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0C7.5 0 1.5 6 1.5 13.5C1.5 21 7.5 30 15 36C22.5 30 28.5 21 28.5 13.5C28.5 6 22.5 0 15 0Z" fill="${color}"/>
                <path d="M15 36V40" stroke="gray" stroke-width="1.5"/>
            </svg>
        `;
        
        balloon.innerHTML = balloonSVG;
        
        // Randomize position and animation
        const left = Math.random() * 100;
        const size = Math.random() * 30 + 20;
        const animDuration = Math.random() * 15 + 10;
        const animDelay = Math.random() * 5;
        
        balloon.style.left = `${left}%`;
        balloon.style.top = `${Math.random() * 50}%`;
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.5}px`;
        balloon.style.animation = `float ${animDuration}s ease-in-out ${animDelay}s infinite`;
        
        container.appendChild(balloon);
    }
}

// Create confetti celebration effect
function createConfetti() {
    const confettiCount = 150;
    const container = document.body;
    const colors = [
        '#FF6B6B', '#4ECDC4', '#FFD166', '#FF8CC6', '#48BEFF', '#6A0572'
    ];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        
        // Position confetti
        confetti.style.top = '0';
        confetti.style.left = `${Math.random() * 100}%`;
        
        // Apply animation with random duration
        const animationDuration = Math.random() * 3 + 2;
        confetti.style.animation = `fall ${animationDuration}s linear forwards`;
        
        // Add rotation
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Add delay
        confetti.style.animationDelay = `${Math.random() * 1.5}s`;
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, animationDuration * 1000 + 2000);
    }
    
    // Play celebration sound
    setTimeout(() => {
        playSuccessSound();
    }, 200);
}