// Animations for the web application

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
});

function initializeAnimations() {
    animateTitles();
    addFloatingEffect();
    animateEmojis();
    addPageTransitions();
    addScrollAnimations();
}

// Animate titles with bounce effect
function animateTitles() {
    const animatedTitles = document.querySelectorAll('.animated-title');
    animatedTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            title.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 200);
        
        setTimeout(() => {
            title.classList.add('bounce-animation');
        }, 1000);
    });
    
    // Add a slight delay for the subtitle
    const subtitles = document.querySelectorAll('.subtitle');
    subtitles.forEach((subtitle, index) => {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(-15px)';
        
        setTimeout(() => {
            subtitle.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 400 + (index * 200));
    });
}

// Add floating animation to elements
function addFloatingEffect() {
    const floatElements = document.querySelectorAll('.float-animation');
    floatElements.forEach(element => {
        // Already has float-animation class which has the CSS animation
        // Just ensure it starts properly
        element.style.animationDelay = Math.random() + 's';
    });
    
    // Add floating to gift icons
    const giftIcons = document.querySelectorAll('.gift-icon');
    giftIcons.forEach(icon => {
        icon.classList.add('float-animation');
        icon.style.animationDuration = (3 + Math.random() * 2) + 's';
    });
}

// Animate emojis with wiggle effect
function animateEmojis() {
    const emojis = document.querySelectorAll('.emoji');
    emojis.forEach(emoji => {
        // Already has the wiggle animation from the emoji class
        // Just add some randomness
        emoji.style.animationDelay = Math.random() + 's';
        emoji.style.animationDuration = (2 + Math.random()) + 's';
        
        // Add pulse effect on hover
        emoji.addEventListener('mouseenter', function() {
            addPulseEffect(this);
        });
    });
    
    // Make gift options interactive
    const giftOptions = document.querySelectorAll('.gift-option-btn');
    giftOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.gift-icon');
            if (icon) {
                shakeElement(icon);
            }
        });
    });
}

// Add subtle page transitions
function addPageTransitions() {
    // Fade in the content
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        contentWrapper.style.opacity = '0';
        contentWrapper.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            contentWrapper.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            contentWrapper.style.opacity = '1';
            contentWrapper.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Animate buttons to appear with delay
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            button.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        }, 600 + (index * 150));
    });
}

// Add scroll-based animations
function addScrollAnimations() {
    // Simple implementation for elements that need to animate as they scroll into view
    const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
    
    if (animateOnScroll.length > 0) {
        // Initial check for elements in view
        checkElementsInView();
        
        // Listen for scroll events
        window.addEventListener('scroll', checkElementsInView);
        
        function checkElementsInView() {
            animateOnScroll.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150; // Number of pixels from the viewport to start the animation
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('is-visible');
                }
            });
        }
    }
}

// Helper function to add pulse effect to an element
function addPulseEffect(element) {
    // Don't add if already pulsing
    if (element.classList.contains('pulsing')) return;
    
    element.classList.add('pulsing');
    
    // Set pulse animation
    const originalTransform = element.style.transform || '';
    element.style.animation = 'pulse 0.5s ease-in-out 2';
    
    // Remove class after animation completes
    setTimeout(() => {
        element.classList.remove('pulsing');
        element.style.animation = '';
    }, 1000);
}

// Helper function to shake an element
function shakeElement(element) {
    // Don't add if already shaking
    if (element.classList.contains('shaking')) return;
    
    element.classList.add('shaking');
    
    // Set shake animation
    const originalTransform = element.style.transform || '';
    element.style.animation = 'wiggle 0.5s ease-in-out';
    
    // Remove class after animation completes
    setTimeout(() => {
        element.classList.remove('shaking');
        element.style.animation = '';
    }, 500);
}