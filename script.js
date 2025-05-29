document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.querySelector('.nav-links'); // The actual UL

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active'); // Toggles the visibility of nav links
            burgerMenu.classList.toggle('open'); // Toggles the burger icon animation
        });

        // Close nav when a link is clicked (for single page navigation)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Check if the nav is open before trying to close
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    burgerMenu.classList.remove('open');
                }
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get header height to offset scroll position, preventing content from being hidden behind sticky header
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // -20 for a little extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Basic Contact Form Submission (Client-side only)
    // This is a very basic example and does not send data to a server.
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission

            // In a real application, you would send this data to a server.
            // For this basic example, we'll just show a message.
            const name = document.getElementById('contact-name').value.trim();
            if (name) {
                alert('Thank you for your message, ' + name + '! We will get back to you shortly.');
            } else {
                alert('Thank you for your message! We will get back to you shortly.');
            }

            this.reset(); // Clear the form fields
        });
    }

    // Testimonials Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        testimonialItems[index].classList.add('active');
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        });

        nextButton.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        });

        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
});