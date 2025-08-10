// Import styles
import './style.css'

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initSmoothScrolling();
  initContactForm();
  initScrollAnimations();
  initNavbarScrollEffect();
  initScrollToTop();
  initActiveNavLinks();
  initPageLoader();
  initIntersectionObserver();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      }
    });
  });
}

// Contact form handling
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value
      };
      
      // Validate form
      if (validateForm(formData)) {
        // Show success message
        showMessage('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to your server
        console.log('Form submitted:', formData);
      }
    });
  }
}

// Form validation
function validateForm(data) {
  const requiredFields = ['firstName', 'lastName', 'email', 'message'];
  let isValid = true;
  
  // Remove existing error classes
  document.querySelectorAll('.form-control, .form-select').forEach(field => {
    field.classList.remove('is-invalid');
  });
  
  // Check required fields
  requiredFields.forEach(field => {
    if (!data[field] || data[field].trim() === '') {
      const fieldElement = document.getElementById(field);
      if (fieldElement) {
        fieldElement.classList.add('is-invalid');
        isValid = false;
      }
    }
  });
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    document.getElementById('email').classList.add('is-invalid');
    isValid = false;
  }
  
  if (!isValid) {
    showMessage('Please fill in all required fields correctly.', 'error');
  }
  
  return isValid;
}

// Show message function
function showMessage(message, type) {
  // Remove existing alerts
  const existingAlert = document.querySelector('.alert');
  if (existingAlert) {
    existingAlert.remove();
  }
  
  // Create new alert
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  // Insert alert at the top of the contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.parentNode.insertBefore(alertDiv, contactForm);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (alertDiv && alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 5000);
  }
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);
  
  // Observe cards and sections
  document.querySelectorAll('.card, .stats-card').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}

// Navbar scroll effect
function initNavbarScrollEffect() {
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

// Scroll to top button
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.remove('d-none');
      } else {
        scrollToTopBtn.classList.add('d-none');
      }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Active navigation links
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
}

// Page loader
function initPageLoader() {
  window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);
    
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => {
        if (loader.parentNode) {
          loader.remove();
        }
      }, 500);
    }, 1000);
  });
}

// Intersection Observer for animations
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll('.card, .stats-card, .feature-icon');
  elementsToAnimate.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
  // Add hover effects for buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Add parallax effect to hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
      const rate = scrolled * -0.3;
      heroSection.style.transform = `translateY(${rate}px)`;
    }
  });
});

// Counter animation for statistics
function animateCounters() {
  const counters = document.querySelectorAll('.stats-card .fs-2, .feature-icon + .fs-2');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    
    // Start animation when element is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(counter);
  });
}

// Initialize counter animations
document.addEventListener('DOMContentLoaded', animateCounters);

// Add typing effect for hero title (optional enhancement)
function initTypingEffect() {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    // Start typing effect after page load
    setTimeout(typeWriter, 1500);
  }
}

// Initialize typing effect
window.addEventListener('load', initTypingEffect);

// Add custom cursor effect (optional enhancement)
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    opacity: 0;
  `;
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.opacity = '0.5';
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '0.5';
  });
  
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
}

// Initialize custom cursor on desktop only
if (window.innerWidth > 768) {
  initCustomCursor();
}