// Main script for interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    createHearts();
    createBalloons();
    
    // Add hover sound effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', playHoverSound);
        button.addEventListener('click', playClickSound);
    });
    
    // Add gift selection functionality
    const giftOptions = document.querySelectorAll('.gift-option-btn');
    giftOptions.forEach(option => {
        option.addEventListener('click', function() {
            const giftValue = this.getAttribute('data-gift');
            const giftForm = document.getElementById('gift-form');
            if (giftForm) {
                const hiddenInput = giftForm.querySelector('input[name="gift"]');
                if (hiddenInput) {
                    hiddenInput.value = giftValue;
                }
                giftForm.submit();
            }
        });
    });
    
    // Add idea tag functionality for message suggestions
    const ideaTags = document.querySelectorAll('.idea-tag');
    ideaTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const messageText = this.textContent;
            const messageTextarea = document.getElementById('message-text');
            if (messageTextarea) {
                if (messageTextarea.value) {
                    messageTextarea.value += ' ' + messageText;
                } else {
                    messageTextarea.value = messageText;
                }
                messageTextarea.focus();
            }
        });
    });
    
    // Handle custom gift submission
    const customGiftForm = document.getElementById('custom-gift-form');
    if (customGiftForm) {
        customGiftForm.addEventListener('submit', function(e) {
            const customGiftInput = document.getElementById('custom-gift-input');
            if (customGiftInput && !customGiftInput.value.trim()) {
                e.preventDefault();
                alert('Please describe your gift wish!');
                customGiftInput.focus();
            } else {
                playSuccessSound();
            }
        });
    }
    
    // Add animation to confirmed gift on final page
    const confirmedGift = document.querySelector('.confirmed-gift');
    if (confirmedGift) {
        confirmedGift.classList.add('float-animation');
    }
    
    // Create confetti effect on final page
    const celebrationTitle = document.querySelector('.celebration-title');
    if (celebrationTitle) {
        createConfetti();
    }
});

// Sound effect functions
function playHoverSound() {
    const hoverSound = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 }
    }).toDestination();
    hoverSound.volume.value = -20;
    hoverSound.triggerAttackRelease('C6', '32n');
}

function playClickSound() {
    const clickSound = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 }
    }).toDestination();
    clickSound.volume.value = -15;
    clickSound.triggerAttackRelease('G5', '16n');
}

function playSuccessSound() {
    const successSynth = new Tone.PolySynth(Tone.Synth).toDestination();
    successSynth.volume.value = -15;
    successSynth.triggerAttackRelease(['C5', 'E5', 'G5'], '8n');
    setTimeout(() => {
        successSynth.triggerAttackRelease(['D5', 'F5', 'A5'], '8n');
    }, 150);
    setTimeout(() => {
        successSynth.triggerAttackRelease(['E5', 'G5', 'B5'], '8n');
    }, 300);
    setTimeout(() => {
        successSynth.triggerAttackRelease(['C6'], '4n');
    }, 450);
}

// Visual effect functions
function createHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    if (!heartsContainer) return;
    
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('img');
        heart.src = '/static/images/heart.svg';
        heart.alt = '♥';
        heart.className = 'heart';
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        heart.style.left = `${left}%`;
        heart.style.top = `${top}%`;
        
        // Random size
        const size = 15 + Math.random() * 20;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        
        // Random animation duration
        const duration = 5 + Math.random() * 10;
        heart.style.animation = `float ${duration}s infinite ease-in-out ${Math.random() * 5}s`;
        
        heartsContainer.appendChild(heart);
    }
}

function createBalloons() {
    const balloonsContainer = document.querySelector('.balloons-container');
    if (!balloonsContainer) return;
    
    const balloonCount = 8;
    
    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('img');
        balloon.src = '/static/images/balloon.svg';
        balloon.alt = '🎈';
        balloon.className = 'balloon';
        
        // Random position
        const left = Math.random() * 100;
        balloon.style.left = `${left}%`;
        balloon.style.top = `110%`; // Start below the screen
        
        // Random size
        const size = 40 + Math.random() * 30;
        balloon.style.width = `${size}px`;
        
        // Randomize animation
        const delay = Math.random() * 15;
        const duration = 15 + Math.random() * 20;
        balloon.style.animation = `float-up ${duration}s linear ${delay}s infinite`;
        
        balloonsContainer.appendChild(balloon);
    }
}

function createConfetti() {
    const container = document.querySelector('.content-wrapper');
    if (!container) return;
    
    const confettiCount = 100;
    const colors = ['#ff6b6b', '#4ecdc4', '#ffbe0b', '#a66cff', '#3bceac'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random color
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random position
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-10px';
        
        // Random size
        const size = 5 + Math.random() * 10;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        
        // Random rotation
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Animation
        const delay = Math.random() * 5;
        const duration = 4 + Math.random() * 4;
        confetti.style.animation = `fall ${duration}s linear ${delay}s`;
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, (delay + duration) * 1000);
    }
}