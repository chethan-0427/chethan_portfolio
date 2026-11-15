/**
 * ============================================================================
 * CHETHAN S. — PORTFOLIO JAVASCRIPT CONTROLLER
 * Premium Monochrome Experience Engine
 * Pure Vanilla JavaScript (ES6+)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     01. Ambient Subtle Particle Field (Monochrome Stardust)
     ========================================================================== */
  const initAmbientCanvas = () => {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId;
    let mouse = { x: null, y: null, radius: 100 };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      // Lightweight density for high performance
      const count = Math.min(Math.floor((width * height) / 32000), 45);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.5 + 0.6,
          alpha: Math.random() * 0.4 + 0.15
        });
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle mouse drift
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            p.x -= dx * 0.01;
            p.y -= dy * 0.01;
          }
        }

        // Draw particle in pure white with soft alpha
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();

        // Connect closely adjacent particles with very faint silver line
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 90) {
            const lineAlpha = (1 - dist / 90) * 0.07;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Pause canvas animation when tab is inactive to save battery
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        render();
      }
    });
  };

  initAmbientCanvas();

  /* ==========================================================================
     02. Header Scroll Effect & Active Navigation Indicator
     ========================================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleHeaderScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Scroll Spy for Navigation Active State
  const updateActiveNavLink = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          if (link.getAttribute('data-nav') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileNavLinks.forEach((link) => {
          if (link.getAttribute('data-nav') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  /* ==========================================================================
     03. Mobile Drawer Navigation
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  const toggleMobileMenu = (open) => {
    const isOpen = open !== undefined ? open : !mobileToggle.classList.contains('active');
    
    mobileToggle.classList.toggle('active', isOpen);
    mobileToggle.setAttribute('aria-expanded', isOpen.toString());
    mobileDrawer.classList.toggle('active', isOpen);
    mobileDrawer.setAttribute('aria-hidden', (!isOpen).toString());

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());

    // Close when clicking on any mobile navigation link
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
        toggleMobileMenu(false);
      }
    });
  }

  /* ==========================================================================
     04. Smooth Anchor Scrolling with Sticky Nav Offset
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = header ? header.offsetHeight : 76;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     05. Project Details Dialog Modal Engine
     ========================================================================== */
  const projectDialog = document.getElementById('project-dialog');
  const dialogCloseBtn = document.getElementById('dialog-close-btn');
  const dialogCloseBottom = document.getElementById('dialog-close-bottom');
  const dialogTitle = document.getElementById('dialog-project-title');
  const dialogCategory = document.getElementById('dialog-project-category');
  const dialogBody = document.getElementById('dialog-project-body');
  const dialogImg = document.getElementById('dialog-img');
  const dialogGithubLink = document.getElementById('dialog-github-link');

  const projectsData = {
    hirenova: {
      title: 'HireNova — Online Job Portal',
      category: 'Full-Stack Web Application | Recruitment Platform',
      img: 'images/project-hirenova.png',
      github: 'https://github.com/chethan-0427/HireNova',
      description: 'A full-stack job portal web application connecting job seekers with employment opportunities while providing administrators with end-to-end recruitment management tools.',
      problemSolved: 'Streamlines the recruitment workflow with automated duplicate-application prevention, role-based access control, real-time application status tracking, and secure token-based password recovery.',
      features: [
        'Single-page application (SPA) architecture with zero external frontend frameworks',
        'RESTful backend built with Python Flask and persistent SQLite relational database',
        'Real-time job search and location-based filtering for job seekers',
        'One-click job applications with database-level duplicate prevention',
        'Comprehensive admin portal for posting jobs and reviewing applicants',
        'Secure session authentication and token-based password reset (15-min expiry)'
      ],
      techStack: ['Python', 'Flask', 'SQLite', 'JavaScript', 'REST API', 'HTML5/CSS3']
    },
    hospital: {
      title: 'Hospital Appointment System',
      category: 'Python Application | Healthcare Logic',
      img: 'images/project-hospital.jpg',
      github: 'https://github.com/chethan-0427',
      description: 'A Python-based application designed to organize doctor schedules, display available time slots, manage patient appointments, and reduce double bookings.',
      problemSolved: 'Eliminates scheduling conflicts and double-bookings by using structured time-slot mapping algorithms and automated slot verification.',
      features: [
        'Organizes multi-doctor weekly schedules and consulting timeframes',
        'Dynamically presents open and reserved appointment slots',
        'Instant availability state updates upon patient booking',
        'Conflict prevention engine prevents overlapping appointments',
        'Built with procedural and modular Python architecture'
      ],
      techStack: ['Python', 'Data Structures', 'Schedule Optimization']
    },
    pilot: {
      title: 'Project Pilot',
      category: 'Web Platform | Recommendation Engine',
      img: 'images/project-pilot.jpg',
      github: 'https://github.com/chethan-0427',
      description: 'A web-based student project recommendation platform that helps students discover suitable project ideas based on their interests and skills.',
      problemSolved: 'Removes decision fatigue and choice paralysis among engineering students by filtering project concepts tailored to their academic syllabus and technical interests.',
      features: [
        'Curated index of multidisciplinary engineering projects',
        'Interest and skill matching filters (Machine Learning, IoT, Web)',
        'Card-based discovery feed with concise technical abstracts',
        'Streamlined interface for seamless browsing and bookmarking'
      ],
      techStack: ['Web Development', 'User Interface Design', 'JavaScript']
    },
    responsive: {
      title: 'Responsive Web Design Architectures',
      category: 'Frontend Engineering | Interface Design',
      img: 'images/project-responsive.jpg',
      github: 'https://github.com/chethan-0427',
      description: 'Responsive interfaces developed with HTML5, CSS3, Bootstrap, Flexbox, and viewport breakpoints across mobile, tablet, and desktop screens.',
      problemSolved: 'Ensures flawless visual rendering, accessible touch targets, and legible typography regardless of display aspect ratio or pixel density.',
      features: [
        'Fluid layout hierarchies powered by CSS Grid and Flexbox',
        'Rigorous responsive breakpoint implementations',
        'Accessible navigation patterns with keyboard support',
        'Adherence to Core Web Vitals and performance benchmarks'
      ],
      techStack: ['HTML5', 'CSS3', 'Bootstrap', 'Responsive Design', 'Flexbox']
    },
    monsoon: {
      title: 'Hyper Monsoon Onset',
      category: 'Atmospheric Data Visualization',
      img: 'images/project-monsoon.jpg',
      github: 'https://github.com/chethan-0427',
      description: 'A weather-focused project exploring monsoon patterns and atmospheric telemetry using satellite isobar maps, barometric pressure charts, and rainfall tracking.',
      problemSolved: 'Translates high-dimensional atmospheric and meteorological data into readable visual maps and timeline trends.',
      features: [
        'Satellite isobar contour line visualizations and wind vectors',
        'Barometric pressure analytics across multi-day observation windows',
        'Precipitation intensity radar sweep telemetry',
        'Clean, high-contrast dark meteorological telemetry layout'
      ],
      techStack: ['Atmospheric Data', 'Data Visualization', 'Telemetry UI']
    },
    zewa: {
      title: 'ZEWA: Zero Waste',
      category: 'Sustainability Concept | Food Rescue UI',
      img: 'images/project-zewa.jpg',
      github: 'https://github.com/chethan-0427',
      description: 'A sustainability-focused mini-project concept connecting restaurants and hotels with customers interested in discounted surplus food, helping reduce food waste.',
      problemSolved: 'Tackles urban food wastage by pairing end-of-day hospitality inventory with budget-conscious local consumers.',
      features: [
        'Real-time surplus meal listings from local restaurants and bakeries',
        'Dynamic discount badges and countdown pickup timers',
        'Environmental metrics tracker showing cumulative food saved',
        'Clean mobile-first commerce and reserve-in-advance workflow'
      ],
      techStack: ['Sustainability Concept', 'Food Rescue Marketplace', 'UI/UX']
    }
  };

  const openProjectModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data || !projectDialog) return;

    dialogTitle.textContent = data.title;
    dialogCategory.textContent = data.category;
    dialogImg.src = data.img;
    dialogImg.alt = `${data.title} Interface Screenshot`;
    dialogGithubLink.href = data.github;

    const featureItems = data.features.map(f => `<li>${f}</li>`).join('');
    const techChips = data.techStack.map(t => `<span class="skill-chip">${t}</span>`).join(' ');

    dialogBody.innerHTML = `
      <p class="dialog-lead-p">${data.description}</p>
      
      <h3 class="dialog-subhead">Core Problem Solved</h3>
      <p>${data.problemSolved}</p>

      <h3 class="dialog-subhead">Key Capabilities</h3>
      <ul class="dialog-list">
        ${featureItems}
      </ul>

      <h3 class="dialog-subhead">Technologies &amp; Competencies</h3>
      <div class="skill-chips-wrap" style="margin-top: 0.5rem;">
        ${techChips}
      </div>
    `;

    projectDialog.showModal();
  };

  // Attach click listeners to all "View Project" buttons
  document.querySelectorAll('.open-project-modal').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  // Close Dialog buttons
  if (dialogCloseBtn) {
    dialogCloseBtn.addEventListener('click', () => projectDialog.close());
  }
  if (dialogCloseBottom) {
    dialogCloseBottom.addEventListener('click', () => projectDialog.close());
  }

  // Modern Web Guidance fallback for light-dismiss on browsers without native closedBy support
  if (projectDialog && !('closedBy' in HTMLDialogElement.prototype)) {
    projectDialog.addEventListener('click', (event) => {
      if (event.target !== projectDialog) return;
      const rect = projectDialog.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInside) {
        projectDialog.close();
      }
    });
  }

  /* ==========================================================================
     06. "More About Me" Dialog Modal
     ========================================================================== */
  const aboutDialog = document.getElementById('about-dialog');
  const openAboutBtn = document.getElementById('open-about-modal-btn');
  const closeAboutBtn = document.getElementById('about-dialog-close-btn');
  const closeAboutBottom = document.getElementById('about-dialog-close-bottom');
  const aboutDialogContactBtn = document.getElementById('about-dialog-contact-btn');

  if (openAboutBtn && aboutDialog) {
    openAboutBtn.addEventListener('click', () => {
      aboutDialog.showModal();
    });

    if (closeAboutBtn) {
      closeAboutBtn.addEventListener('click', () => aboutDialog.close());
    }
    if (closeAboutBottom) {
      closeAboutBottom.addEventListener('click', () => aboutDialog.close());
    }
    if (aboutDialogContactBtn) {
      aboutDialogContactBtn.addEventListener('click', () => {
        aboutDialog.close();
      });
    }

    // Light-dismiss fallback
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      aboutDialog.addEventListener('click', (event) => {
        if (event.target !== aboutDialog) return;
        const rect = aboutDialog.getBoundingClientRect();
        const isInside = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (!isInside) {
          aboutDialog.close();
        }
      });
    }
  }

  /* ==========================================================================
     07. Contact Form Client-Side Validation & Feedback
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    const inputs = {
      name: document.getElementById('contact-name'),
      email: document.getElementById('contact-email'),
      subject: document.getElementById('contact-subject'),
      message: document.getElementById('contact-message')
    };

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateField = (field, isValid) => {
      const group = field.closest('.form-group');
      if (group) {
        if (isValid) {
          group.classList.remove('has-error');
        } else {
          group.classList.add('has-error');
        }
      }
      return isValid;
    };

    // Real-time input validation clearance on input
    Object.values(inputs).forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          if (group && group.classList.contains('has-error')) {
            group.classList.remove('has-error');
          }
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;

      // Name
      if (!inputs.name.value.trim()) {
        validateField(inputs.name, false);
        isFormValid = false;
      } else {
        validateField(inputs.name, true);
      }

      // Email
      if (!inputs.email.value.trim() || !validateEmail(inputs.email.value.trim())) {
        validateField(inputs.email, false);
        isFormValid = false;
      } else {
        validateField(inputs.email, true);
      }

      // Subject
      if (!inputs.subject.value.trim()) {
        validateField(inputs.subject, false);
        isFormValid = false;
      } else {
        validateField(inputs.subject, true);
      }

      // Message
      if (!inputs.message.value.trim()) {
        validateField(inputs.message, false);
        isFormValid = false;
      } else {
        validateField(inputs.message, true);
      }

      if (!isFormValid) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please complete all required fields with valid information.';
        return;
      }

      // Real submission via FormSubmit to chethan.sv2006@gmail.com
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending Message...</span>';
      formFeedback.className = 'form-feedback';
      formFeedback.textContent = 'Delivering your message directly to Chethan...';

      const payload = {
        name: inputs.name.value.trim(),
        email: inputs.email.value.trim(),
        _subject: `Portfolio Direct Message from ${inputs.name.value.trim()}: ${inputs.subject.value.trim()}`,
        subject: inputs.subject.value.trim(),
        message: inputs.message.value.trim(),
        _replyto: inputs.email.value.trim(),
        _template: 'table',
        _captcha: 'false'
      };

      fetch('https://formsubmit.co/ajax/chethan.sv2006@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
        submitBtn.innerHTML = originalBtnHTML;

        const senderName = payload.name;
        const senderEmail = payload.email;
        contactForm.reset();

        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `<strong>Message Sent!</strong> Thank you ${senderName}. Your message has been delivered to Chethan's email. He will reply directly to <em>${senderEmail}</em> shortly.`;

        setTimeout(() => {
          formFeedback.textContent = '';
          formFeedback.className = 'form-feedback';
        }, 10000);
      })
      .catch(error => {
        console.error('Form submission error:', error);
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
        submitBtn.innerHTML = originalBtnHTML;

        formFeedback.className = 'form-feedback error';
        formFeedback.innerHTML = `Could not deliver automatically. <a href="mailto:chethan.sv2006@gmail.com?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(payload.message)}" style="color: #fff; text-decoration: underline;">Click here to send directly from your email app</a>.`;
      });
    });
  }

});
