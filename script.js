// Lightning Effect for Zeus Page
// Lightning Effect for Zeus Page - IMPROVED VERSION
function initLightning() {
    const canvas = document.getElementById('lightning-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawLightning(fromX, fromY, toX, toY, blur) {
        ctx.shadowBlur = blur;
        ctx.shadowColor = 'rgba(74, 144, 226, 0.8)';
        ctx.strokeStyle = 'rgba(74, 144, 226, 0.8)';
        ctx.lineWidth = blur / 10;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(fromX, fromY);

        let x = fromX;
        let y = fromY;

        while (Math.hypot(x - toX, y - toY) > 5) {
            const angle = Math.atan2(toY - y, toX - x);
            const distance = Math.hypot(x - toX, y - toY);
            
            // MORE JAGGED: Increased randomness and angle variation
            const randomAngle = angle + (Math.random() - 0.5) * 0.8; // Increased from 0.3
            const step = Math.min(15, distance); // Increased from 10
            
            // Add extra jagged offset
            const jaggerAmount = (Math.random() - 0.5) * 30; // Extra randomness
            
            x += Math.cos(randomAngle) * step;
            y += Math.sin(randomAngle) * step + jaggerAmount;

            ctx.lineTo(x, y);
        }

        ctx.stroke();
    }

    function createRandomLightning() {
        ctx.fillStyle = 'rgba(26, 26, 46, 0.08)'; // Slightly more transparent fade
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (Math.random() > 0.6) { // More frequent lightning (was 0.7)
            const startX = Math.random() * canvas.width;
            const startY = 0;
            const endX = Math.random() * canvas.width + (Math.random() - 0.5) * 200; // More horizontal variation
            const endY = canvas.height;

            // Draw multiple branches for more jagged effect
            drawLightning(startX, startY, endX, endY, 20);
            drawLightning(startX, startY, endX, endY, 8);
            drawLightning(startX, startY, endX, endY, 3); // Added thin branch
            
            // Random branch bolts
            if (Math.random() > 0.5) {
                const branchX = startX + (endX - startX) * 0.6;
                const branchY = startY + (endY - startY) * 0.6;
                drawLightning(branchX, branchY, Math.random() * canvas.width, canvas.height, 10);
            }
        }
    }

    setInterval(createRandomLightning, 150); // Faster updates (was 200ms)
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}



// Star Generation
function generateStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;

    for (let i = 0; i < 1000; i++) {
        const star = document.createElement('div');
        star.style.position = 'fixed';
        star.style.width = Math.random() * 2 + 'px';
        star.style.height = star.style.width;
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.zIndex = '-1';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        starsContainer.appendChild(star);
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

function initOcean() {
    const canvas = document.getElementById('ocean-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let waveOffset = 0;

    function drawOcean() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw water color
        ctx.fillStyle = '#003366';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw waves
        ctx.strokeStyle = '#0066cc';
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x += 5) {
            const y = canvas.height / 2 + Math.sin((x + waveOffset) * 0.02) * 30;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();

        // Add some whitecaps
        ctx.fillStyle = '#ffffff';
        for (let x = 0; x < canvas.width; x += 20) {
            const y = canvas.height / 2 + Math.sin((x + waveOffset) * 0.02) * 30;
            ctx.fillRect(x, y - 2, 2, 4);
        }

        waveOffset += 1;
        requestAnimationFrame(drawOcean);
    }

    drawOcean();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Call initOcean when the page loads
window.addEventListener('load', () => {
    initOcean();
    initLightning(); // Keep lightning for Zeus
    generateStars();
});


// Update Active Nav Link
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === window.location.pathname || 
            (window.location.pathname === '/' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

