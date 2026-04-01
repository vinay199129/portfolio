// Animated counters - called after About page loads
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const animate = (el) => {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = '+';
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); observer.unobserve(e.target); } });
  }, { threshold: 0.3 });
  counters.forEach(c => observer.observe(c));
}

// Cert carousel auto-scroll - called after Resume page loads
let _carouselInterval = null;

function initCertCarousel() {
  const el = document.getElementById('certCarousel');
  if (!el) return;
  if (_carouselInterval) clearInterval(_carouselInterval);
  let paused = false;
  el.addEventListener('mouseenter', () => paused = true);
  el.addEventListener('mouseleave', () => paused = false);
  _carouselInterval = setInterval(() => {
    if (paused) return;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: 244, behavior: 'smooth' });
    }
  }, 3000);
}
