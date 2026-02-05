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
  initCounters();
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
  const toggle = document.getElementById('darkmode-toggle');
  const html = document.documentElement;
  
  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Check time-based theme (dark between 6PM - 6AM)
  const hour = new Date().getHours();
  const isNightTime = hour >= 18 || hour < 6;
  
  if (savedTheme === 'dark' || (!savedTheme && (systemDark || isNightTime))) {
    html.classList.add('dark');
    toggle.checked = true;
  } else {
    toggle.checked = false;
  }
  
  toggle.addEventListener('change', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
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

/* ---------- Article Modal Functions ---------- */
const articleContents = {
  brca: `
    <span class="modal-article-badge">
      <i class="fas fa-dna"></i> Medical Research
    </span>
    <h1 class="modal-article-title">Hormonal Contraception & BRCA Mutations</h1>
    <p class="modal-article-intro">
      This article explores the complex relationship between hormonal birth control and the risk of breast and ovarian cancer for women carrying BRCA1 or BRCA2 gene mutations.
    </p>
    
    <div class="modal-section">
      <h2 class="modal-section-title">
        <i class="fas fa-exclamation-triangle"></i> Risk Factors
      </h2>
      <div class="modal-cards-grid">
        <div class="modal-card">
          <h3 class="modal-card-title brca1">
            <i class="fas fa-dna"></i> BRCA1 Carriers
          </h3>
          <ul>
            <li>Up to 80% lifetime risk of breast cancer</li>
            <li>Higher risk of early-onset breast cancer</li>
            <li>40–60% risk of ovarian cancer</li>
          </ul>
        </div>
        <div class="modal-card">
          <h3 class="modal-card-title brca2">
            <i class="fas fa-dna"></i> BRCA2 Carriers
          </h3>
          <ul>
            <li>45–70% lifetime risk of breast cancer</li>
            <li>Increased risk of male breast cancer</li>
            <li>15–25% risk of ovarian cancer</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="modal-section">
      <h2 class="modal-section-title">
        <i class="fas fa-balance-scale"></i> Benefits & Risks
      </h2>
      <div class="modal-cards-grid">
        <div class="modal-card">
          <h3 class="modal-card-title benefit">
            <i class="fas fa-check-circle"></i> Benefits
          </h3>
          <ul>
            <li>May reduce ovarian cancer risk by up to 50%</li>
            <li>Helps regulate menstrual cycles</li>
            <li>Relieves menstrual pain and cramping</li>
          </ul>
        </div>
        <div class="modal-card">
          <h3 class="modal-card-title risk">
            <i class="fas fa-exclamation-circle"></i> Risks
          </h3>
          <ul>
            <li>Possible slight increase in breast cancer risk</li>
            <li>Risk varies by mutation type</li>
            <li>Duration of use affects risk level</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="modal-section">
      <h2 class="modal-section-title">
        <i class="fas fa-shield-alt"></i> Preventive Options
      </h2>
      <div class="modal-prevention-grid">
        <div class="modal-prevention-card">
          <div class="modal-prevention-icon">
            <i class="fas fa-user-shield"></i>
          </div>
          <h3>Risk-Reducing Surgery</h3>
          <ul>
            <li>Mastectomy: up to 90% risk reduction</li>
            <li>Oophorectomy reduces ovarian cancer risk</li>
          </ul>
        </div>
        <div class="modal-prevention-card">
          <div class="modal-prevention-icon">
            <i class="fas fa-pills"></i>
          </div>
          <h3>Preventive Medication</h3>
          <ul>
            <li>Tamoxifen (pre-menopause)</li>
            <li>Aromatase inhibitors (post-menopause)</li>
            <li>May reduce breast cancer risk by 50%</li>
          </ul>
        </div>
        <div class="modal-prevention-card">
          <div class="modal-prevention-icon">
            <i class="fas fa-stethoscope"></i>
          </div>
          <h3>Enhanced Screening</h3>
          <ul>
            <li>Breast exams every 6–12 months</li>
            <li>Annual MRI and mammogram</li>
            <li>Monthly self-examination</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="modal-section">
      <h2 class="modal-section-title">
        <i class="fas fa-clipboard-list"></i> Recommendations
      </h2>
      <div class="modal-recommendations">
        <ul>
          <li><strong>Consult specialists:</strong> Genetic counselors or oncologists for personalized advice.</li>
          <li><strong>Evaluate risks:</strong> Based on your personal and family medical history.</li>
          <li><strong>Consider alternatives:</strong> Non-hormonal options like copper IUDs or barrier methods.</li>
          <li><strong>Follow screening schedules:</strong> Regular checkups are crucial for early detection.</li>
          <li><strong>Maintain healthy lifestyle:</strong> Eat well, exercise regularly, avoid alcohol.</li>
        </ul>
      </div>
    </div>
    
    <div class="modal-section">
      <h2 class="modal-section-title">
        <i class="fas fa-comments"></i> Questions for Your Doctor
      </h2>
      <div class="modal-discussion">
        <ul>
          <li><i class="fas fa-question-circle"></i> What's the safest birth control method for me?</li>
          <li><i class="fas fa-question-circle"></i> Should I consider preventive surgery?</li>
          <li><i class="fas fa-question-circle"></i> What exams should I get and how often?</li>
          <li><i class="fas fa-question-circle"></i> Are there clinical trials I can join?</li>
          <li><i class="fas fa-question-circle"></i> What lifestyle changes reduce cancer risk?</li>
        </ul>
      </div>
    </div>
  `,
  
  progression: `
    <span class="modal-article-badge pink">
      <i class="fas fa-microscope"></i> Cancer Research
    </span>
    <h1 class="modal-article-title">Breast Cancer Progression & Birth Control</h1>
    <p class="modal-article-intro">
      Understanding how breast cancer develops through stages and exploring the complex relationship between hormonal contraception and cancer progression.
    </p>
    
    <div class="modal-section">
      <h2 class="modal-section-title">
        <i class="fas fa-layer-group"></i> Understanding Cancer Stages
      </h2>
      <div class="modal-stages-timeline">
        <div class="modal-stage-item modal-stage-0">
          <span class="modal-stage-number"><i class="fas fa-circle"></i> Stage 0</span>
          <h3>Non-invasive (DCIS)</h3>
          <p>Abnormal cells are present but haven't spread beyond the milk ducts.</p>
          <ul>
            <li>Often detected by mammogram</li>
            <li>Highly treatable with excellent prognosis</li>
            <li>5-year survival rate: ~100%</li>
          </ul>
        </div>
        
        <div class="modal-stage-item modal-stage-1">
          <span class="modal-stage-number"><i class="fas fa-circle"></i> Stage I</span>
          <h3>Early Invasive Cancer</h3>
          <p>Cancer has begun to invade surrounding tissue but remains small and localized.</p>
          <ul>
            <li>Tumor ≤ 2cm</li>
            <li>No lymph node involvement or minimal spread</li>
            <li>5-year survival rate: ~99%</li>
          </ul>
        </div>
        
        <div class="modal-stage-item modal-stage-2">
          <span class="modal-stage-number"><i class="fas fa-circle"></i> Stage II</span>
          <h3>Locally Advanced</h3>
          <p>Tumor has grown larger and/or spread to nearby lymph nodes.</p>
          <ul>
            <li>Tumor 2-5cm or spread to 1-3 lymph nodes</li>
            <li>Still considered early-stage</li>
            <li>5-year survival rate: ~93%</li>
          </ul>
        </div>
        
        <div class="modal-stage-item modal-stage-3">
          <span class="modal-stage-number"><i class="fas fa-circle"></i> Stage III</span>
          <h3>Regional Spread</h3>
          <p>Cancer has spread extensively to nearby lymph nodes or chest wall.</p>
          <ul>
            <li>Larger tumor or extensive lymph node involvement</li>
            <li>May involve chest wall or skin</li>
            <li>5-year survival rate: ~72%</li>
          </ul>
        </div>
        
        <div class="modal-stage-item modal-stage-4">
          <span class="modal-stage-number"><i class="fas fa-circle"></i> Stage IV</span>
          <h3>Metastatic Cancer</h3>
          <p>Cancer has spread to distant organs such as bones, liver, lungs, or brain.</p>
          <ul>
            <li>Treatment focuses on extending life and quality</li>
            <li>New therapies improving outcomes</li>
            <li>5-year survival rate: ~28%</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="modal-section">
      <h2 class="modal-section-title">
        <i class="fas fa-link"></i> Connection with Birth Control
      </h2>
      <div class="modal-connection-grid">
        <div class="modal-connection-card">
          <div class="modal-connection-icon positive">
            <i class="fas fa-shield-alt"></i>
          </div>
          <h3>Potential Benefits</h3>
          <p>Some studies suggest hormonal contraceptives may reduce ovarian and endometrial cancer risk by up to 50%.</p>
        </div>
        <div class="modal-connection-card">
          <div class="modal-connection-icon negative">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <h3>Potential Concerns</h3>
          <p>Long-term use may slightly increase breast cancer risk, especially in women with genetic predispositions.</p>
        </div>
        <div class="modal-connection-card">
          <div class="modal-connection-icon neutral">
            <i class="fas fa-balance-scale"></i>
          </div>
          <h3>Individual Factors</h3>
          <p>Risk varies based on age, duration of use, family history, and specific genetic mutations like BRCA.</p>
        </div>
      </div>
    </div>
    
    <div class="modal-section">
      <div class="modal-key-points">
        <h3><i class="fas fa-lightbulb"></i> Key Takeaways</h3>
        <ul>
          <li>
            <i class="fas fa-check"></i>
            <span><strong>Early detection saves lives:</strong> Regular screening can catch cancer at Stage 0 or I when survival rates are highest.</span>
          </li>
          <li>
            <i class="fas fa-check"></i>
            <span><strong>Risk is personal:</strong> The impact of birth control varies significantly based on individual risk factors and genetics.</span>
          </li>
          <li>
            <i class="fas fa-check"></i>
            <span><strong>Discuss with your doctor:</strong> Make informed decisions about contraception based on your complete medical history.</span>
          </li>
          <li>
            <i class="fas fa-check"></i>
            <span><strong>Lifestyle matters:</strong> Healthy habits can reduce cancer risk regardless of birth control choices.</span>
          </li>
          <li>
            <i class="fas fa-check"></i>
            <span><strong>Research continues:</strong> New studies are constantly improving our understanding of these relationships.</span>
          </li>
        </ul>
      </div>
    </div>
  `,
  
  safe: `
    <span class="modal-article-badge purple">
      <i class="fas fa-heart-pulse"></i> Health Guide
    </span>
    <h1 class="modal-article-title">Safe Use of Birth Control Pills</h1>
    <p class="modal-article-intro">
      Practical guidelines and tips to use hormonal birth control safely while minimizing potential health risks, including breast cancer risk.
    </p>
    
    <div class="modal-section">
      <h2 class="modal-section-title">
        <i class="fas fa-shield-heart"></i> Essential Safety Tips
      </h2>
      <div class="modal-tips-grid">
        <div class="modal-tip-card">
          <div class="modal-tip-number">1</div>
          <h3>Consult Your Doctor First</h3>
          <p>Always discuss your medical history, family history of cancer, and risk factors with a healthcare provider before starting any birth control.</p>
        </div>
        <div class="modal-tip-card">
          <div class="modal-tip-number">2</div>
          <h3>Know Your Options</h3>
          <p>Different formulations have different hormone levels. Low-dose pills or progestin-only options may be safer for some women.</p>
        </div>
        <div class="modal-tip-card">
          <div class="modal-tip-number">3</div>
          <h3>Monitor Duration of Use</h3>
          <p>Long-term use may slightly increase certain risks. Discuss optimal duration with your doctor and reassess periodically.</p>
        </div>
        <div class="modal-tip-card">
          <div class="modal-tip-number">4</div>
          <h3>Regular Health Screenings</h3>
          <p>Maintain regular breast exams and screenings. Early detection is key to managing any potential health issues.</p>
        </div>
        <div class="modal-tip-card">
          <div class="modal-tip-number">5</div>
          <h3>Report Side Effects</h3>
          <p>If you experience unusual symptoms like breast lumps, persistent pain, or changes, contact your healthcare provider immediately.</p>
        </div>
        <div class="modal-tip-card">
          <div class="modal-tip-number">6</div>
          <h3>Lifestyle Matters</h3>
          <p>Combine birth control use with healthy habits: regular exercise, balanced diet, limited alcohol, and no smoking.</p>
        </div>
      </div>
    </div>
    
    <div class="modal-section">
      <div class="modal-warning-box">
        <i class="fas fa-triangle-exclamation"></i>
        <p><strong>Important:</strong> Women with BRCA1/BRCA2 mutations, strong family history of breast cancer, or previous breast cancer should discuss alternative contraception methods with their healthcare provider before using hormonal birth control.</p>
      </div>
    </div>
    
    <div class="modal-section">
      <h2 class="modal-section-title">
        <i class="fas fa-arrows-alt-h"></i> Alternative Options
      </h2>
      <div class="modal-alternatives-grid">
        <div class="modal-alt-card">
          <div class="modal-alt-icon"><i class="fas fa-ring"></i></div>
          <h3>Copper IUD</h3>
          <p>Non-hormonal, long-term protection up to 10 years</p>
        </div>
        <div class="modal-alt-card">
          <div class="modal-alt-icon"><i class="fas fa-shield"></i></div>
          <h3>Barrier Methods</h3>
          <p>Condoms, diaphragms - no hormonal effects</p>
        </div>
        <div class="modal-alt-card">
          <div class="modal-alt-icon"><i class="fas fa-calendar-check"></i></div>
          <h3>Fertility Awareness</h3>
          <p>Track your cycle to identify fertile days</p>
        </div>
        <div class="modal-alt-card">
          <div class="modal-alt-icon"><i class="fas fa-pills"></i></div>
          <h3>Progestin-Only</h3>
          <p>Mini-pill without estrogen component</p>
        </div>
      </div>
    </div>
    
    <div class="modal-section">
      <h2 class="modal-section-title">
        <i class="fas fa-user-doctor"></i> When to See Your Doctor
      </h2>
      <div class="modal-checklist">
        <ul>
          <li><i class="fas fa-check"></i> Before starting any new birth control method</li>
          <li><i class="fas fa-check"></i> If you notice any breast lumps or changes</li>
          <li><i class="fas fa-check"></i> If you have persistent headaches or vision changes</li>
          <li><i class="fas fa-check"></i> If you experience unusual bleeding patterns</li>
          <li><i class="fas fa-check"></i> For annual checkups and breast screenings</li>
          <li><i class="fas fa-check"></i> If you have a family history of cancer</li>
        </ul>
      </div>
    </div>
  `
};

function openArticleModal(articleId) {
  const modal = document.getElementById('articleModal');
  const modalBody = document.getElementById('articleModalBody');
  
  if (modal && modalBody && articleContents[articleId]) {
    modalBody.innerHTML = articleContents[articleId];
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset scroll position
    modalBody.scrollTop = 0;
  }
}

function closeArticleModal() {
  const modal = document.getElementById('articleModal');
  
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
    closeArticleModal();
  }
});

/* ---------- Animated Counters ---------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));
}

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
