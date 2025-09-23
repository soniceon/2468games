// Common JavaScript for 2468 Game Online

// Dropdown menu functionality
function initializeDropdownMenu() {
    const menuIcon = document.getElementById('menuIcon');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (menuIcon && dropdownMenu) {
        // Toggle with click / keyboard
        const toggleMenu = (e) => {
            e.preventDefault();
            const willShow = !dropdownMenu.classList.contains('show');
            dropdownMenu.classList.toggle('show');
            dropdownMenu.setAttribute('aria-hidden', willShow ? 'false' : 'true');
            menuIcon.setAttribute('aria-expanded', willShow ? 'true' : 'false');
        };

        menuIcon.addEventListener('click', toggleMenu);
        menuIcon.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                toggleMenu(e);
            }
            if (e.key === 'Escape') {
                dropdownMenu.classList.remove('show');
                dropdownMenu.setAttribute('aria-hidden', 'true');
                menuIcon.setAttribute('aria-expanded', 'false');
                menuIcon.focus();
            }
        });
        
        document.addEventListener('click', function(e) {
            if (!dropdownMenu.contains(e.target) && e.target !== menuIcon) {
                dropdownMenu.classList.remove('show');
                dropdownMenu.setAttribute('aria-hidden', 'true');
                menuIcon.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading states to buttons
function initializeButtonStates() {
    document.querySelectorAll('button, .btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                this.disabled = true;
                
                // Remove loading state after a delay (for demo purposes)
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                }, 2000);
            }
        });
    });
}

// Common functions - initialization moved to index.html to avoid duplicate listeners

// Utility functions
const Utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format numbers with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Get random number between min and max
    random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils };
} 