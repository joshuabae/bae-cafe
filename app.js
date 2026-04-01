// Enhanced aesthetic interactions for the cafe menu
document.addEventListener('DOMContentLoaded', function() {
    if (!isMobile()) {
        initHoverEffects();
        initSectionHighlighting();
        initParallaxHeader();
        initLoadingState();
    }
    initAccessibilityFeatures();
    initThemeToggle();
    setTimeout(function() {
        showEventBanner();
    }, 5000);
});

// Enhanced hover effects for menu items
function initHoverEffects() {
    const menuSections = document.querySelectorAll('.menu-section');

    menuSections.forEach(section => {
        const items = section.querySelectorAll('.menu-item');

        items.forEach(item => {
            item.addEventListener('mouseenter', function() {
                section.style.boxShadow = '0 12px 48px rgba(61, 41, 20, 0.15)';
            });

            item.addEventListener('mouseleave', function() {
                section.style.boxShadow = '0 8px 32px rgba(61, 41, 20, 0.08)';
            });
        });
    });
}

// Add accessibility features
function initAccessibilityFeatures() {
    const sections = document.querySelectorAll('.menu-section');
    sections.forEach((section) => {
        const title = section.querySelector('.section-title').textContent;
        section.setAttribute('aria-label', `Menu section: ${title}`);
        section.setAttribute('role', 'region');
    });
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

// Add elegant loading state
function initLoadingState() {
    document.body.style.opacity = '0';

    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    });
}

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

// Dark mode toggle
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const saved = localStorage.getItem('theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    }
    updateToggleIcon(toggle);

    toggle.addEventListener('click', function() {
        const isDark = getEffectiveTheme() === 'dark';
        const next = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateToggleIcon(toggle);
    });
}

function getEffectiveTheme() {
    const manual = document.documentElement.getAttribute('data-theme');
    if (manual) return manual;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateToggleIcon(toggle) {
    toggle.textContent = getEffectiveTheme() === 'dark' ? '☀️' : '🌙';
}

// Animated event banner
function showEventBanner() {
    var overlay = document.createElement('div');
    overlay.className = 'event-overlay';

    var banner = document.createElement('div');
    banner.className = 'event-banner';
    banner.innerHTML =
        '<div class="event-banner-icon">🍵</div>' +
        '<h3 class="event-banner-title">Traditional Chinese Tea Tasting</h3>' +
        '<p class="event-banner-detail">Today at 12 PM · Hosted by Bryan</p>' +
        '<p class="event-banner-sub">Join us in-house for a guided tasting of hand-selected Chinese teas. Experience the art of gongfu brewing and discover the stories behind each leaf.</p>' +
        '<p class="event-banner-teas">Lion Mountain Long Jing · High Mountain Oolong Tea</p>' +
        '<button class="event-banner-close">Got it!</button>';

    document.body.appendChild(overlay);
    document.body.appendChild(banner);

    requestAnimationFrame(function() {
        overlay.classList.add('visible');
        banner.classList.add('visible');
    });

    function dismiss() {
        banner.classList.remove('visible');
        overlay.classList.remove('visible');
        banner.addEventListener('transitionend', function() {
            banner.remove();
            overlay.remove();
        }, { once: true });
    }

    banner.querySelector('.event-banner-close').addEventListener('click', dismiss);
    overlay.addEventListener('click', dismiss);
}

// Error handling for graceful degradation
window.addEventListener('error', function(e) {
    console.warn('Menu app error:', e.message);
    document.body.style.opacity = '1';
});

// Export functions for potential testing or extension
window.CafeMenu = {
    initHoverEffects,
    initAccessibilityFeatures
};
