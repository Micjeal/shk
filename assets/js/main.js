/* ============================================================
   MAIN.JS — Travel Agency Interactive Layer
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. HAMBURGER MENU ---- */
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');

  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinksContainer.classList.toggle('open');
    });
  }

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

});