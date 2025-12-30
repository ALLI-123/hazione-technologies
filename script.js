document.addEventListener('DOMContentLoaded', () => {

  // === Mobile Menu Toggle ===
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const overlay = document.querySelector('.menu-overlay');

  const closeMenu = () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    nav.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  menuToggle?.addEventListener('click', openMenu);
  overlay?.addEventListener('click', closeMenu);

  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  
  // === Founder Link ===
  const founderLink = document.getElementById('founderLink');
  if (founderLink) {
    founderLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Contact via phone or email shown below!');
    });
  }

  // === Form Submission Feedback ===
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      const submitBtn = form.querySelector('.btn.primary');
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        form.classList.add('form-submitting');
      }
    });
  });

  // === Scroll Animation ===
  const animateOnScroll = () => {
    document.querySelectorAll('[data-animate]').forEach(el => {
      if (!el.classList.contains('animate')) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('animate');
        }
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Trigger on load

  // === Centered Carousel ===
  function initCenteredCarousel() {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    if (!track || !dotsContainer || track.children.length === 0) return;

    const slides = Array.from(track.children);
    const slideCount = slides.length;
    let currentIndex = 0;
    let autoRotate = true;
    let rotationInterval;

    // Create dots
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
    updateDots();

    function goToSlide(index) {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
    }

    function updateDots() {
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function nextSlide() {
      if (!autoRotate) return;
      currentIndex = (currentIndex + 1) % slideCount;
      goToSlide(currentIndex);
    }

    const startRotation = () => {
      rotationInterval = setInterval(nextSlide, 5000);
    };

    const stopRotation = () => {
      if (rotationInterval) clearInterval(rotationInterval);
    };

    // Pause on hover
    track.addEventListener('mouseenter', () => {
      autoRotate = false;
      stopRotation();
    });

    track.addEventListener('mouseleave', () => {
      autoRotate = true;
      stopRotation();
      startRotation();
    });

    // Touch swipe
    let startX = 0;
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide(); // swipe left
        else goToSlide((currentIndex - 1 + slideCount) % slideCount); // swipe right
      }
    });

    startRotation();
  }

  // Initialize all components
  initCenteredCarousel();

});