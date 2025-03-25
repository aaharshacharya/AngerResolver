// 3D Animations for Long Distance Relationship Website
// Note: We're using globally loaded THREE and gsap from our CDN includes

// Global variables
let scene, camera, renderer, controls;
let ring1, ring2;
let messageBox;
let isAnimating = false;
let canvasContainer;


function init3DScene() {
    canvasContainer = document.getElementById('canvas-container');
    if (!canvasContainer) return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfff0f5);

    camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainer.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    createRings();
    createMessageBox();

    window.addEventListener('resize', onWindowResize);
    animate();

    // Add click event listener to the canvas
    renderer.domElement.addEventListener('click', onRingClick);
}

function onWindowResize() {
    const canvasContainer = document.getElementById('canvas-container');
    if (!canvasContainer || !camera || !renderer) return;

    camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
}

function createHeartShape() {
    const heartShape = new THREE.Shape();
    
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, 0.8, 1.4, 0.8, 1.4, 0);
    heartShape.bezierCurveTo(1.4, -1.2, 0, -1.6, 0, -0.8);
    heartShape.bezierCurveTo(0, -1.6, -1.4, -1.2, -1.4, 0);
    heartShape.bezierCurveTo(-1.4, 0.8, 0, 0.8, 0, 0);

    const geometry = new THREE.ExtrudeGeometry(heartShape, {
        depth: 0.3,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.1,
        bevelThickness: 0.1
    });

    const material = new THREE.MeshStandardMaterial({
        color: 0xff69b4,
        metalness: 0.4,
        roughness: 0.5,
    });

    const heart = new THREE.Mesh(geometry, material);
    heart.scale.set(0.4, 0.4, 0.4);
    heart.rotation.x = Math.PI;
    heart.position.y = 0.5;
    
    scene.add(heart);
    return heart;
}

function createRings() {
    const ringGeometry = new THREE.TorusGeometry(0.5, 0.05, 16, 100);
    const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.8,
        roughness: 0.2
    });

    ring1 = new THREE.Mesh(ringGeometry, goldMaterial);
    ring2 = new THREE.Mesh(ringGeometry.clone(), goldMaterial.clone());

    ring1.position.set(-1.5, 0, 0);
    ring2.position.set(1.5, 0, 0);

    scene.add(ring1);
    scene.add(ring2);
    
    // Create and add heart
    const heart = createHeartShape();
    heart.position.y = 1.5;
}

function createMessageBox() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 128;

    context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = '32px Arial';
    context.fillStyle = '#ff69b4';
    context.textAlign = 'center';
    context.fillText('Click to exchange rings!', canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
    });

    const geometry = new THREE.PlaneGeometry(4, 1);
    messageBox = new THREE.Mesh(geometry, material);
    messageBox.position.y = 2;
    scene.add(messageBox);
}

function animate() {
    requestAnimationFrame(animate);

    if (controls) controls.update();

    if (ring1 && !isAnimating) {
        ring1.rotation.y += 0.01;
    }

    if (ring2 && !isAnimating) {
        ring2.rotation.y += 0.01;
    }

    if (messageBox) {
        messageBox.position.y = 2 + Math.sin(Date.now() * 0.001) * 0.1;
    }

    renderer.render(scene, camera);
}

function onRingClick() {
    if (isAnimating) return;
    isAnimating = true;

    const duration = 2;
    const timeline = gsap.timeline({
        onComplete: () => {
            isAnimating = false;

            // Update message
            const canvas = messageBox.material.map.image;
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = 'rgba(255, 255, 255, 0.9)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = '32px Arial';
            context.fillStyle = '#ff69b4';
            context.textAlign = 'center';
            context.fillText('With this ring, I thee wed! 💍', canvas.width / 2, canvas.height / 2);
            messageBox.material.map.needsUpdate = true;
        }
    });

    timeline.to(ring1.position, {
        x: 0,
        y: 0,
        duration: duration,
        ease: "power2.inOut"
    })
    .to(ring2.position, {
        x: 0,
        y: 0,
        duration: duration,
        ease: "power2.inOut"
    }, "<")
    .to(ring1.rotation, {
        y: Math.PI * 2,
        duration: duration,
        ease: "power2.inOut"
    }, "<")
    .to(ring2.rotation, {
        y: Math.PI * 2,
        duration: duration,
        ease: "power2.inOut"
    }, "<");
}

// Create heart-shaped particles
function createHeartParticles() {
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        // Create shimmering particle
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 8, 8),
            new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.9, 0.8, 0.5),
                transparent: true,
                opacity: Math.random() * 0.5 + 0.3
            })
        );

        // Position particle randomly in a spherical area
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 2 + Math.random() * 3;

        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);

        // Store animation parameters
        particle.userData = {
            speed: Math.random() * 0.02 + 0.01,
            rotationAxis: new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).normalize(),
            rotationSpeed: Math.random() * 0.02 + 0.01,
            pulseSpeed: Math.random() * 0.01 + 0.005
        };

        scene.add(particle);
        heartParticles.push(particle);
    }
}

// Emit particles from heart on click
function emitLoveParticles() {
    const count = 20;
    for (let i = 0; i < count; i++) {
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 8, 8),
            new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.9, 1, 0.5),
                transparent: true,
                opacity: 1
            })
        );

        // Start from heart position
        //particle.position.copy(heartModel.position); // heartModel is removed

        // Add small random offset
        particle.position.x = (Math.random() - 0.5) * 0.5; //adjusting the origin of the particles
        particle.position.y = (Math.random() - 0.5) * 0.5;
        particle.position.z = (Math.random() - 0.5) * 0.5;

        scene.add(particle);
        heartParticles.push(particle);

        // Animate particle outward with GSAP
        gsap.to(particle.position, {
            x: particle.position.x + (Math.random() - 0.5) * 5,
            y: particle.position.y + (Math.random() - 0.5) * 5,
            z: particle.position.z + (Math.random() - 0.5) * 5,
            duration: 2,
            ease: "power3.out"
        });

        gsap.to(particle.material, {
            opacity: 0,
            duration: 2,
            ease: "power2.in",
            onComplete: () => {
                scene.remove(particle);
                particle.geometry.dispose();
                particle.material.dispose();
            }
        });
    }
}



// Play random love sound on interaction
function playLoveSound() {
    const messages = [
        "I miss you!",
        "Love you!",
        "Thinking of you!",
        "You're amazing!",
        "Can't wait to see you!",
        "Forever yours!",
        "Sending my love!",
        "You're my everything!"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    if (Tone && Tone.loaded) {
        // Create a soft piano note
        const synth = new Tone.Synth({
            oscillator: {
                type: "sine"
            },
            envelope: {
                attack: 0.02,
                decay: 0.2,
                sustain: 0.2,
                release: 1
            }
        }).toDestination();

        // Play a gentle note
        synth.volume.value = -10;
        synth.triggerAttackRelease("C5", "8n");

        // After short delay, play another note
        setTimeout(() => {
            synth.triggerAttackRelease("E5", "8n");
        }, 200);

        setTimeout(() => {
            synth.triggerAttackRelease("G5", "4n");
        }, 400);
    }

    // Show message
    showLoveMessage(randomMessage);
}

// Display a love message on screen
function showLoveMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('love-message');
    messageElement.textContent = message;

    // Position near the heart
    messageElement.style.left = `${Math.random() * 60 + 20}%`;
    messageElement.style.top = `${Math.random() * 60 + 20}%`;

    // Add to container
    canvasContainer.appendChild(messageElement);

    // Animate and remove
    gsap.fromTo(
        messageElement,
        { opacity: 0, scale: 0.5, y: 20 },
        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
            onComplete: () => {
                gsap.to(messageElement, {
                    opacity: 0,
                    y: -50,
                    scale: 1.5,
                    duration: 1.5,
                    delay: 1,
                    ease: "power2.in",
                    onComplete: () => {
                        messageElement.remove();
                    }
                });
            }
        }
    );
}

// Initialize countdown timer for upcoming meeting
function initCountdownTimer(targetDate) {
    const countdownElement = document.getElementById('countdown-timer');
    if (!countdownElement || !targetDate) return;

    function updateCountdown() {
        const currentDate = new Date();
        const difference = targetDate - currentDate;

        if (difference < 0) {
            countdownElement.textContent = "It's time! ❤️";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }

    // Update immediately
    updateCountdown();

    // Update every second
    setInterval(updateCountdown, 1000);
}

// Initialize memory wall
function initMemoryWall() {
    const memoryContainer = document.getElementById('memories-container');
    if (!memoryContainer) return;

    // Setup grid layout
    const grid = document.createElement('div');
    grid.classList.add('memory-grid');
    memoryContainer.appendChild(grid);

    // Add image placeholders
    for (let i = 0; i < 9; i++) {
        const memoryCard = document.createElement('div');
        memoryCard.classList.add('memory-card');

        // Add placeholder content
        memoryCard.innerHTML = `
            <div class="memory-placeholder">
                <i class="fas fa-plus"></i>
                <p>Add Memory</p>
            </div>
        `;

        grid.appendChild(memoryCard);

        // Add click handler to upload image
        memoryCard.addEventListener('click', () => {
            document.getElementById('memory-upload').click();
        });
    }

    // Set up file upload handler
    const uploadInput = document.createElement('input');
    uploadInput.type = 'file';
    uploadInput.id = 'memory-upload';
    uploadInput.accept = 'image/*';
    uploadInput.style.display = 'none';

    uploadInput.addEventListener('change', (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                // Find first empty card
                const emptyCard = document.querySelector('.memory-card:not(.filled)');
                if (emptyCard) {
                    emptyCard.classList.add('filled');
                    emptyCard.innerHTML = `
                        <div class="memory-image" style="background-image: url('${e.target.result}')"></div>
                        <div class="memory-overlay">
                            <i class="fas fa-heart"></i>
                        </div>
                    `;

                    // Add hover animation
                    emptyCard.addEventListener('mouseenter', () => {
                        gsap.to(emptyCard.querySelector('.memory-overlay'), {
                            opacity: 1,
                            duration: 0.3
                        });
                    });

                    emptyCard.addEventListener('mouseleave', () => {
                        gsap.to(emptyCard.querySelector('.memory-overlay'), {
                            opacity: 0,
                            duration: 0.3
                        });
                    });
                }
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    });

    document.body.appendChild(uploadInput);
}

// Initialize shared activities
function initSharedActivities() {
    const activitiesContainer = document.getElementById('activities-container');
    if (!activitiesContainer) return;

    const activities = [
        { name: "Watch Movie Together", icon: "fa-film", color: "#e74c3c" },
        { name: "Play Game", icon: "fa-gamepad", color: "#3498db" },
        { name: "Virtual Date", icon: "fa-utensils", color: "#2ecc71" },
        { name: "Listen to Music", icon: "fa-music", color: "#9b59b6" },
        { name: "Star Gazing", icon: "fa-star", color: "#f39c12" },
        { name: "Video Call", icon: "fa-video", color: "#1abc9c" }
    ];

    activities.forEach(activity => {
        const activityCard = document.createElement('div');
        activityCard.classList.add('activity-card');
        activityCard.style.backgroundColor = activity.color;

        activityCard.innerHTML = `
            <i class="fas ${activity.icon}"></i>
            <h3>${activity.name}</h3>
        `;

        activitiesContainer.appendChild(activityCard);

        // Add hover effect
        activityCard.addEventListener('mouseenter', () => {
            gsap.to(activityCard, {
                y: -10,
                boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                duration: 0.3
            });
        });

        activityCard.addEventListener('mouseleave', () => {
            gsap.to(activityCard, {
                y: 0,
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                duration: 0.3
            });
        });

        // Add click animation
        activityCard.addEventListener('click', () => {
            // Visual feedback
            gsap.to(activityCard.querySelector('i'), {
                scale: 1.5,
                duration: 0.2,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(activityCard.querySelector('i'), {
                        scale: 1,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.3)"
                    });
                }
            });

            // Show activity modal with details
            showActivityModal(activity);
        });
    });
}

// Show activity details modal
function showActivityModal(activity) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('activity-modal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'activity-modal';
        modal.classList.add('activity-modal');

        document.body.appendChild(modal);
    }

    // Update modal content
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-header" style="background-color: ${activity.color}">
                <i class="fas ${activity.icon} fa-3x"></i>
                <h2>${activity.name}</h2>
            </div>
            <div class="modal-body">
                <p>Plan a special ${activity.name.toLowerCase()} with your loved one!</p>
                <div class="modal-action">
                    <button class="btn-schedule">Schedule Now</button>
                    <button class="btn-invite">Send Invitation</button>
                </div>
            </div>
        </div>
    `;

    // Show modal with animation
    gsap.fromTo(
        modal,
        { opacity: 0, display: 'flex' },
        { opacity: 1, duration: 0.3 }
    );

    gsap.fromTo(
        modal.querySelector('.modal-content'),
        { y: 50, scale: 0.9 },
        { y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
    );

    // Add close handler
    const closeButton = modal.querySelector('.close-modal');
    closeButton.addEventListener('click', () => {
        gsap.to(modal, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                modal.style.display = 'none';
            }
        });
    });

    // Set up action buttons
    const scheduleButton = modal.querySelector('.btn-schedule');
    scheduleButton.addEventListener('click', () => {
        alert(`${activity.name} scheduled! Looking forward to it 💕`);
    });

    const inviteButton = modal.querySelector('.btn-invite');
    inviteButton.addEventListener('click', () => {
        alert(`Invitation for ${activity.name} sent to your loved one! 💌`);
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Try to initialize 3D scene
    if (typeof THREE !== 'undefined') {
        init3DScene();
    } else {
        console.error("THREE.js not loaded correctly");
    }

    // Initialize features
    const nextMeetingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Example: 30 days from now
    initCountdownTimer(nextMeetingDate);
    initMemoryWall();
    initSharedActivities();
});

// Make functions available globally
window.init3DScene = init3DScene;
window.pulseHeartAnimation = onRingClick;