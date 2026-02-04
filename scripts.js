/* ============================================
   PBL15-HUE Premium Scripts
   Modern, Clean & Professional
   ============================================ */

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initThemeToggle();
  initNavbarScroll();
  initWelcomePopup();
  initBackToTop();
  initCarousel();
});

/* ---------- AOS Initialization ---------- */
function initAOS() {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
    disable: window.innerWidth < 768 ? 'mobile' : false
  });
}

/* ---------- Theme Toggle ---------- */
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Check time-based theme (dark between 6PM - 6AM)
  const hour = new Date().getHours();
  const isNightTime = hour >= 18 || hour < 6;
  
  if (savedTheme === 'dark' || (!savedTheme && (systemDark || isNightTime))) {
    html.classList.add('dark');
    toggle.textContent = '☀️';
  } else {
    toggle.textContent = '🌙';
  }
  
  toggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    toggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Add animation
    toggle.style.transform = 'rotate(360deg) scale(1.2)';
    setTimeout(() => {
      toggle.style.transform = '';
    }, 300);
  });
}

/* ---------- Navbar Scroll Effect ---------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = navbar.offsetHeight + 20;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ---------- Welcome Popup ---------- */
function initWelcomePopup() {
  const popup = document.getElementById('welcomePopup');
  const hasVisited = sessionStorage.getItem('welcomeShown');
  
  if (!hasVisited && popup) {
    setTimeout(() => {
      popup.classList.add('active');
      document.body.style.overflow = 'hidden';
    }, 1000);
  }
}

function closePopup() {
  const popup = document.getElementById('welcomePopup');
  if (popup) {
    popup.classList.remove('active');
    document.body.style.overflow = '';
    sessionStorage.setItem('welcomeShown', 'true');
  }
}

/* ---------- Back to Top ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  
  if (!btn) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
  
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ---------- Carousel ---------- */
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (!track || !prevBtn || !nextBtn) return;
  
  let scrollAmount = 0;
  const scrollStep = 300;
  
  const updateButtons = () => {
    const maxScroll = track.scrollWidth - track.parentElement.clientWidth;
    prevBtn.style.opacity = scrollAmount <= 0 ? '0.5' : '1';
    nextBtn.style.opacity = scrollAmount >= maxScroll ? '0.5' : '1';
  };
  
  prevBtn.addEventListener('click', () => {
    scrollAmount = Math.max(0, scrollAmount - scrollStep);
    track.style.transform = `translateX(-${scrollAmount}px)`;
    updateButtons();
  });
  
  nextBtn.addEventListener('click', () => {
    const maxScroll = track.scrollWidth - track.parentElement.clientWidth;
    scrollAmount = Math.min(maxScroll, scrollAmount + scrollStep);
    track.style.transform = `translateX(-${scrollAmount}px)`;
    updateButtons();
  });
  
  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  const handleSwipe = () => {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextBtn.click();
      } else {
        prevBtn.click();
      }
    }
  };
  
  updateButtons();
}

/* ---------- Modal Functions ---------- */
function openModal(src) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  
  if (modal && modalImg) {
    modalImg.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closePopup();
  }
});

/* ---------- Intersection Observer for Animations ---------- */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

document.querySelectorAll('.team-card, .poster-card, .article-card').forEach(el => {
  observer.observe(el);
});

/* ---------- Navbar Active Link ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar ul a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}, { passive: true });

/* ---------- Performance: Lazy Load Images ---------- */
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

/* ---------- Console Welcome Message ---------- */
console.log('%c🏥 PBL15-HUE', 'color: #0d9488; font-size: 24px; font-weight: bold;');
console.log('%cBreast Cancer Awareness Project', 'color: #7c3aed; font-size: 14px;');
console.log('%cMade with ❤️ by Abdelrahman Elgharib', 'color: #64748b; font-size: 12px;');
