// Matrix Background Effect (plus subtil)
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

function drawMatrix() {
    ctx.fillStyle = 'rgba(13, 13, 13, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00d9ff';
    ctx.font = `${fontSize}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillText(text, x, y);
        
        if (y > canvas.height && Math.random() > 0.98) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 60);

// Resize canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Custom Cursor Trail
const cursorTrail = document.querySelector('.cursor-trail');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth following
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    cursorTrail.style.left = cursorX - 5 + 'px';
    cursorTrail.style.top = cursorY - 5 + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Hide cursor trail on mobile
if (window.innerWidth <= 768) {
    cursorTrail.style.display = 'none';
}

// Card hover effects
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animate progress bars on scroll
const progressBars = document.querySelectorAll('.progress-fill');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'progressLoad 1.5s ease-out forwards';
        }
    });
}, observerOptions);

progressBars.forEach(bar => {
    observer.observe(bar);
});

// Subtle glitch effect on title (moins agressif)
const glitchText = document.querySelector('.glitch-text');
let glitchInterval;

function randomGlitch() {
    const randomTime = Math.random() * 5000 + 3000; // Entre 3 et 8 secondes
    
    glitchInterval = setTimeout(() => {
        glitchText.style.animation = 'none';
        setTimeout(() => {
            glitchText.style.animation = 'subtleGlow 3s ease-in-out infinite alternate';
        }, 50);
        randomGlitch();
    }, randomTime);
}

randomGlitch();

// Interest items animation
const interestItems = document.querySelectorAll('.interest-item');

interestItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Social links ripple effect
const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Retirer e.preventDefault() pour que les liens fonctionnent
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(0, 217, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.left = e.offsetX + 'px';
        ripple.style.top = e.offsetY + 'px';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Typing effect for terminal prompt (subtil)
const terminalPrompts = document.querySelectorAll('.terminal-prompt');

terminalPrompts.forEach((prompt, index) => {
    const text = prompt.textContent;
    prompt.textContent = '';
    
    setTimeout(() => {
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                prompt.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    }, index * 200);
});

// Easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activé!
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 2000);
            konamiIndex = 0;
            
            console.log('%c🎮 KONAMI CODE ACTIVÉ! 🎮', 'font-size: 20px; color: #00d9ff;');
        }
    } else {
        konamiIndex = 0;
    }
});

// Console message
console.log('%c╔═══════════════════════════════════╗', 'color: #00d9ff;');
console.log('%c║   👋 Salut! T\'es curieux toi!   ║', 'color: #00d9ff;');
console.log('%c║   Essaie le code Konami... 🎮    ║', 'color: #00d9ff;');
console.log('%c╚═══════════════════════════════════╝', 'color: #00d9ff;');

// Smooth scroll (si tu ajoutes des sections plus tard)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Parallax effect léger sur scroll
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.header');
            
            if (header) {
                header.style.transform = `translateY(${scrolled * 0.3}px)`;
                header.style.opacity = 1 - (scrolled / 300);
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});
