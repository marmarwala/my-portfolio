document.addEventListener('DOMContentLoaded', () => {
    const narutoGuide = document.getElementById('naruto-guide');
    const speechBubble = narutoGuide.querySelector('.speech-bubble');
    const reactionBubble = narutoGuide.querySelector('.reaction-bubble');
    const sections = document.querySelectorAll('section');

    const messages = {
        home: "Welcome to my ninja portfolio, dattebayo!",
        about: "Let me tell you about my ninja way!",
        work: "Check out my awesome jutsu projects!",
        contact: "Send me a message with your ninja courier!"
    };

    const showNarutoMessage = (message, bubble) => {
        bubble.textContent = message;
        bubble.style.opacity = '1';
        
        setTimeout(() => {
            bubble.style.opacity = '0';
        }, 3000); // Hide message after 3 seconds
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                showNarutoMessage(messages[sectionId] || "Believe it!", speechBubble);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Naruto reaction on touch/click
    let isReacting = false;
    narutoGuide.addEventListener('click', () => {
        if (!isReacting) {
            isReacting = true;
            showNarutoMessage("Don't touch me, dattebayo!", reactionBubble);
            narutoGuide.querySelector('img').style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                narutoGuide.querySelector('img').style.transform = 'translateX(0)';
                isReacting = false;
            }, 500);
        }
    });

    // ... Add any additional functionality (smooth scrolling, form handling, etc.) ...

    // Code toggle functionality
    document.querySelectorAll('.gallery-item').forEach(item => {
        const codeBlock = item.querySelector('pre');
        if (codeBlock) {
            const codeToggle = document.createElement('button');
            codeToggle.textContent = 'Show Jutsu';
            codeToggle.classList.add('jutsu-button');
            codeToggle.addEventListener('click', () => {
                codeBlock.style.display = codeBlock.style.display === 'none' ? 'block' : 'none';
                codeToggle.textContent = codeBlock.style.display === 'none' ? 'Show Jutsu' : 'Hide Jutsu';
                
                // Add a little animation when showing the jutsu
                if (codeBlock.style.display === 'block') {
                    codeBlock.style.opacity = '0';
                    setTimeout(() => {
                        codeBlock.style.transition = 'opacity 0.5s ease-in-out';
                        codeBlock.style.opacity = '1';
                    }, 10);
                }
            });
            item.insertBefore(codeToggle, codeBlock);
            codeBlock.style.display = 'none';
        }
    });

    function toggleJutsu(jutsuId) {
        const jutsuElement = document.getElementById(jutsuId);
        if (jutsuElement.style.display === "none" || jutsuElement.style.display === "") {
            jutsuElement.style.display = "block";
        } else {
            jutsuElement.style.display = "none";
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        const jutsuButton = document.querySelector('.jutsu-button');
        const jutsuCode = document.querySelector('.jutsu-code');
        
        jutsuButton.addEventListener('click', function() {
            if (jutsuCode.style.display === 'none' || jutsuCode.style.display === '') {
                jutsuCode.style.display = 'block';
                this.textContent = 'Hide Jutsu';
            } else {
                jutsuCode.style.display = 'none';
                this.textContent = 'Show Jutsu';
            }
        });
    });

    console.log('Script loaded'); // Add this line to check if the script is loading
});

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('contactParticleCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `hsl(${Math.random() * 60 + 15}, 100%, 50%)`;  // Orange hues
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.1;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            if (particle.size <= 0.2) {
                particles.splice(index, 1);
                particles.push(new Particle());
            }
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
});
