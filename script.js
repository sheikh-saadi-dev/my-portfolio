/* ========================================
   SHEIKH SAADI - PORTFOLIO JAVASCRIPT
   ======================================== */

// ===== LOADING SCREEN =====
const loadingText = document.getElementById('loadingText');
const loadingBar = document.getElementById('loadingBar');
const loadingPercentage = document.getElementById('loadingPercentage');
const loadingScreen = document.getElementById('loadingScreen');

const nameText = "SHEIKH SAADI";
nameText.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    loadingText.appendChild(span);
});

let progress = 0;
const loadingInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    
    loadingBar.style.width = progress + '%';
    loadingPercentage.textContent = Math.floor(progress) + '%';
    
    if (progress === 100) {
        clearInterval(loadingInterval);
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(initAnimations, 500);
        }, 500);
    }
}, 200);

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    initParticles();
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeToggle.classList.add('sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        themeToggle.classList.remove('sun');
    }
}

// ===== FONT SWITCHER =====
function toggleFontSwitcher() {
    document.getElementById('fontPanel').classList.toggle('active');
}

function changeFont(theme) {
    if (theme === 'default') {
        body.removeAttribute('data-font-theme');
    } else {
        body.setAttribute('data-font-theme', theme);
    }
    localStorage.setItem('fontTheme', theme);
    
    document.querySelectorAll('.font-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        }
    });
}

const savedFont = localStorage.getItem('fontTheme');
if (savedFont && savedFont !== 'default') {
    changeFont(savedFont);
}

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .skill-card, .project-card, .service-card, .why-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ===== PARTICLE BACKGROUND =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function getParticleColor() {
    const theme = body.getAttribute('data-theme');
    return theme === 'dark' ? '212, 175, 55' : '30, 58, 95';
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        const color = getParticleColor();
        ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const color = getParticleColor();
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.strokeStyle = `rgba(${color}, ${0.08 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== 3D TILT EFFECT =====
const heroImage = document.getElementById('heroImage');
heroImage.addEventListener('mousemove', (e) => {
    const rect = heroImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    heroImage.style.setProperty('--rotateX', rotateX + 'deg');
    heroImage.style.setProperty('--rotateY', rotateY + 'deg');
    heroImage.classList.add('tilt');
});
heroImage.addEventListener('mouseleave', () => {
    heroImage.classList.remove('tilt');
});

// ===== SCROLL REVEAL & COUNTER ANIMATIONS =====
function initAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                }, 30);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
}

// ===== LOAD PROJECTS FROM GITHUB =====
async function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    try {
        const response = await fetch(
            `https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.path}`
        );
        
        if (response.ok) {
            const projects = await response.json();
            renderProjects(projects);
        } else {
            throw new Error('Failed to fetch');
        }
    } catch (error) {
        console.log('Using default projects');
        renderProjects(getDefaultProjects());
    }
}

function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    grid.innerHTML = projects.map(project => `
        <div class="project-card reveal">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <a href="${project.url}" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
            <div class="project-info">
                <span class="project-tag">${project.tag}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.url}" class="btn-demo" target="_blank">
                    Live Demo <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `).join('');

    // Re-observe for animations
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('active');
                });
            }, { threshold: 0.15 });
            observer.observe(el);
        });
    }, 100);
}

function getDefaultProjects() {
    return [
        { id: 1, title: "Foodie's Kitchen - Restaurant Landing", tag: "Restaurant", description: "A modern landing page for a local restaurant.", image: "https://images.unsplash.com/photo-1555396273?w=600", url: "#" },
        { id: 2, title: "Glow Salon - Beauty Parlour", tag: "Beauty & Salon", description: "Elegant landing page for a beauty salon.", image: "https://images.unsplash.com/photo-1560066984?w=600", url: "#" },
        { id: 3, title: "MediCare Clinic - Health Center", tag: "Healthcare", description: "Professional landing page for a local clinic.", image: "https://images.unsplash.com/photo-1576091160399?w=600", url: "#" }
    ];
}

// Load projects when page loads
if (document.getElementById('projectsGrid')) {
    loadProjects();
}

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#10b981';
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        this.reset();
    }, 3000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== PARALLAX ON SCROLL =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    const heroImageEl = document.querySelector('.hero-image');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroImageEl.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ===== CLOSE FONT PANEL ON OUTSIDE CLICK =====
document.addEventListener('click', (e) => {
    const fontSwitcher = document.getElementById('fontSwitcher');
    if (!fontSwitcher.contains(e.target)) {
        document.getElementById('fontPanel').classList.remove('active');
    }
});
