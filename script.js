// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
}

// Product Filter (Products Page)
const filterBtns = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.product-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        
        // Filter products with fade animation
        productItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.animation = 'fadeIn 0.5s ease';
                item.classList.remove('hidden');
            } else {
                item.style.animation = 'none';
                item.classList.add('hidden');
            }
        });
    });
});

// Adoption Modal (Products Page)
const adoptBtns = document.querySelectorAll('.adopt-btn');
const adoptionModal = document.getElementById('adoptionModal');
const closeModal = document.getElementById('closeModal');
const continueBtn = document.getElementById('continueBtn');
const modalProductName = document.getElementById('modalProductName');

if (adoptBtns.length > 0) {
    adoptBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            modalProductName.textContent = productName;
            adoptionModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });
}

if (closeModal) {
    closeModal.addEventListener('click', function() {
        adoptionModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (continueBtn) {
    continueBtn.addEventListener('click', function() {
        adoptionModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
if (adoptionModal) {
    adoptionModal.addEventListener('click', function(e) {
        if (e.target === adoptionModal) {
            adoptionModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// FAQ Accordion (Contact Page)
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Contact Form Validation (Contact Page)
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(msg => {
            msg.textContent = '';
        });
        
        let isValid = true;
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const product = document.getElementById('product').value;
        const message = document.getElementById('message').value.trim();
        const agree = document.getElementById('agree').checked;
        
        // Name validation
        if (name.length < 3) {
            document.getElementById('nameError').textContent = 'Nama harus minimal 3 karakter';
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('emailError').textContent = 'Format email tidak valid';
            isValid = false;
        }
        
        // Phone validation
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone) || phone.length < 10) {
            document.getElementById('phoneError').textContent = 'Nomor telepon tidak valid';
            isValid = false;
        }
        
        // Product validation
        if (!product) {
            document.getElementById('productError').textContent = 'Pilih barang yang ingin diadopsi';
            isValid = false;
        }
        
        // Message validation
        if (message.length < 20) {
            document.getElementById('messageError').textContent = 'Pesan harus minimal 20 karakter';
            isValid = false;
        }
        
        // Agreement validation
        if (!agree) {
            alert('Mohon centang persetujuan untuk melanjutkan');
            isValid = false;
        }
        
        // If all valid, show success message
        if (isValid) {
            // Hide form
            contactForm.style.display = 'none';
            
            // Show success message
            successMessage.classList.add('active');
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Reset form after 5 seconds and show it again
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                successMessage.classList.remove('active');
            }, 5000);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error-message:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Real-time validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (this.value.trim().length > 0 && this.value.trim().length < 3) {
                document.getElementById('nameError').textContent = 'Nama harus minimal 3 karakter';
            } else {
                document.getElementById('nameError').textContent = '';
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value.trim().length > 0 && !emailRegex.test(this.value.trim())) {
                document.getElementById('emailError').textContent = 'Format email tidak valid';
            } else {
                document.getElementById('emailError').textContent = '';
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (this.value.trim().length > 0 && (!phoneRegex.test(this.value.trim()) || this.value.trim().length < 10)) {
                document.getElementById('phoneError').textContent = 'Nomor telepon tidak valid';
            } else {
                document.getElementById('phoneError').textContent = '';
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            const charCount = this.value.trim().length;
            if (charCount > 0 && charCount < 20) {
                document.getElementById('messageError').textContent = `${charCount}/20 karakter (minimal 20)`;
            } else {
                document.getElementById('messageError').textContent = '';
            }
        });
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.story-card, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add loading class to images
document.querySelectorAll('img').forEach(img => {
    img.classList.add('loading');
    img.addEventListener('load', function() {
        this.classList.remove('loading');
    });
});

// Console Easter Egg
console.log('%c👋 Halo Developer!', 'font-size: 20px; font-weight: bold; color: #d97706;');
console.log('%cSelamat datang di AdoptiFied - Marketplace Adopsi Barang Bermakna', 'font-size: 14px; color: #57534e;');
console.log('%c✨ Made by Love', 'font-size: 12px; color: #a8a29e; font-style: italic;');