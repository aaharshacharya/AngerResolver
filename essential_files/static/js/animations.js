// Handles animations and visual effects throughout the application

function initializeAnimations() {
    // Set up each animation type
    animateTitles();
    addFloatingEffect();
    animateEmojis();
    addPageTransitions();
    addScrollAnimations();
}

function animateTitles() {
    // Add animations to titles
    const titles = document.querySelectorAll('.animated-title');
    
    titles.forEach(title => {
        // Add letter-by-letter animation
        const text = title.textContent;
        title.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ') {
                title.innerHTML += ' ';
                continue;
            }
            
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.animationDelay = `${i * 0.1}s`;
            span.classList.add('letter-animation');
            title.appendChild(span);
        }
    });
}

function addFloatingEffect() {
    // Add floating effect to elements with float-animation class
    const floatingElements = document.querySelectorAll('.float-animation');
    
    floatingElements.forEach(element => {
        // Randomize animation delay for natural effect
        const delay = Math.random() * 2;
        element.style.animationDelay = `${delay}s`;
    });
}

function animateEmojis() {
    // Add animations to emoji elements
    const emojis = document.querySelectorAll('.emoji');
    
    emojis.forEach(emoji => {
        emoji.classList.add('emoji-animation');
        
        // Add hover effect
        emoji.addEventListener('mouseenter', () => {
            shakeElement(emoji);
        });
    });
}

function addPageTransitions() {
    // Smooth transitions between pages
    document.querySelectorAll('a').forEach(link => {
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', function(e) {
                // Don't interfere with form submissions or special links
                if (this.getAttribute('href').startsWith('#') || 
                    this.getAttribute('target') === '_blank' ||
                    this.getAttribute('data-no-transition')) {
                    return;
                }
                
                e.preventDefault();
                const destination = this.href;
                
                // Fade out effect
                document.body.classList.add('page-transition-out');
                
                // Navigate after transition
                setTimeout(() => {
                    window.location.href = destination;
                }, 300);
            });
        }
    });
    
    // When page loads, add fade in
    window.addEventListener('pageshow', function() {
        document.body.classList.remove('page-transition-out');
        document.body.classList.add('page-transition-in');
        
        setTimeout(() => {
            document.body.classList.remove('page-transition-in');
        }, 300);
    });
}

function addScrollAnimations() {
    // Animate elements when they enter the viewport
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Initial check on page load
    checkElementsInView();
    
    // Check on scroll
    window.addEventListener('scroll', () => {
        checkElementsInView();
    });
    
    function checkElementsInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('is-visible');
            }
        });
    }
}

function addPulseEffect(element) {
    // Add a temporary pulse effect to an element
    element.classList.add('pulsating');
    
    setTimeout(() => {
        element.classList.remove('pulsating');
    }, 1000);
}

function shakeElement(element) {
    // Add temporary shake effect to an element
    element.classList.add('shaking');
    
    setTimeout(() => {
        element.classList.remove('shaking');
    }, 500);
}