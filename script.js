// Mobile Navigation Toggle with improved touch handling
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Improved mobile navigation
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Navbar background on scroll with mobile optimization
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links with mobile offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Adjust offset for mobile
            const isMobile = window.innerWidth <= 768;
            const offsetTop = target.offsetTop - (isMobile ? 100 : 80);
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced mobile animations with reduced motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !prefersReducedMotion.matches) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = prefersReducedMotion.matches ? 'none' : 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form handling with mobile optimization
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show success message in French
        showNotification('Merci ! Votre demande de rendez-vous a été soumise. Nous vous contacterons bientôt.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Enhanced notification system for mobile
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Fermer">&times;</button>
        </div>
    `;
    
    // Mobile-optimized styles
    const isMobile = window.innerWidth <= 768;
    notification.style.cssText = `
        position: fixed;
        top: ${isMobile ? '80px' : '100px'};
        ${isMobile ? 'left: 10px; right: 10px;' : 'right: 20px;'}
        background: ${type === 'success' ? '#2E7D32' : '#1976D2'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: ${isMobile ? 'none' : '400px'};
        animation: ${prefersReducedMotion.matches ? 'none' : 'slideInRight 0.3s ease'};
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            line-height: 1;
            min-width: 44px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.3s ease;
        }
        
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        @media (max-width: 768px) {
            .notification-close {
                min-width: 40px;
                min-height: 40px;
                font-size: 1.3rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Mobile-optimized parallax effect
window.addEventListener('scroll', () => {
    if (!prefersReducedMotion.matches) {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && window.innerWidth > 768) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    }
});

// Enhanced mobile touch interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('touchstart', function() {
        if (window.innerWidth <= 768) {
            this.style.transform = 'scale(0.98)';
        }
    });
    
    card.addEventListener('touchend', function() {
        if (window.innerWidth <= 768) {
            this.style.transform = 'scale(1)';
        }
    });
    
    // Desktop hover effects
    if (window.innerWidth > 768) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});

// Mobile-optimized testimonial cards
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('touchstart', function() {
        if (window.innerWidth <= 768) {
            this.style.transform = 'scale(0.98)';
        }
    });
    
    card.addEventListener('touchend', function() {
        if (window.innerWidth <= 768) {
            this.style.transform = 'scale(1)';
        }
    });
    
    // Desktop hover effects
    if (window.innerWidth > 768) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});

// Enhanced button interactions for mobile
document.querySelectorAll('.btn').forEach(button => {
    // Touch feedback for mobile
    button.addEventListener('touchstart', function() {
        if (window.innerWidth <= 768) {
            this.style.transform = 'scale(0.95)';
        }
    });
    
    button.addEventListener('touchend', function() {
        if (window.innerWidth <= 768) {
            this.style.transform = 'scale(1)';
        }
    });
    
    // Desktop click effects
    if (window.innerWidth > 768) {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Mobile-optimized loading animation
window.addEventListener('load', () => {
    if (!prefersReducedMotion.matches) {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
});

// Enhanced back to top button for mobile
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTopBtn.setAttribute('aria-label', 'Retour en haut');
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #2E7D32;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(46, 125, 50, 0.3);
    min-width: 44px;
    min-height: 44px;
`;

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile touch feedback for back to top button
backToTopBtn.addEventListener('touchstart', function() {
    if (window.innerWidth <= 768) {
        this.style.transform = 'scale(0.9)';
    }
});

backToTopBtn.addEventListener('touchend', function() {
    if (window.innerWidth <= 768) {
        this.style.transform = 'scale(1)';
    }
});

// Desktop hover effects for back to top button
if (window.innerWidth > 768) {
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 25px rgba(46, 125, 50, 0.4)';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(46, 125, 50, 0.3)';
    });
}

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Initialize tooltips for service icons
document.querySelectorAll('.service-icon').forEach(icon => {
    const serviceName = icon.parentElement.querySelector('h3').textContent;
    icon.title = serviceName;
});

// Mobile-optimized loading states for buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        if (this.textContent.includes('Prendre Rendez-vous')) {
            const originalText = this.textContent;
            this.textContent = 'Traitement...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Handle orientation change for mobile
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        // Recalculate any layout-dependent elements
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.transition = 'none';
            setTimeout(() => {
                navbar.style.transition = 'all 0.3s ease';
            }, 100);
        }
    }, 100);
});

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

console.log('Clinique Dentaire Sourire Éclatant - Page d\'accueil professionnelle mobile-optimisée chargée avec succès !'); 
