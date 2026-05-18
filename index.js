// Landing Page JavaScript - Form Handling & Interactions

// Smooth scroll for CTA buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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

// Form handling with localStorage simulation + success message
const form = document.getElementById('leadForm');
const formSuccessDiv = document.getElementById('formSuccess');
const resetFormBtn = document.getElementById('resetForm');

// Handle form submission
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const projectType = document.getElementById('project').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !phone) {
      alert('Please fill in all required fields (*)');
      return;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Phone validation (basic)
    const phonePattern = /^[\d\s\-\(\)\+]{10,}$/;
    if (!phonePattern.test(phone)) {
      alert('Please enter a valid phone number (at least 10 digits)');
      return;
    }
    
    // Simulate form submission (in real world, this would be an API call)
    console.log('Quote Request Submitted:', {
      name,
      email,
      phone,
      projectType,
      message,
      timestamp: new Date().toISOString()
    });
    
    // Store in localStorage for demo purposes
    const submissions = JSON.parse(localStorage.getItem('buildpro_quotes') || '[]');
    submissions.push({
      name,
      email,
      phone,
      projectType,
      message,
      date: new Date().toISOString()
    });
    localStorage.setItem('buildpro_quotes', JSON.stringify(submissions));
    
    // Show success message, hide form
    form.style.display = 'none';
    formSuccessDiv.classList.remove('hidden');
    
    // Optional: send to server via fetch (uncomment for real implementation)
    /*
    fetch('https://your-api.com/submit-quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, projectType, message })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
    */
    
    // Track conversion (for analytics - optional)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'generate_lead', {
        'event_category': 'form',
        'event_label': 'construction_quote'
      });
    }
  });
}

// Reset form to show again
if (resetFormBtn) {
  resetFormBtn.addEventListener('click', function() {
    form.reset();
    form.style.display = 'block';
    formSuccessDiv.classList.add('hidden');
    
    // Clear any error states
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.style.borderColor = '';
    });
  });
}

// Add simple animation on scroll (reveal elements)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe benefit cards, testimonial cards, FAQ items
document.querySelectorAll('.benefit-card, .testimonial-card, .faq-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Phone number formatting (as user types)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 10) {
      let formatted = '';
      if (value.length === 10) {
        formatted = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)}`;
      } else if (value.length > 10) {
        formatted = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)} ext ${value.slice(10)}`;
      } else {
        formatted = value;
      }
      e.target.value = formatted;
    }
  });
}

// Optional: Add a simple conversion pixel / tracking (analytics ready)
console.log('Landing Page Loaded - Construction/Manufacturing');