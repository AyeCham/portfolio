

const scrollBtn = document.querySelector(".scroll-btn");
if (scrollBtn) {
  scrollBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: "smooth"
    });
  });
}

const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      try {
        history.replaceState(null, '', href);
      } catch (_) {}
    }
  });
});

// Scrollspy: update active nav links based on visible section
(function() {
  const sectionIds = ['#home', '#about', '#projects', '#contact'];
  const sections = sectionIds.map(id => document.querySelector(id)).filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('.header-list a, .slide-menu a'));

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        navLinks.forEach(a => {
          if (a.getAttribute('href') === id || a.getAttribute('href') === id.replace('#', '')) {
            a.classList.add('active');
          } else {
            a.classList.remove('active');
          }
        });
      }
    });
  }, { root: null, rootMargin: '-30% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
})();

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // STOP redirect

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.style.display = "block";
        status.style.color = "green";
        status.textContent = "Thank you! Your message has been sent.";
        form.reset();
      } else {
        status.style.display = "block";
        status.style.color = "red";
        status.textContent = "Oops! Something went wrong.";
      }
    } catch (error) {
      status.style.display = "block";
      status.style.color = "red";
      status.textContent = "Network error. Please try again.";
    }
  });
}



const socialIcons = document.querySelectorAll(".social-links-contact a");
socialIcons.forEach(icon => {
  icon.addEventListener("mouseover", () => {
    icon.style.transform = "translateY(-5px) scale(1.2)";
  });
  icon.addEventListener("mouseout", () => {
    icon.style.transform = "translateY(0) scale(1)";
  });
});


document.addEventListener("DOMContentLoaded", () => {

    const fadeElements = document.querySelectorAll(".fade-in-element");
    fadeElements.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add("visible");
        }, i * 150); 
    });


    const links = document.querySelectorAll("a.fade-link[data-link]");
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); 
            const href = link.getAttribute("href");
            document.body.classList.add("page-fade-out");
            setTimeout(() => {
                window.location.href = href;
            }, 600);
        });
    });

    // If the page was opened with a hash, smoothly scroll to section
    if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 60);
        }
    }
});


const menuToggle = document.getElementById('menu-toggle');
const slideMenu = document.getElementById('slide-menu');

if (menuToggle && slideMenu) {
    const menuIcon = menuToggle.querySelector('i');
    const closeBtn = slideMenu.querySelector('.menu-close');
    const overlay = document.getElementById('menu-overlay');

    function openMenu() {
        slideMenu.classList.add('active');
        slideMenu.setAttribute('aria-hidden', 'false');
        if (overlay) overlay.setAttribute('aria-hidden', 'false');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
        if (menuIcon) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        }
        if (closeBtn) closeBtn.focus();
    }

    function closeMenu() {
        slideMenu.classList.remove('active');
        slideMenu.setAttribute('aria-hidden', 'true');
        if (overlay) overlay.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        if (menuIcon) {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
        menuToggle.focus();
    }

    menuToggle.addEventListener('click', () => {
        if (slideMenu.classList.contains('active')) closeMenu(); else openMenu();
    });

    // Close when a link inside the menu is clicked
    const slideLinks = slideMenu.querySelectorAll('a');
    slideLinks.forEach(link => link.addEventListener('click', () => {
        closeMenu();
    }));

    // Close via explicit close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closeMenu());
    }

    // Close when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', () => closeMenu());
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && slideMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu when resizing above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && slideMenu.classList.contains('active')) {
            closeMenu();
        }
        // If the page is resized and the menu ends up in a bad state under small widths enforce closed state
        if (window.innerWidth <= 480 && slideMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Ensure menu is closed on initial load to avoid stray visible state on very small screens
    closeMenu();
}



