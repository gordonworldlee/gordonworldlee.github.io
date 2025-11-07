// Lightning Effect for Zeus Page
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

        ctx.beginPath();
        ctx.moveTo(fromX, fromY);

        let x = fromX;
        let y = fromY;

        while (Math.hypot(x - toX, y - toY) > 5) {
            const angle = Math.atan2(toY - y, toX - x);
            const distance = Math.hypot(x - toX, y - toY);
            const randomAngle = angle + (Math.random() - 0.5) * 0.3;
            const step = Math.min(10, distance);

            x += Math.cos(randomAngle) * step;
            y += Math.sin(randomAngle) * step;

            ctx.lineTo(x, y);
        }

        ctx.stroke();
    }

    function createRandomLightning() {
        ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (Math.random() > 0.7) {
            const startX = Math.random() * canvas.width;
            const startY = 0;
            const endX = Math.random() * canvas.width;
            const endY = canvas.height;

            drawLightning(startX, startY, endX, endY, 20);
            drawLightning(startX, startY, endX, endY, 5);
        }
    }

    setInterval(createRandomLightning, 200);
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Star Generation
function generateStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;

    for (let i = 0; i < 100; i++) {
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

// Page Load Animation
window.addEventListener('load', () => {
    initLightning();
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
