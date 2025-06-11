// Enhanced aesthetic interactions for the cafe menu
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initScrollAnimations();
    if (!isMobile()) {
        initHoverEffects();
        initAccessibilityFeatures();
        initTouchInteractions();
    }
});

// Smooth scroll-in animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe menu items for staggered animation
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Add CSS for animate-in class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Enhanced hover effects for menu items
function initHoverEffects() {
    const menuSections = document.querySelectorAll('.menu-section');
    
    menuSections.forEach(section => {
        const items = section.querySelectorAll('.menu-item');
        
        items.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // Add subtle glow effect to section
                section.style.boxShadow = '0 12px 48px rgba(61, 41, 20, 0.15)';
            });
            
            item.addEventListener('mouseleave', function() {
                // Reset section shadow
                section.style.boxShadow = '0 8px 32px rgba(61, 41, 20, 0.08)';
            });
        });
    });
}

// Add accessibility features
function initAccessibilityFeatures() {
    // Add ARIA labels to menu sections
    const sections = document.querySelectorAll('.menu-section');
    sections.forEach((section, index) => {
        const title = section.querySelector('.section-title').textContent;
        section.setAttribute('aria-label', `Menu section: ${title}`);
        section.setAttribute('role', 'region');
    });

    // Add keyboard navigation for menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'menuitem');
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                // Simulate click/selection effect
                this.style.background = 'rgba(156, 174, 156, 0.1)';
                setTimeout(() => {
                    this.style.background = '';
                }, 200);
            }
        });
    });

    // Add smooth focus indicators
    const style = document.createElement('style');
    style.textContent = `
        .menu-item:focus {
            outline: 2px solid #9cae9c;
            outline-offset: 2px;
            border-radius: 8px;
            background: rgba(156, 174, 156, 0.05);
        }
    `;
    document.head.appendChild(style);
}

// Add subtle parallax effect to header on scroll
function initParallaxHeader() {
    const header = document.querySelector('.menu-header');
    let ticking = false;
    
    function updateHeader() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        header.style.transform = `translateY(${rate}px)`;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Initialize parallax effect
initParallaxHeader();

// Add smooth section transitions when scrolling
function initSectionHighlighting() {
    const sections = document.querySelectorAll('.menu-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-active');
            } else {
                entry.target.classList.remove('section-active');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add CSS for active section highlighting
    const style = document.createElement('style');
    style.textContent = `
        .section-active {
            transform: translateY(-2px);
            box-shadow: 0 16px 64px rgba(61, 41, 20, 0.12);
        }
        
        .section-active::before {
            opacity: 1;
            height: 6px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize section highlighting
initSectionHighlighting();

// Add elegant loading state
function initLoadingState() {
    // Hide content initially
    document.body.style.opacity = '0';
    
    // Fade in content when loaded
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    });
}

// Initialize loading state
initLoadingState();

// Add touch-friendly interactions for mobile
function initTouchInteractions() {
    if ('ontouchstart' in window) {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.style.background = 'rgba(156, 174, 156, 0.05)';
            });
            
            item.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.background = '';
                }, 150);
            });
        });
    }
}

// Check if the device is mobile
function isMobile() {
    return window.matchMedia('(pointer: coarse), (max-width: 768px)').matches;
}

// Error handling for graceful degradation
window.addEventListener('error', function(e) {
    console.warn('Menu app error:', e.message);
    // Ensure basic functionality still works
    document.body.style.opacity = '1';
});

// Export functions for potential testing or extension
window.CafeMenu = {
    initScrollAnimations,
    initHoverEffects,
    initAccessibilityFeatures
};

// No changes needed for description column, as the script does not reference or render any description fields.