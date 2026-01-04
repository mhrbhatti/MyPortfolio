// Matrix rain effect
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charArray = chars.split('');

const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

let matrixInterval;

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

matrixInterval = setInterval(draw, 70);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Navigation
function enterMatrix() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('about').classList.add('active');
    document.getElementById('nav').classList.add('show');
}

function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');
}

function downloadCV() {
    window.open("Resume_HuzaifaBhatti_CS.pdf", "_blank");
}

// Create cursor glow
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

// Update cursor glow position
document.addEventListener('mousemove', function(e) {
    cursorGlow.style.left = (e.clientX - 10) + 'px';
    cursorGlow.style.top = (e.clientY - 10) + 'px';
});

// Mouse trail with Matrix characters
let trailTimeout;
document.addEventListener('mousemove', function(e) {
    clearTimeout(trailTimeout);
    trailTimeout = setTimeout(() => {
        const trail = document.createElement('div');
        trail.className = 'trail';
        trail.textContent = charArray[Math.floor(Math.random() * charArray.length)];
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 1000);
    }, 5);
});

// Click ripple effect
document.addEventListener('click', function(e) {
    // Create particle burst
    for (let i = 0; i < 12; i++) {
        createParticle(e.clientX, e.clientY, i);
    }
});

// Particle burst function
function createParticle(x, y, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);
    
    const angle = (index / 12) * Math.PI * 2;
    const velocity = 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let posX = x;
    let posY = y;
    let opacity = 1;
    
    const animate = () => {
        posX += vx * 0.05;
        posY += vy * 0.05;
        opacity -= 0.02;
        
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };
    
    animate();
}

// Disable right-click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('UNAUTHORIZED ACCESS ATTEMPT DETECTED');
});

// Blue Pill function - Matrix glitch and white screen
function activateBluePill() {
    startGlitchSequence();
}

function startGlitchSequence() {
    const body = document.body;
    const container = document.querySelector('.container');
    
    // Phase 1: Intense glitch effect
    body.classList.add('glitch-intense');
    
    // Phase 2: Screen distortion after 1 second
    setTimeout(() => {
        body.classList.add('screen-distort');
    }, 1000);
    
    // Phase 3: Matrix breakdown after 2 seconds
    setTimeout(() => {
        body.classList.add('matrix-breakdown');
        clearInterval(matrixInterval);
        matrixInterval = setInterval(() => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const char = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);
                drops[i] += Math.random() * 10;
            }
        }, 50);
    }, 2000);
    
    // Phase 4: White screen transition after 3 seconds
    setTimeout(() => {
        body.classList.add('white-screen');
        clearInterval(matrixInterval);
        canvas.style.display = 'none';
    }, 3000);
    
    // Phase 5: Show white screen message after 3.5 seconds
    setTimeout(() => {
        container.innerHTML = `
            <div class="white-screen-content">
                <h1 class="white-screen-title">SYSTEM TERMINATED</h1>
                <p class="white-screen-text">You chose comfort over truth...</p>
                <p class="white-screen-text">The Matrix has been shut down.</p>
                <p class="white-screen-text">Reality.exe has stopped working.</p>
                <br><br>
                <button class="restart-btn" onclick="restartReality()">RESTART REALITY</button>
            </div>
        `;
    }, 3500);
}

function restartReality() {
    sessionStorage.setItem("matrixReboot", "true");
    const wipeText = document.getElementById("memory-wipe");
    
    document.body.style.cursor = "none";
    document.body.style.pointerEvents = "none";
    
    wipeText.style.opacity = "1";
    
    setTimeout(() => {
        wipeText.textContent = "REMEMBER NOTHING";
        document.body.classList.add("fade-reality");
    }, 1500);
    
    setTimeout(() => {
        location.reload();
    }, 4200);
}

window.addEventListener("load", () => {
    if (sessionStorage.getItem("matrixReboot")) {
        sessionStorage.removeItem("matrixReboot");
        glitchReassemble();
    }
});

function glitchReassemble() {
    const elements = document.querySelectorAll(
        "h1, h2, h3, p, button, .pill, .terminal, canvas"
    );
    
    elements.forEach(el => {
        el.style.opacity = "0";
        el.style.filter = "blur(15px)";
        el.style.transform = `
            translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)
            skew(${Math.random() * 8 - 4}deg)
        `;
    });
    
    setTimeout(() => {
        elements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add("glitch-return");
                el.style.opacity = "1";
                el.style.filter = "none";
                el.style.transform = "none";
                
                setTimeout(() => {
                    el.classList.remove("glitch-return");
                }, 300);
            }, i * 50);
        });
    }, 600);
}

// Mobile optimization
function isMobile() {
    return window.innerWidth <= 768;
}

// Optimize matrix rain for mobile
if (isMobile()) {
    // Reduce matrix density on mobile
    const mobileColumns = Math.floor(canvas.width / (fontSize * 2));
    drops.length = mobileColumns;
    for (let i = 0; i < mobileColumns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    // Slower refresh rate on mobile for better performance
    clearInterval(matrixInterval);
    matrixInterval = setInterval(draw, 100); // Slower than 70ms
}

// Disable mouse effects on small mobile devices
if (window.innerWidth <= 480) {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mousemove', handleMouseTrail);
    if (cursorGlow) {
        cursorGlow.remove();
    }
}

// Touch event handling for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    // Swipe detection for mobile navigation
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Swipe left/right to toggle navigation
    if (Math.abs(diffX) > 100 && Math.abs(diffY) < 50) {
        const nav = document.getElementById('nav');
        if (nav.classList.contains('show')) {
            // Swiping left closes nav
            if (diffX > 0) {
                // Could add close functionality here if needed
            }
        }
    }
}, { passive: true });

// Prevent zoom on double tap (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Orientation change handler
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        location.reload(); // Reload to reset animations
    }, 100);
});

// Mobile menu toggle improvement
if (isMobile()) {
    const navButtons = document.querySelectorAll('.nav-terminal button');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Auto-hide nav after selection on mobile
            setTimeout(() => {
                if (window.innerWidth <= 768) {
                    const nav = document.getElementById('nav');
                    // nav.classList.remove('show'); // Uncomment if you want auto-hide
                }
            }, 300);
        });
    });
}

// Viewport height fix for mobile browsers (fixes 100vh issue)
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);
