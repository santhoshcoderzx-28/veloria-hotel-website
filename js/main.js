// ========== NAVBAR SCROLL ==========
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== MOBILE MENU ==========
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  // Close on link click
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

// ========== ACTIVE NAV LINK ==========
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ========== SCROLL REVEAL ==========
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ========== BOOKING BAR REDIRECT ==========
const bookingBtn = document.getElementById('bookingBtn');
if (bookingBtn) {
  bookingBtn.addEventListener('click', () => {
    const checkIn = document.getElementById('checkIn')?.value;
    const checkOut = document.getElementById('checkOut')?.value;
    const guests = document.getElementById('guests')?.value;
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates.');
      return;
    }
    window.location.href = `contact.html?checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`;
  });
}

// ========== GALLERY LIGHTBOX ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption p')?.textContent || '';
    if (img && lightbox) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});
if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox?.classList.contains('open')) closeLightbox();
});
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// ========== CONTACT FORM VALIDATION ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  // Pre-fill from URL params (from booking bar)
  const params = new URLSearchParams(window.location.search);
  if (params.get('checkin')) {
    const f = document.getElementById('formCheckin');
    if (f) f.value = params.get('checkin');
  }
  if (params.get('checkout')) {
    const f = document.getElementById('formCheckout');
    if (f) f.value = params.get('checkout');
  }
  if (params.get('guests')) {
    const f = document.getElementById('formGuests');
    if (f) f.value = params.get('guests');
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Clear errors
    document.querySelectorAll('.form-error').forEach(el => el.classList.remove('show'));

    const name = document.getElementById('formName');
    const email = document.getElementById('formEmail');
    const phone = document.getElementById('formPhone');
    const roomType = document.getElementById('formRoom');
    const msg = document.getElementById('formMessage');

    if (!name.value.trim()) {
      showError('nameError', 'Please enter your full name.'); valid = false;
    }
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showError('emailError', 'Please enter a valid email address.'); valid = false;
    }
    if (!phone.value.match(/^[0-9+\-\s]{7,15}$/)) {
      showError('phoneError', 'Please enter a valid phone number.'); valid = false;
    }
    if (roomType && !roomType.value) {
      showError('roomError', 'Please select a room type.'); valid = false;
    }

    if (valid) {
      const successMsg = document.getElementById('formSuccess');
      successMsg.classList.add('show');
      contactForm.reset();
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => successMsg.classList.remove('show'), 6000);
    }
  });
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.classList.add('show'); }
}

// ========== FAQ ACCORDION ==========
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  if (question) {
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  }
});

// ========== SET MIN DATE FOR DATE INPUTS ==========
const today = new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type="date"]').forEach(input => {
  input.min = today;
});
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');
if (checkInInput && checkOutInput) {
  checkInInput.addEventListener('change', () => {
    checkOutInput.min = checkInInput.value;
  });
}
