// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileNav();
    initScrollReveal();
    initSkillBars();
    initCounters();
    initActiveNavLink();
    initContactForm();
    initSmoothScroll();
});

// ===== Navbar Scroll Effect =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ===== Mobile Navigation =====
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ===== Scroll Reveal Animation =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-header, .glass-card, .timeline-item, .project-card, .cert-card, .skill-category, .contact-card, .contact-form-wrapper, .contact-info'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ===== Skill Bar Animation =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
            }
        });
    }, {
        threshold: 0.3
    });

    skillBars.forEach(bar => observer.observe(bar));
}

// ===== Counter Animation =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 40;
    const duration = 1500;
    const stepTime = duration / 40;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// ===== Active Nav Link on Scroll =====
function initActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;

        // Animate button
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        // Simulate send
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)';
            submitBtn.style.opacity = '1';

            // Reset after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
            }, 2500);
        }, 1500);
    });
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Parallax Effect on Hero =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero-content');
    if (hero && scrollY < window.innerHeight) {
        hero.style.transform = `translateY(${scrollY * 0.15}px)`;
        hero.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
    }
});

// ===== Typing Effect for Hero Quote =====
(function initTypingEffect() {
    const quote = document.querySelector('.hero-quote');
    if (!quote) return;

    const text = quote.textContent;
    quote.textContent = '';
    quote.style.borderRight = '2px solid var(--accent-cyan)';

    let i = 0;
    const typeSpeed = 60;

    function typeWriter() {
        if (i < text.length) {
            quote.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            // Blink cursor then remove
            setTimeout(() => {
                quote.style.borderRight = 'none';
            }, 2000);
        }
    }

    // Start typing after a delay
    setTimeout(typeWriter, 1500);
})();

// ===== Mouse Cursor Glow Effect =====
(function initCursorGlow() {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(108, 92, 231, 0.06) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
})();
