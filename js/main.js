/**
 * Main Application Logic: Interactivity, Filter, Expanders, Map & Navigation
 * Aligned with the high-end academic design standards of ATLAS SkillTech University & ICCISF2027.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('header');
  function onScroll() {
    if (window.scrollY > 25) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileNavLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    mobileMenuBtn?.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
  }

  mobileMenuBtn?.addEventListener('click', openMobileMenu);
  mobileMenuCloseBtn?.addEventListener('click', closeMobileMenu);
  mobileBackdrop?.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // 3. Navigation Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav.primary-nav a[href^="#"]');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { threshold: 0.25, rootMargin: '-80px 0px -50% 0px' }
  );
  sections.forEach((sec) => navObserver.observe(sec));

  // 4. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('[data-reveal="true"], [data-reveal-item="true"]');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // 5. Track Cards: Accordion & Expand All
  const trackCards = document.querySelectorAll('[data-track-card="true"]');
  const expandAllBtn = document.getElementById('expand-all-tracks-btn');
  let allExpanded = false;

  function toggleTrack(card, forceState = null) {
    const moreContent = card.querySelector('.track-more');
    const toggleBtn = card.querySelector('.track-toggle-btn');
    const isCurrentlyOpen = card.classList.contains('expanded');
    const shouldOpen = forceState !== null ? forceState : !isCurrentlyOpen;

    if (shouldOpen) {
      card.classList.add('expanded');
      moreContent.style.maxHeight = moreContent.scrollHeight + 'px';
      moreContent.style.opacity = '1';
      moreContent.removeAttribute('inert');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'true');
        const textSpan = toggleBtn.querySelector('.toggle-label');
        if (textSpan) textSpan.textContent = 'Show fewer subtopics';
      }
    } else {
      card.classList.remove('expanded');
      moreContent.style.maxHeight = '0px';
      moreContent.style.opacity = '0';
      moreContent.setAttribute('inert', '');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        const textSpan = toggleBtn.querySelector('.toggle-label');
        if (textSpan) textSpan.textContent = 'Show all 5 subtopics';
      }
    }
  }

  trackCards.forEach((card) => {
    const toggleBtn = card.querySelector('.track-toggle-btn');
    toggleBtn?.addEventListener('click', () => {
      toggleTrack(card);
      updateExpandAllButtonState();
    });
  });

  function updateExpandAllButtonState() {
    if (!expandAllBtn) return;
    const expandedCount = document.querySelectorAll('[data-track-card="true"].expanded').length;
    if (expandedCount === trackCards.length) {
      allExpanded = true;
      expandAllBtn.textContent = 'Collapse all tracks';
    } else {
      allExpanded = false;
      expandAllBtn.textContent = 'Expand all tracks';
    }
  }

  expandAllBtn?.addEventListener('click', () => {
    allExpanded = !allExpanded;
    trackCards.forEach((card) => {
      toggleTrack(card, allExpanded);
    });
    expandAllBtn.textContent = allExpanded ? 'Collapse all tracks' : 'Expand all tracks';
  });

  // 6. Committee Filter
  const filterBtns = document.querySelectorAll('.committee-filter-btn');
  const committeeItems = document.querySelectorAll('.committee-item');
  const memberCountSpan = document.getElementById('committee-visible-count');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const dept = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => {
        b.setAttribute('aria-pressed', 'false');
        b.classList.remove('active');
      });
      btn.setAttribute('aria-pressed', 'true');
      btn.classList.add('active');

      let visibleCount = 0;
      committeeItems.forEach((item) => {
        const itemDept = item.getAttribute('data-dept');
        if (dept === 'all' || itemDept === dept) {
          item.style.display = '';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 20);
          visibleCount++;
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(8px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });

      if (memberCountSpan) {
        memberCountSpan.textContent = visibleCount;
      }
    });
  });

  // 7. Interactive Map Loader
  const loadMapBtn = document.getElementById('load-map-btn');
  const mapContainer = document.getElementById('interactive-map-container');
  loadMapBtn?.addEventListener('click', () => {
    if (!mapContainer) return;
    mapContainer.innerHTML = `
      <iframe 
        title="ATLAS SkillTech University Location Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.835940332832!2d72.87189197596547!3d19.070940382131976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8901844bca7%3A0xb304b4d66c1b6be9!2sATLAS%20SkillTech%20University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        width="100%" 
        height="100%" 
        style="border:0; border-radius:1.5rem;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    `;
  });

  // 8. Contact Form Submission
  const contactForm = document.getElementById('conference-contact-form');
  const toast = document.getElementById('inquiry-toast');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" viewBox="0 0 50 50" style="width:18px;height:18px;display:inline-block;animation:spin 1s linear infinite;">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="80" stroke-dashoffset="60"></circle>
      </svg>
      Sending...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      contactForm.reset();

      if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 5000);
      }
    }, 900);
  });

  // 9. Interactive Parallax Tilt for Feature Cards
  const tiltCards = document.querySelectorAll('[data-tilt="true"]');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      card.style.transform = `perspective(1000px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // 10. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');
    btn?.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active');

      // Close other open FAQ items for clean single-open accordion behavior
      faqItems.forEach((other) => {
        if (other !== item && other.classList.contains('active')) {
          other.classList.remove('active');
          const otherAns = other.querySelector('.faq-answer');
          const otherBtn = other.querySelector('.faq-question-btn');
          if (otherAns) otherAns.style.maxHeight = '0';
          if (otherAns) otherAns.style.opacity = '0';
          otherBtn?.setAttribute('aria-expanded', 'false');
        }
      });

      if (!isCurrentlyActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
      } else {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
      }
    });
  });

  // 11. Author Guidelines Modal Controller
  const modalBackdrop = document.getElementById('author-guidelines-modal');
  const openModalBtns = document.querySelectorAll('[data-open-modal="author-guidelines"]');
  const closeModalBtns = document.querySelectorAll('[data-close-modal="author-guidelines"]');

  function openGuidelinesModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeGuidelinesModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openGuidelinesModal();
  }));

  closeModalBtns.forEach((btn) => btn.addEventListener('click', closeGuidelinesModal));

  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeGuidelinesModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) {
      closeGuidelinesModal();
    }
  });

  // 12. Add Conference Milestone to Calendar (.ics Generator)
  const addToCalendarBtn = document.getElementById('add-to-calendar-btn');
  addToCalendarBtn?.addEventListener('click', () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ATLAS SkillTech University//From Roots to Relevance Conference//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'SUMMARY:National Conference: From Roots to Relevance — Indian Knowledge Systems',
      'DESCRIPTION:ATLAS SkillTech University National Conference on Indian Knowledge Systems for a New India. BKC Mumbai.',
      'LOCATION:ATLAS SkillTech University, Equinox Business Park, BKC, Mumbai',
      'STATUS:TENTATIVE',
      'DTSTART;VALUE=DATE:20270115',
      'DTEND;VALUE=DATE:20270117',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Roots-To-Relevance-ATLAS-Conference.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // 13. Registration Interest Notification Trigger
  const registerInterestBtns = document.querySelectorAll('.btn-register-interest');
  registerInterestBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tier = btn.getAttribute('data-tier') || 'General';
      const toastEl = document.getElementById('inquiry-toast');
      if (toastEl) {
        toastEl.querySelector('span').textContent = `Thank you! You will be notified the moment registration opens for the ${tier} tier.`;
        toastEl.classList.add('show');
        setTimeout(() => toastEl.classList.remove('show'), 5000);
      }
    });
  });
});

