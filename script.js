document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const animatedSections = document.querySelectorAll('.animated-section');
    const skillCards = document.querySelectorAll('.skill-card');

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for animations
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Animate timeline if it's in the section
                const timeline = entry.target.querySelector('.timeline');
                if (timeline) {
                    timeline.classList.add('visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    animatedSections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // 3D Tilt effect for skill cards
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = -y / 20;
            const rotateY = x / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});
