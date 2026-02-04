/* ============================================
   PBL15-HUE Main JavaScript
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initThemeToggle();
  initWelcomePopup();
  initBackToTop();
  initPosterCards();
  initCarousel();
  initAOS();
});

/* ---------- Theme Toggle ---------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  // Load saved theme or detect from time
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.textContent = '☀️';
  } else if (savedTheme === 'light') {
    document.body.classList.remove('dark');
    toggleBtn.textContent = '🌙';
  } else {
    // First time visitor - set theme based on time
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      document.body.classList.add('dark');
      toggleBtn.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      toggleBtn.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }

  // Toggle theme on click
  toggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

/* ---------- Welcome Popup ---------- */
function initWelcomePopup() {
  const popup = document.getElementById('welcomePopup');
  if (popup) {
    popup.classList.remove('hidden');
  }
}

function closePopup() {
  const popup = document.getElementById('welcomePopup');
  if (popup) {
    popup.classList.add('hidden');
  }
  
  // Auto-play video after closing popup
  const video = document.getElementById('mainVideo');
  if (video) {
    const src = video.src;
    if (!src.includes('autoplay=1')) {
      video.src = src.includes('?') ? src + '&autoplay=1' : src + '?autoplay=1';
    }
  }
}

/* ---------- Back to Top Button ---------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    const scrolled = document.body.scrollTop > 200 || document.documentElement.scrollTop > 200;
    backToTopBtn.style.display = scrolled ? 'block' : 'none';
  }, { passive: true });

  // Scroll to top on click
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Poster Cards Image Enhancement ---------- */
function initPosterCards() {
  document.querySelectorAll('.poster-card').forEach(function(card) {
    const desc = card.querySelector('p');
    const img = card.querySelector('img');
    if (desc && img && desc.textContent.trim().length < 60) {
      img.style.maxHeight = '350px';
    }
  });
}

/* ---------- Image Carousel ---------- */
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (!carousel || !prevBtn || !nextBtn) return;

  const scrollAmount = 316; // Image width + gap

  prevBtn.addEventListener('click', function() {
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', function() {
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  // Hover effects
  [prevBtn, nextBtn].forEach(function(btn) {
    btn.addEventListener('mouseenter', function() {
      btn.style.background = 'rgba(255,255,255,1)';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.background = 'rgba(255,255,255,0.8)';
    });
  });
}

/* ---------- Modal for Images ---------- */
function openModal(src) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  if (modal && modalImg) {
    modal.style.display = 'flex';
    modalImg.src = src;
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  if (modal && modalImg) {
    modal.style.display = 'none';
    modalImg.src = '';
  }
}

/* ---------- AOS (Animate on Scroll) ---------- */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }
}

/* ---------- Lazy Loading for Images ---------- */
// Native lazy loading is used via HTML attribute loading="lazy"
// This is a fallback for older browsers
if ('loading' in HTMLImageElement.prototype) {
  // Browser supports native lazy loading
  console.log('Native lazy loading supported');
} else {
  // Fallback: Load images when they come into view
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(function(img) {
    imageObserver.observe(img);
  });
}