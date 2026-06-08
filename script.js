/* ─── NAV: sticky + mobile ─────────────────────────────────────────── */
const nav     = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav__links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ─── SHOWREEL LIGHTBOX ────────────────────────────────────────────── */
const reelPlay     = document.getElementById('reelPlay');
const reelLightbox = document.getElementById('reelLightbox');
const reelClose    = document.getElementById('reelClose');
const reelFrame    = document.getElementById('reelFrame');

reelPlay.addEventListener('click', () => {
  reelFrame.src = reelFrame.dataset.src;
  reelLightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
});

function closeLightbox() {
  reelLightbox.classList.remove('active');
  reelFrame.src = '';
  document.body.style.overflow = '';
}

reelClose.addEventListener('click', closeLightbox);
reelLightbox.addEventListener('click', e => {
  if (e.target === reelLightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* ─── SCROLL REVEAL ────────────────────────────────────────────────── */
const revealTargets = [
  '.section-header',
  '.work__card',
  '.reel__content',
  '.about__img-col',
  '.about__text-col',
  '.technique',
  '.contact__inner',
];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings in the same parent
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach(sib => {
        if (!sib.classList.contains('visible')) {
          sib.style.transitionDelay = delay + 'ms';
          delay += 80;
        }
      });
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
});

/* ─── CURSOR GLOW (desktop only) ──────────────────────────────────── */
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(200,169,126,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    top: 0; left: 0;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}
