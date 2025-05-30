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

    // Fitness Calculators
    const bmiCalculator = document.getElementById('bmi-calculator');
    const calorieCalculator = document.getElementById('calorie-calculator');

    if (bmiCalculator) {
        bmiCalculator.addEventListener('submit', function(e) {
            e.preventDefault();
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
            const bmi = weight / (height * height);
            const resultDiv = document.getElementById('bmi-result');
            
            let category;
            if (bmi < 18.5) category = 'Underweight';
            else if (bmi < 25) category = 'Normal weight';
            else if (bmi < 30) category = 'Overweight';
            else category = 'Obese';

            resultDiv.innerHTML = `
                <p>Your BMI: ${bmi.toFixed(1)}</p>
                <p>Category: ${category}</p>
            `;
            resultDiv.classList.add('show');
        });
    }

    if (calorieCalculator) {
        calorieCalculator.addEventListener('submit', function(e) {
            e.preventDefault();
            const age = parseInt(document.getElementById('age').value);
            const gender = document.getElementById('gender').value;
            const activity = document.getElementById('activity').value;
            
            // Basic BMR calculation using Mifflin-St Jeor Equation
            let bmr;
            if (gender === 'male') {
                bmr = 10 * 70 + 6.25 * 170 - 5 * age + 5; // Using average weight and height
            } else {
                bmr = 10 * 60 + 6.25 * 160 - 5 * age - 161;
            }

            // Activity multiplier
            const activityMultipliers = {
                sedentary: 1.2,
                light: 1.375,
                moderate: 1.55,
                very: 1.725
            };

            const tdee = bmr * activityMultipliers[activity];
            const resultDiv = document.getElementById('calorie-result');
            
            resultDiv.innerHTML = `
                <p>Your daily calorie needs:</p>
                <p>Maintenance: ${Math.round(tdee)} calories</p>
                <p>Weight Loss: ${Math.round(tdee - 500)} calories</p>
                <p>Weight Gain: ${Math.round(tdee + 500)} calories</p>
            `;
            resultDiv.classList.add('show');
        });
    }
});