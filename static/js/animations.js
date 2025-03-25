// Animation effects for the gift application

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
});

// Initialize all animations
function initializeAnimations() {
    // Animate titles with bounce effect
    animateTitles();
    
    // Add floating effect to buttons
    addFloatingEffect();
    
    // Animate emojis with wiggle
    animateEmojis();
    
    // Add page transition effects
    addPageTransitions();
    
    // Add scroll-based animations for elements
    addScrollAnimations();
}

// Bounce animation for titles
function animateTitles() {
    const titles = document.querySelectorAll('.animated-title');
    
    titles.forEach(title => {
        // Split the title text into individual letters
        const text = title.textContent;
        let newHtml = '';
        
        for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ') {
                newHtml += ' ';
            } else {
                // Create a span for each letter with a staggered animation delay
                newHtml += `<span class="letter" style="animation-delay: ${i * 0.05}s;">${text[i]}</span>`;
            }
        }
        
        // Keep the emoji if it exists
        const emojiSpan = title.querySelector('.emoji');
        let emojiHtml = '';
        
        if (emojiSpan) {
            emojiHtml = `<span class="emoji">${emojiSpan.textContent}</span>`;
        }
        
        // Replace the title content, keeping any emoji
        title.innerHTML = newHtml + emojiHtml;
        
        // Add the bounce effect to each letter
        const letters = title.querySelectorAll('.letter');
        letters.forEach(letter => {
            letter.style.display = 'inline-block';
            letter.style.animation = 'bounce 1s infinite ease-in-out';
        });
    });
}

// Add floating effect to buttons and specific elements
function addFloatingEffect() {
    const floatingElements = document.querySelectorAll('.float-animation, .btn-primary, .btn-outline-primary');
    
    floatingElements.forEach(element => {
        // Add a subtle float animation
        element.style.animation = 'float 3s infinite ease-in-out';
    });
}

// Animate emoji elements with wiggle effect
function animateEmojis() {
    const emojis = document.querySelectorAll('.emoji');
    
    emojis.forEach(emoji => {
        emoji.style.display = 'inline-block';
        emoji.style.animation = 'wiggle 2s infinite ease-in-out';
    });
}

// Add page transition effects
function addPageTransitions() {
    // Fade in the content when page loads
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        contentWrapper.style.opacity = '0';
        contentWrapper.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            contentWrapper.style.opacity = '1';
        }, 100);
    }
    
    // Add transition effects to links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (!link.classList.contains('btn')) {
            link.addEventListener('click', function(e) {
                // Don't apply to links with '#' which are used for internal page navigation
                if (this.getAttribute('href') && !this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const href = this.getAttribute('href');
                    
                    // Fade out current content
                    contentWrapper.style.opacity = '0';
                    
                    // Navigate after transition completes
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });
        }
    });
}

// Add animations triggered by scrolling
function addScrollAnimations() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.message-box, .gift-options, .custom-form, .message-form, .final-message-container');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-animation');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            element.style.transform = 'translateY(20px)';
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('fade-in-animation');
        });
    }
}

// CSS class for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-animation {
            animation: fadeIn 0.8s forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// Function to create pulse animation on elements
function addPulseEffect(element) {
    element.classList.add('pulse-animation');
    
    // Remove the animation class after it completes to allow it to be triggered again
    setTimeout(() => {
        element.classList.remove('pulse-animation');
    }, 1000);
}

// Function to create shake animation for alerts or important elements
function shakeElement(element) {
    element.classList.add('shake-animation');
    
    // Remove the animation class after it completes
    setTimeout(() => {
        element.classList.remove('shake-animation');
    }, 500);
    
    // Add the CSS for shake animation if it doesn't exist
    if (!document.querySelector('style.shake-style')) {
        const style = document.createElement('style');
        style.className = 'shake-style';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            
            .shake-animation {
                animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            }
        `;
        document.head.appendChild(style);
    }
}
