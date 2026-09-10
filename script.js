/* ========================================
   SHEIKH SAADI - PORTFOLIO JAVASCRIPT
   ======================================== */

// ===== LOADING SCREEN =====
const loadingText = document.getElementById('loadingText');
const loadingBar = document.getElementById('loadingBar');
const loadingPercentage = document.getElementById('loadingPercentage');
const loadingScreen = document.getElementById('loadingScreen');

if (loadingText) {
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
}

// ===== DROPDOWN TOGGLE =====
function toggleDropdown(panelId) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    const allPanels = document.querySelectorAll('.dropdown-panel');
    
    allPanels.forEach(p => {
        if (p.id !== panelId) p.classList.remove('active');
    });
    
    panel.classList.toggle('active');
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.dropdown-panel').forEach(p => {
            p.classList.remove('active');
        });
    }
});

// ===== LANGUAGE SELECT =====
function selectLanguage(code, btn) {
    const badge = document.getElementById('currentLang');
    if (badge) badge.textContent = code;
    
    document.querySelectorAll('#langPanel .option-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    const panel = document.getElementById('langPanel');
    if (panel) panel.classList.remove('active');
    localStorage.setItem('selectedLang', code);
}

// ===== THEME SELECT =====
function selectTheme(theme, btn) {
    document.body.setAttribute('data-theme', theme);
    
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    const panel = document.getElementById('themePanel');
    if (panel) panel.classList.remove('active');
    localStorage.setItem('selectedTheme', theme);
}

// ===== FONT SELECT =====
function selectFont(font, btn) {
    document.body.setAttribute('data-font', font);
    
    document.querySelectorAll('#fontPanel .option-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    const panel = document.getElementById('fontPanel');
    if (panel) panel.classList.remove('active');
    localStorage.setItem('selectedFont', font);
}

// ===== MODE SELECT =====
function selectMode(mode, btn) {
    document.body.setAttribute('data-mode', mode);
    
    document.querySelectorAll('#modePanel .option-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    const panel = document.getElementById('modePanel');
    if (panel) panel.classList.remove('active');
    localStorage.setItem('selectedMode', mode);
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger) hamburger.classList.toggle('active');
    if (mobileMenu) mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger) hamburger.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ===== 3D TILT EFFECT =====
const heroImage = document.getElementById('heroImage');
if (heroImage) {
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
}

// ===== SCROLL REVEAL & COUNTER =====
function initAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
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

// ===== PARTICLE BACKGROUND =====
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function getParticleColor() {
        const mode = document.body.getAttribute('data-mode');
        const colors = {
            dark: '212, 175, 55',
            light: '59, 130, 246',
            sunlight: '249, 115, 22',
            sunset: '244, 63, 94',
            midnight: '99, 102, 241',
            forest: '16, 185, 129',
            ocean: '6, 182, 212',
            minimal: '148, 163, 184'
        };
        return colors[mode] || '212, 175, 55';
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
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const color = getParticleColor();
        
        particles.forEach(p => { p.update(); p.draw(); });

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
}

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .skill-card, .project-card, .service-card, .why-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ===== LOAD PROJECTS =====
async function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    let projects = null;

    // Try 1: Load from GitHub
    try {
        if (typeof GITHUB_CONFIG !== 'undefined' && GITHUB_CONFIG.username && GITHUB_CONFIG.username !== 'YOUR_GITHUB_USERNAME') {
            const url = `https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.path}`;
            const response = await fetch(url);
            if (response.ok) {
                projects = await response.json();
                console.log('✅ Loaded from GitHub');
            }
        }
    } catch (error) {
        console.log('GitHub fetch failed:', error);
    }

    // Try 2: Load from localStorage
    if (!projects || projects.length === 0) {
        const stored = localStorage.getItem('adminProjects');
        if (stored) {
            try {
                projects = JSON.parse(stored);
                console.log('✅ Loaded from localStorage');
            } catch (e) {
                console.log('localStorage parse error:', e);
            }
        }
    }

    // Try 3: Default projects
    if (!projects || projects.length === 0) {
        projects = getDefaultProjects();
        console.log('✅ Using default projects');
    }

    renderProjects(projects);
}

function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    grid.innerHTML = projects.map(project => `
        <div class="project-card reveal">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/600x400?text=No+Image'">
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
        { id: 1, title: "Foodie's Kitchen - Restaurant Landing", tag: "Restaurant", description: "A modern landing page for a local restaurant.", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop", url: "#" },
        { id: 2, title: "Glow Salon - Beauty Parlour", tag: "Beauty & Salon", description: "Elegant landing page for a beauty salon.", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop", url: "#" },
        { id: 3, title: "MediCare Clinic - Health Center", tag: "Healthcare", description: "Professional landing page for a local clinic.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop", url: "#" }
    ];
}

loadProjects();

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
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
}

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

// ===== PARALLAX =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    const heroImageEl = document.querySelector('.hero-image');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        if (heroImageEl) heroImageEl.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ===== LOAD PREFERENCES =====
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'gold';
    document.body.setAttribute('data-theme', savedTheme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === savedTheme);
    });
    
    const savedFont = localStorage.getItem('selectedFont') || 'default';
    document.body.setAttribute('data-font', savedFont);
    document.querySelectorAll('#fontPanel .option-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.font === savedFont);
    });
    
    const savedMode = localStorage.getItem('selectedMode') || 'dark';
    document.body.setAttribute('data-mode', savedMode);
    document.querySelectorAll('#modePanel .option-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === savedMode);
    });
    
    const savedLang = localStorage.getItem('selectedLang') || 'EN';
    const badge = document.getElementById('currentLang');
    if (badge) badge.textContent = savedLang;
});

console.log('✅ Portfolio Script Loaded!');
