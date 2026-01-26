const headerLinks = document.querySelectorAll(".header-list a");
headerLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

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
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

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
});


const menuToggle = document.getElementById('menu-toggle');
const slideMenu = document.getElementById('slide-menu');

menuToggle.addEventListener('click', () => {
    slideMenu.classList.toggle('active');
});


