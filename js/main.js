// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards
const animatedElements = document.querySelectorAll(
    'section, .service-card, .project-card, .process-card, .benefit-card, .testimonial-card-large, .stat-item'
);

animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission (replace with actual API call)
        console.log('Form submitted:', data);

        // Show success message
        alert('Thank you for your message! I will get back to you soon.');

        // Reset form
        contactForm.reset();

        // In a real application, you would send this data to a server:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        })
        .catch(error => {
            alert('There was an error sending your message. Please try again.');
        });
        */
    });
}

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Parallax effect for testimonial float
const testimonialFloat = document.querySelector('.testimonial-float');

if (testimonialFloat) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (window.innerWidth > 750) {
            testimonialFloat.style.transform = `translateY(calc(-50% + ${rate}px))`;
        }
    });
}

// Add hover effect enhancement for project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 750) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// Prevent default behavior for "Get for Free" button (placeholder)
const getFreeButtons = document.querySelectorAll('.btn-primary:not([type="submit"])');
getFreeButtons.forEach(button => {
    if (button.textContent.trim() === 'Get for Free') {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('This is a demo portfolio. In production, this would link to your product or service.');
        });
    }
});

// Add loading animation when page loads
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 200);
});
