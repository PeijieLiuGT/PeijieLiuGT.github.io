/* ============================================
   Peijie Liu Portfolio - Custom Visual Effects
   ============================================ */

function initCustomEffects() {

  /* ========================================
     Homepage Hero Card Injection
     Inject BEFORE #content-inner so it's full-width
     ======================================== */
  var isHomePage = /^\/(page\/\d+\/)?$/.test(window.location.pathname);

  if (isHomePage && !document.querySelector('.home-hero')) {
    var heroHTML = '' +
      '<section class="home-hero">' +
        '<div class="home-hero-content">' +
          '<div class="home-hero-text">' +
            '<h1>Hey, I\'m Peijie Liu</h1>' +
            '<div class="hero-subtitle">Innovation at the Intersection of Engineering and Experience</div>' +
            '<p>An <strong>Electrical Engineering</strong> sophomore (junior if counting in-progress courses) at <strong>Georgia Tech</strong> with a minor in <strong>Robotics</strong>, planning to graduate in December 2028.</p>' +
            '<p>I specialize in <strong>analog circuitry</strong>, <strong>FPGA/RISC embedded development</strong>, and <strong>robotics system integration</strong>, with extensive PCB layout experience using Altium Designer for power electronics, amplifiers, and avionics systems.</p>' +
            '<p>I now serve as the Avionics <strong>Hardware-In-The-Loop Responsible Engineer</strong> for <a href="https://www.gtspaceprogram.com/" class="highlight-link">YJSP</a>.</p>' +
            '<h3>My Passion</h3>' +
            '<p>My passion lies at the intersection of engineering innovation and practical application \u2013 from creating ultra-low distortion audio amplifiers to developing precision timing systems for aerospace applications.</p>' +
            '<p>Outside of academics, I\'m a dedicated audiophile and <strong>PADI Master Scuba Diver</strong>, committed to building high-fidelity audio equipment and innovative dive gadgets.</p>' +
            '<h3>Connect With Me</h3>' +
            '<p>Check out my engineering journey through my <a href="https://space.bilibili.com/490557212" class="bilibili-link">Bilibili channel</a> where I share DIY projects and audiophile product reviews that have attracted over <strong>1 million views</strong> and <strong>~10K subscribers</strong>.</p>' +
          '</div>' +
          '<div class="home-hero-avatar">' +
            '<img src="/images/peijieliu1.jpg" alt="Peijie Liu">' +
          '</div>' +
        '</div>' +
        '<div class="home-hero-banner">' +
          '<img src="/images/banner2.jpg" alt="Banner">' +
          '<div class="banner-overlay">' +
            '<h2>Be Bold, Be Authentic, Be Yourself \u2014 My Ethos</h2>' +
          '</div>' +
        '</div>' +
        '<div class="home-hero-links">' +
          '<a href="/about/" class="hero-btn"><i class="fas fa-user"></i> About Me</a>' +
          '<a href="/categories/Technical-Projects/" class="hero-btn"><i class="fas fa-rocket"></i> Projects</a>' +
          '<a href="/resume/" class="hero-btn"><i class="fas fa-file-alt"></i> Resume</a>' +
          '<a href="/contact/" class="hero-btn"><i class="fas fa-envelope"></i> Contact</a>' +
        '</div>' +
      '</section>';

    // Insert BEFORE main#content-inner so it's outside the flex layout
    var contentInner = document.getElementById('content-inner');
    if (contentInner) {
      contentInner.insertAdjacentHTML('beforebegin', heroHTML);
    }
  }

  /* ========================================
     Intersection Observer for scroll-in animations
     ======================================== */
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  var animateOnScroll = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  var animTargets = document.querySelectorAll(
    '.recent-post-item, #aside-content .card-widget'
  );
  animTargets.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
  });

  /* ========================================
     Category cross-link notices
     ======================================== */
  var path = window.location.pathname;
  var notice = null;

  if (/\/categories\/Technical-Projects\/?/.test(path)) {
    notice = {
      msg: 'Only the most polished and fully-documented projects are featured here. For more experimental DIY builds, check out',
      linkText: 'Tech Notes \u2192',
      href: '/categories/Tech-Notes/'
    };
  } else if (/\/categories\/Tech-Notes\/?/.test(path)) {
    notice = {
      msg: 'Browsing scrappy experiments? For the fully-documented flagship projects, head over to',
      linkText: 'Technical Projects \u2192',
      href: '/categories/Technical-Projects/'
    };
  }

  if (notice) {
    // Avoid duplicate on PJAX
    if (!document.querySelector('.category-crosslink')) {
      var noticeEl = document.createElement('p');
      noticeEl.className = 'category-crosslink';
      noticeEl.innerHTML = notice.msg + ' <a href="' + notice.href + '">' + notice.linkText + '</a>';

      // Insert BEFORE #content-inner so it's full-width above the flex layout
      var contentInner2 = document.getElementById('content-inner');
      if (contentInner2) {
        contentInner2.parentNode.insertBefore(noticeEl, contentInner2);
      }
    }
  }

  /* ========================================
     Magnetic hover on buttons
     ======================================== */
  var magneticBtns = document.querySelectorAll('.social-btn, .btn-download, .hero-btn');
  magneticBtns.forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + x * 0.12 + 'px, ' + y * 0.12 + 'px) scale(1.05)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });

  /* ========================================
     Parallax on banner image (background-position)
     Using backgroundPositionY instead of transform to avoid
     breaking position:fixed on child #nav element.
     ======================================== */
  var header = document.getElementById('page-header');
  if (header) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrolled = window.pageYOffset;
          if (scrolled < window.innerHeight) {
            header.style.backgroundPositionY = 'calc(50% + ' + scrolled * 0.3 + 'px)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ========================================
     Post page: change "back to home" to "back to category"
     ======================================== */
  var navPageTitle = document.querySelector('.nav-page-title');
  if (navPageTitle) {
    // Find the category from the post meta (Butterfly uses .post-meta-categories)
    var catLink = document.querySelector('a.post-meta-categories');
    if (catLink) {
      var catHref = catLink.getAttribute('href');
      var catName = catLink.textContent.trim();
      navPageTitle.setAttribute('href', catHref);
      // Update the "back to home" label inside the second span
      var backSpans = navPageTitle.querySelectorAll('.site-name');
      if (backSpans.length >= 2) {
        backSpans[1].innerHTML = '<i class="fa-solid fa-circle-arrow-left"></i> Back to ' + catName;
      }
    }
  }

  /* ========================================
     Style the typed.js cursor
     ======================================== */
  var typed = document.querySelector('.typed-cursor');
  if (typed) {
    typed.style.color = '#00f7ff';
    typed.style.textShadow = '0 0 10px rgba(0, 247, 255, 0.5)';
  }

}

// Run on initial load
document.addEventListener('DOMContentLoaded', initCustomEffects);
// Re-run on PJAX navigation
document.addEventListener('pjax:complete', initCustomEffects);
