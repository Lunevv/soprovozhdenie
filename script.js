(() => {
  'use strict';

  /* ───────── Nav: scroll state + active link + burger ───────── */
  const nav = document.getElementById('nav');
  const burger = nav.querySelector('.nav__burger');
  const menu = nav.querySelector('.nav__menu');
  const links = [...menu.querySelectorAll('a[href^="#"]')];

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  });

  links.forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  /* ───────── Active link via IntersectionObserver ───────── */
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
  };

  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) setActive(e.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => sectionObs.observe(s));

  /* ───────── Reveal on scroll ───────── */
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        obs.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ───────── Reviews carousel arrows ───────── */
  const track = document.getElementById('reviewsTrack');
  if (track) {
    document.querySelectorAll('.reviews__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const dir = Number(btn.dataset.dir);
        const card = track.querySelector('.review');
        const step = card ? card.offsetWidth + 20 : 340;
        track.scrollBy({ left: dir * step, behavior: 'smooth' });
      });
    });
  }

  /* ───────── FAQ: close siblings when one opens ───────── */
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(other => { if (other !== item) other.open = false; });
      }
    });
  });

  /* ───────── Year in footer ───────── */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
