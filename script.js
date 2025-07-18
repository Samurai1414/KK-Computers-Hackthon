// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true' || 
    (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
}

darkModeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('darkMode', html.classList.contains('dark'));
});

// Carousel functionality
let currentSlide = 0;
const carousel = document.getElementById('carousel');
const slides = carousel.children;
const totalSlides = slides.length;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Auto-advance carousel
setInterval(nextSlide, 5000);

// Scroll reveal animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('opacity-0');
    observer.observe(section);
});

// Add custom animation class
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 1s ease-out forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style); 

// Gallery Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(element) {
    const img = element.querySelector('img');
    lightboxImg.src = img.src;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Testimonials Carousel
let currentTestimonial = 0;
const testimonialSlider = document.getElementById('testimonial-slider');
const testimonials = testimonialSlider.children;
const totalTestimonials = testimonials.length;

function updateTestimonialCarousel() {
    testimonialSlider.style.transform = `translateX(-${currentTestimonial * 100}%)`;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateTestimonialCarousel();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonialCarousel();
}

// Auto-advance testimonials
setInterval(nextTestimonial, 6000);

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);
    
    try {
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formProps);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error sending your message. Please try again later.');
    }
}); 

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('active');
});

// Dynamic Navbar Behavior
const navbar = document.getElementById('dynamic-navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Shrink navbar on scroll down
    if (currentScrollY > lastScrollY) {
        navbar.style.transform = 'translate(-50%, 0) scale(0.95)';
    } else {
        navbar.style.transform = 'translate(-50%, 0) scale(1)';
    }
    
    lastScrollY = currentScrollY;
});

// Scroll Progress Indicator
const createScrollProgress = () => {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-progress';
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        indicator.style.transform = `scaleX(${progress}%)`;
    });
};

createScrollProgress();

// Section Visibility Animation
const observeSection = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('animate-float')) {
                entry.target.style.animationDelay = Math.random() * 0.5 + 's';
            }
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    observeSection.observe(section);
});

// Add floating animation to cards
document.querySelectorAll('.team-card, .course-card').forEach(card => {
    card.classList.add('animate-float');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Active Section Indicator in Navbar
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const updateActiveSection = () => {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('text-white');
                link.classList.add('text-white/80');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.remove('text-white/80');
                    link.classList.add('text-white');
                    link.querySelector('.nav-indicator').style.transform = 'scaleX(1)';
                } else {
                    link.querySelector('.nav-indicator').style.transform = 'scaleX(0)';
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveSection);
updateActiveSection(); 