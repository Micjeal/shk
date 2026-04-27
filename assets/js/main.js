/* ============================================================
   MAIN.JS — Travel Agency Interactive Layer
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. HAMBURGER MENU ---- */
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinksContainer.classList.toggle('open');
      if (navOverlay) {
        navOverlay.classList.toggle('active');
      }
    });
  }

  // Close menu when clicking overlay
  if (navOverlay && navLinksContainer && hamburger) {
    navOverlay.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('open');
      navOverlay.classList.remove('active');
    });
  }

  // Close menu when clicking a nav link
  const allNavLinks = document.querySelectorAll('.nav-links a');
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('open');
      if (navOverlay) {
        navOverlay.classList.remove('active');
      }
    });
  });

  /* ---- 2. ACTIVE NAV LINK ---- */
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Handle Get Started button smooth scrolling
  const navCta = document.querySelector('.nav-cta');
  if (navCta) {
    navCta.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = navCta.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ---- 3. TOPIC TAG TOGGLE ---- */
  const tags = document.querySelectorAll('.topic-tag');
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      tag.classList.toggle('selected');
    });
  });

  /* ---- 4. SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const observer  = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));

  /* ---- 5. COUNTER ANIMATION ---- */
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el     = e.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

  /* ---- 6. NAVBAR SCROLL SHADOW & ACTIVE SECTION ---- */
  const nav = document.querySelector('nav');
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    // Add shadow on scroll
    if (window.scrollY > 20) {
      nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
    } else {
      nav.style.boxShadow = 'none';
    }
    
    // Update active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ---- 7. INTERACTIVE ORB TILT ---- */
  const orbCard = document.querySelector('.card-orb');
  const orb     = document.querySelector('.orb');

  if (orbCard && orb) {
    orbCard.addEventListener('mousemove', (e) => {
      const rect = orbCard.getBoundingClientRect();
      const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 30;
      const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * 30;
      orb.style.transform = `translate(${x}px, ${y}px) rotate(${Date.now() / 40 % 360}deg)`;
    });

    orbCard.addEventListener('mouseleave', () => {
      orb.style.transform = '';
    });
  }

  /* ---- 8. CTA BUTTON RIPPLE ---- */
  document.querySelectorAll('.nav-cta, .read-more-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect   = this.getBoundingClientRect();
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        background:rgba(255,255,255,0.3);
        width:10px; height:10px;
        top:${e.clientY - rect.top - 5}px;
        left:${e.clientX - rect.left - 5}px;
        transform:scale(0); pointer-events:none;
        animation:ripple-expand 0.5s ease-out forwards;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  // Inject ripple keyframes once
  if (!document.getElementById('ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent = `@keyframes ripple-expand { to { transform:scale(30); opacity:0; } }`;
    document.head.appendChild(s);
  }

  /* ---- 9. FLEET CAROUSEL ---- */
  const carousel = document.getElementById('fleetCarousel');
  if (carousel) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    let currentSlide = 0;
    let carouselInterval;

    function showSlide(index) {
      if (slides.length === 0) return;
      
      // Remove active class from all slides
      slides.forEach((slide) => {
        slide.classList.remove('active');
      });
      
      // Remove active class from all indicators
      indicators.forEach((indicator) => {
        indicator.classList.remove('active');
      });
      
      // Add active class to current slide and indicator
      if (slides[index]) {
        slides[index].classList.add('active');
      }
      if (indicators[index]) {
        indicators[index].classList.add('active');
      }
      currentSlide = index;
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function startCarousel() {
      carouselInterval = setInterval(nextSlide, 4000);
    }

    function stopCarousel() {
      clearInterval(carouselInterval);
    }

    // Start carousel if we have slides
    if (slides.length > 0) {
      startCarousel();

      // Pause on hover
      carousel.addEventListener('mouseenter', stopCarousel);
      carousel.addEventListener('mouseleave', startCarousel);

      // Manual navigation via indicators
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          stopCarousel();
          showSlide(index);
          startCarousel();
        });
      });
    }
  }

  /* ---- 10. FLEET CARD REVEAL ---- */
  const fleetCards = document.querySelectorAll('.fleet-card');
  const fleetObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        fleetObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  fleetCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fleetObserver.observe(card);
  });

  /* ---- 10. STATS NUMBER ANIMATION ---- */
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        // Make the number visible first
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        
        // Then animate the count
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          e.target.textContent = Math.floor(current);
        }, 20);
        statsObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => {
    // Only set initial state if it has data-target (skip the "24/7" number)
    if (num.getAttribute('data-target')) {
      num.style.opacity = '0';
      num.style.transform = 'translateY(10px)';
      num.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      statsObserver.observe(num);
    }
  });

  /* ---- 11. COUNTER ANIMATION ---- */
const countUp = (el) => {
  const target = +el.getAttribute('data-target');
  const count = +el.innerText;
  const speed = 2000 / target; // Adjust speed

    if (count < target) {
      el.innerText = Math.ceil(count + 1);
      setTimeout(() => countUp(el), speed);
    } else {
      el.innerText = target;
    }
  };

  /* ---- 12. ROTATING TESTIMONIALS IN HERO ---- */
  const testimonials = [
    {
      text: "Skahhe Travel Care has provided timely and quality car hire services over the past four years, demonstrating a strong commitment to excellence.",
      client: "Miriam",
      company: "ACODE",
      avatar: "JN"
    },
    {
      text: "Skahhe has offered exceptional services, coupled with a high level of discipline exhibited by their drivers. The vehicles are always clean and in perfect mechanical condition. I would choose them any day!",
      client: "Brenda",
      company: "BDO International",
      avatar: "BB"
    },
    {
      text: "Professionalism and reliability in organizing travel across Northern Uganda and West Nile regions. Wholeheartedly recommended.",
      client: "Patrick",
      company: "Executive Director, IFRAD",
      avatar: "RM"
    },
    {
      text: "SKAHHE Travel Care for the last two years has proven to be one of CDFU's most reliable service providers, offering good quality services, ensuring timely delivery at affordable prices, and maintaining good client relations and flexibility.",
      client: "Dickson",
      company: "CDFU",
      avatar: "SK"
    },
    {
      text: "Skahhe Travel Care has provided Transport Services for field Research Teams and Consultants on different projects for the last 5 years, demonstrating reliability and excellence.",
      client: "Moses",
      company: "Adroit Consult international",
      avatar: "RM"
    },
    {
      text: "Their competitive pricing, combined with excellent service, makes them an outstanding choice. Five stars are not enough – I would give them ten!",
      client: "Jonas Mbabazi",
      company: "ACODE",
      avatar: "JM"
    }
  ];

  let currentTestimonialIndex = 0;
  const reviewText = document.getElementById('hero-review-text');
  const reviewAvatar = document.getElementById('hero-review-avatar');

  function rotateTestimonial() {
    const testimonial = testimonials[currentTestimonialIndex];
    
    // Fade out
    reviewText.style.opacity = '0';
    reviewAvatar.style.opacity = '0';
    
    setTimeout(() => {
      // Update content
      reviewText.textContent = `"${testimonial.text}"`;
      reviewAvatar.textContent = testimonial.avatar;
      
      // Fade in
      reviewText.style.opacity = '1';
      reviewAvatar.style.opacity = '1';
    }, 300);
    
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
  }

  // Initialize rotation if elements exist
  if (reviewText && reviewAvatar) {
    // Set initial transition styles
    reviewText.style.transition = 'opacity 0.3s ease-in-out';
    reviewAvatar.style.transition = 'opacity 0.3s ease-in-out';
    
    // Start rotation after 2 seconds, then every 4 seconds
    setTimeout(() => {
      rotateTestimonial();
      setInterval(rotateTestimonial, 4000);
    }, 2000);
  }

  /* ---- 13. CTA SECTION INTERACTIONS ---- */
  
  /* ---- 13.1 PROOF STRIP COUNTERS ---- */
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCount(el, end, suffix, duration) {
    let startTime = null;

    function tick(ts) {
      if (!startTime) startTime = ts;
      const elapsed  = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.floor(easeOutCubic(progress) * end);
      el.innerHTML   = value + '<span>' + suffix + '</span>';
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  /* Observe each proof number and fire once visible */
  const proofNums = document.querySelectorAll('.proof-number[data-target]');

  if (proofNums.length) {
    const proofObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el     = e.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          animateCount(el, target, suffix, 1600);
          proofObserver.unobserve(el);
        }
      });
    }, { threshold: 0.6 });

    proofNums.forEach(el => proofObserver.observe(el));
  }

  /* ---- 13.2 FEATURE ITEMS — staggered entrance ---- */
  const featureItems = document.querySelectorAll('.cta-feature-item');

  if (featureItems.length) {
    const featureObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          featureItems.forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity   = '1';
              item.style.transform = 'translateX(0)';
            }, i * 120);
          });
          featureObserver.disconnect();
        }
      });
    }, { threshold: 0.2 });

    /* Set initial hidden state via JS (avoids FOUC if CSS loads late) */
    featureItems.forEach(item => {
      item.style.opacity   = '0';
      item.style.transform = 'translateX(24px)';
      item.style.transition = 'opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)';
    });

    const ctaSection = document.querySelector('.final-cta');
    if (ctaSection) featureObserver.observe(ctaSection);
  }

  /* ---- 13.3 PARALLAX GLOW BLOBS on mouse move ---- */
  const ctaContainer = document.querySelector('.cta-container');
  const glow1        = document.querySelector('.cta-glow-1');
  const glow2        = document.querySelector('.cta-glow-2');

  if (ctaContainer && glow1 && glow2) {
    ctaContainer.addEventListener('mousemove', (e) => {
      const rect  = ctaContainer.getBoundingClientRect();
      const xPct  = (e.clientX - rect.left) / rect.width;
      const yPct  = (e.clientY - rect.top)  / rect.height;

      const moveX1 = (xPct - 0.5) * 40;
      const moveY1 = (yPct - 0.5) * 30;
      const moveX2 = (xPct - 0.5) * -30;
      const moveY2 = (yPct - 0.5) * -24;

      glow1.style.transform = `translate(${moveX1}px, ${moveY1}px) scale(1)`;
      glow2.style.transform = `translate(${moveX2}px, ${moveY2}px) scale(1)`;
    });

    ctaContainer.addEventListener('mouseleave', () => {
      glow1.style.transform = '';
      glow2.style.transform = '';
      glow1.style.transition = 'transform 1s ease';
      glow2.style.transition = 'transform 1s ease';
    });

    ctaContainer.addEventListener('mouseenter', () => {
      glow1.style.transition = 'transform 0.1s linear';
      glow2.style.transition = 'transform 0.1s linear';
    });
  }

  /* ---- 13.4 BUTTON RIPPLE ---- */
  const ctaBtns = document.querySelectorAll('.btn-main, .btn-outline');

  ctaBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const existing = this.querySelector('.cta-ripple');
      if (existing) existing.remove();

      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height) * 2;
      const ripple = document.createElement('span');

      ripple.className = 'cta-ripple';
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        top: ${e.clientY - rect.top  - size / 2}px;
        left: ${e.clientX - rect.left - size / 2}px;
        background: rgba(255,255,255,0.18);
        transform: scale(0);
        animation: cta-ripple-anim 0.55s ease-out forwards;
        pointer-events: none;
      `;

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* Inject ripple keyframe once */
  if (!document.getElementById('cta-ripple-kf')) {
    const style = document.createElement('style');
    style.id    = 'cta-ripple-kf';
    style.textContent = `
      @keyframes cta-ripple-anim {
        to { transform: scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

});