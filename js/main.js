document.addEventListener("DOMContentLoaded", function () {
  // --- Navigation & Menu ---
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.getElementById("header");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.querySelector("i").classList.toggle("fa-times");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.querySelector("i").classList.remove("fa-times");
    });
  });

  // Sticky Header
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50)
      header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    else header.style.boxShadow = "none";
  });

  // --- Dark Mode ---
  const themeBtn = document.getElementById("dark-mode-btn");
  const themeIcon = themeBtn.querySelector("i");

  // Check saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      themeIcon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    }
  });

  // --- Typing Effect ---
  const typingText = document.querySelector(".typing-text");
  const words = ["Mobile App Developer", "Flutter Enthusiast", "UI/UX Lover"];
  let wordIndex = 0,
    charIndex = 0,
    isDeleting = false;

  const type = () => {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? 100 : 200);
    }
  };
  type();

  // --- Project Filter ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.style.display = "block";
          // Animation reset
          card.style.animation = "none";
          card.offsetHeight; /* trigger reflow */
          card.style.animation = "fadeInUp 0.5s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // --- Scroll Reveal Animation (The Magic) ---
  const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right",
  );

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add("reveal-active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  // Trigger once on load
  revealOnScroll();

  // --- Courses Modal Logic (NEW) ---
  const courseCards = document.querySelectorAll(".course-card");
  const courseModals = document.querySelectorAll(".course-modal");
  const modalCloseBtns = document.querySelectorAll(".modal-close-btn");

  // دالة لفتح المودال
  const openModal = (modalId) => {
    const modal = document.querySelector(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // منع السكرول في الصفحة الخلفية
    }
  };

  // دالة لغلق المودال
  const closeModal = (modal) => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto"; // إرجاع السكرول
  };

  // إضافة حدث الضغط على الكروت
  courseCards.forEach((card) => {
    card.addEventListener("click", () => {
      const targetModalId = card.getAttribute("data-course-target");
      openModal(targetModalId);
    });
  });

  // إضافة حدث الضغط على زر الإغلاق (X)
  modalCloseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".course-modal");
      closeModal(modal);
    });
  });

  // إغلاق المودال عند الضغط على الخلفية السوداء
  courseModals.forEach((modal) => {
    modal.querySelector(".modal-overlay").addEventListener("click", () => {
      closeModal(modal);
    });
  });

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn = contactForm.querySelector("button");
      const originalText = btn.innerHTML;

      // تغيير شكل الزرار أثناء التحميل
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      // استبدل service_id و template_id باللي عندك في EmailJS
      // emailjs.sendForm('service_id', 'template_id', this)

      // محاكاة للإرسال (عشان تجرب الشكل)
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
        btn.style.background = "#10b981"; // لون أخضر
        contactForm.reset();

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = ""; // رجع اللون الأصلي
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
});
