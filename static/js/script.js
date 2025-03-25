// Main script for interactive behavior across the application

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips from Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add hover sound effects for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            playHoverSound();
        });
        
        button.addEventListener('click', function() {
            playClickSound();
        });
    });

    // Gift option buttons hover effect
    const giftButtons = document.querySelectorAll('.gift-option-btn');
    giftButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            playHoverSound();
            this.classList.add('pulse-animation');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('pulse-animation');
        });
    });

    // Create bouncing title animation
    const animatedTitles = document.querySelectorAll('.animated-title');
    animatedTitles.forEach(title => {
        title.classList.add('bounce-animation');
    });

    // Initialize decorative elements
    createHearts();
    createBalloons();
});

// Sound effect functions
function playHoverSound() {
    const hover = new Tone.Synth({
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 0.01,
            decay: 0.1,
            sustain: 0,
            release: 0.1
        }
    }).toDestination();
    
    hover.volume.value = -20; // Lower volume
    hover.triggerAttackRelease("C6", "16n");
}

function playClickSound() {
    const click = new Tone.Synth({
        oscillator: {
            type: "triangle"
        },
        envelope: {
            attack: 0.01,
            decay: 0.1,
            sustain: 0,
            release: 0.1
        }
    }).toDestination();
    
    click.volume.value = -15; // Lower volume
    click.triggerAttackRelease("G5", "8n");
}

// Function to create decorative hearts
function createHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    if (!heartsContainer) return;
    
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.opacity = Math.random() * 0.5 + 0.1;
        heart.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
        heart.style.animation = `float ${Math.random() * 6 + 4}s infinite ease-in-out ${Math.random() * 5}s`;
        
        heartsContainer.appendChild(heart);
    }
}

// Function to create decorative balloons
function createBalloons() {
    const balloonsContainer = document.querySelector('.balloons-container');
    if (!balloonsContainer) return;
    
    const balloonCount = 10;
    const balloonEmojis = ['🎈', '🎈', '🎈', '🎁', '✨', '🎉'];
    
    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.innerHTML = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
        balloon.style.fontSize = `${Math.random() * 20 + 15}px`;
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.top = `${Math.random() * 100}%`;
        balloon.style.opacity = Math.random() * 0.6 + 0.2;
        balloon.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
        balloon.style.animation = `float ${Math.random() * 8 + 5}s infinite ease-in-out ${Math.random() * 5}s`;
        
        balloonsContainer.appendChild(balloon);
    }
}

// Function to create confetti effect for celebration
function createConfetti() {
    const celebrationContainer = document.querySelector('.celebration-animation');
    if (!celebrationContainer) return;
    
    const confettiCount = 100;
    const colors = ['#ff6b6b', '#4ecdc4', '#ffbe0b', '#ff85a1', '#7209b7'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 5 + 3}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-10px';
        confetti.style.opacity = Math.random() * 0.8 + 0.2;
        
        // Create a unique animation for each confetti piece
        const animationDuration = Math.random() * 3 + 2;
        const horizontalMovement = Math.random() * 100 - 50;
        
        confetti.style.animation = `fallDown ${animationDuration}s forwards`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        
        // Create keyframes for this specific confetti
        const keyframes = `
            @keyframes fallDown {
                0% { transform: translateY(0) rotate(0deg); }
                100% { transform: translateY(400px) translateX(${horizontalMovement}px) rotate(${Math.random() * 360}deg); opacity: 0; }
            }
        `;
        
        // Add the keyframes to the document
        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
        
        celebrationContainer.appendChild(confetti);
    }
}

// Function to play success sound on final page
function playSuccessSound() {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synth.volume.value = -10; // Lower volume
    
    // Play a celebratory chord
    synth.triggerAttackRelease(["C4", "E4", "G4"], "8n");
    
    // Wait a bit and play another chord
    setTimeout(() => {
        synth.triggerAttackRelease(["C4", "F4", "A4"], "8n");
    }, 200);
    
    // Final chord
    setTimeout(() => {
        synth.triggerAttackRelease(["C4", "E4", "G4", "C5"], "2n");
    }, 400);
}
