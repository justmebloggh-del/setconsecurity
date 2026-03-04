// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbar = document.querySelector('.navbar');
            const navOffset = navbar ? navbar.offsetHeight : 70;
            const offsetTop = target.offsetTop - navOffset;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Form submission handling
const form = document.getElementById('enquiry-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Change button to loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Show success message
            alert('Thank you for your enquiry! We will get back to you shortly.');
            form.reset();
        } else {
            // Show error message
            alert('There was a problem sending your message. Please try again or contact us directly.');
        }
    } catch (error) {
        alert('There was a problem sending your message. Please try again or contact us directly.');
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .product-card, .portfolio-item, .sale-card, .mv-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Add animate class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Add staggered animation delay for grid items
document.querySelectorAll('.service-card, .product-card, .portfolio-item, .sale-card').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
});

// WhatsApp float button (optional enhancement)
const whatsAppBtn = document.createElement('a');
whatsAppBtn.href = 'https://wa.me/233241963600';
whatsAppBtn.target = '_blank';
whatsAppBtn.className = 'whatsapp-float';
whatsAppBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
whatsAppBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background-color: #25D366;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 30px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    z-index: 1000;
    transition: all 0.3s ease;
    text-decoration: none;
`;

whatsAppBtn.addEventListener('mouseenter', () => {
    whatsAppBtn.style.transform = 'scale(1.1)';
    whatsAppBtn.style.boxShadow = '0 6px 15px rgba(0,0,0,0.4)';
});

whatsAppBtn.addEventListener('mouseleave', () => {
    whatsAppBtn.style.transform = 'scale(1)';
    whatsAppBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
});

document.body.appendChild(whatsAppBtn);

console.log('SETCON SECURITY Website Loaded Successfully');
