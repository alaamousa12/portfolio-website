// Animate skills progress bars when in view
function animateSkills() {
  const skillsSection = document.querySelector("#skills");
  const skills = document.querySelectorAll(".skill-progress");
  if (!skillsSection) return;

  const sectionTop = skillsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  if (sectionTop <= windowHeight - 100) {
    // لو العنصر في الشاشة، نملأ الـ width
    skills.forEach((skill) => {
      const value = skill.getAttribute("data-width").trim();
      skill.style.width = value;
    });
  } else {
    // لو العنصر خارج الشاشة، نرجع الـ width صفر
    skills.forEach((skill) => {
      skill.style.width = "0";
    });
  }
}


// Simple scroll animations for sections
const scrollElements = document.querySelectorAll(
  ".section, .hero, .project-card"
);

const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) - offset
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
      displayScrollElement(el);
    } else {
      hideScrollElement(el);
    }
  });
};

// Animate About Section separately
const aboutContent = document.querySelector(".about-content");
const aboutImage = document.querySelector(".about-image");
const aboutText = document.querySelector(".about-text");

const animateAbout = () => {
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  if (aboutContent) {
    const contentTop = aboutContent.getBoundingClientRect().top;
    if (contentTop <= windowHeight - 100) {
      aboutContent.classList.add("scrolled");
    } else {
      aboutContent.classList.remove("scrolled");
    }
  }

  if (aboutImage) {
    const imageTop = aboutImage.getBoundingClientRect().top;
    if (imageTop <= windowHeight - 100) {
      aboutImage.classList.add("scrolled");
    } else {
      aboutImage.classList.remove("scrolled");
    }
  }

  if (aboutText) {
    const textTop = aboutText.getBoundingClientRect().top;
    if (textTop <= windowHeight - 100) {
      aboutText.classList.add("scrolled");
    } else {
      aboutText.classList.remove("scrolled");
    }
  }
};


// Dark Mode للـ Hero, About, Skills, Projects, Contact, Header Sections مع تغيير الأيقونة
function initDarkAbout() {
  const darkBtn = document.getElementById('dark-mode-btn');
  const heroSection = document.getElementById('home');      
  const aboutSection = document.getElementById('about');
  const skillsSection = document.getElementById('skills');
  const projectsSection = document.getElementById('projects');
  const certificatesSection = document.getElementById('certificates');
  const contactSection = document.getElementById('contact');
  const header = document.querySelector('header');          
  const icon = darkBtn.querySelector('i');

  if (darkBtn && heroSection && aboutSection && skillsSection && projectsSection && contactSection && header) {
    
    // ✅ عند تحميل الصفحة: خلي الأيقونة دايمًا شمس (الوضع الفاتح)
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');

    darkBtn.addEventListener('click', () => {
      heroSection.classList.toggle('dark-hero');
      aboutSection.classList.toggle('dark-about');
      skillsSection.classList.toggle('dark-about'); 
      projectsSection.classList.toggle('dark-about');
      certificatesSection.classList.toggle('dark-certificates');
      contactSection.classList.toggle('dark-about');
      header.classList.toggle('dark-header');   

      // ✅ عند التبديل غير الأيقونة
      if (aboutSection.classList.contains('dark-about')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    });
  }
}

function initMain() {
  handleScrollAnimation(); 
  animateAbout(); // animate About section on load

  window.addEventListener("scroll", handleScrollAnimation);
  window.addEventListener("scroll", animateSkills);
  window.addEventListener("scroll", animateAbout);

  initDarkAbout(); // تفعيل Dark Mode للـ About, Skills, Projects

  // 🎉 Confetti on logo click
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", function (e) {
      e.preventDefault();
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    });
  }
}


// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  initMain();
});
