
// // Simple form validation
// const contactForm = document.querySelector(".contact-form");

// if (contactForm) {
//   contactForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const subject = document.getElementById("subject").value.trim();
//     const message = document.getElementById("message").value.trim();

//     if (!name || !email || !subject || !message) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     // You can add more validation here (email format, message length, etc.)
//     alert("Message sent successfully!");
//     contactForm.reset();
//   });
// }


// // Simple form validation + EmailJS
// (function () {
//   emailjs.init("KXTIh0msAdAh9BYY0"); // Public Key
// })();

// const contactForm = document.querySelector(".contact-form");

// if (contactForm) {
//   contactForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const subject = document.getElementById("subject").value.trim();
//     const message = document.getElementById("message").value.trim();

//     // ✅ الفاليديشن
//     if (!name || !email || !subject || !message) {
//       alert("⚠️ Please fill in all fields.");
//       return;
//     }

//     // ✅ إرسال البيانات عبر EmailJS
//     emailjs.sendForm("service_j9veupr", "template_jltyky2", this)
//       .then(function () {
//         alert("✅ تم إرسال الرسالة بنجاح!");
//         contactForm.reset(); // تفريغ الحقول بعد الإرسال
//       }, function (error) {
//         alert("❌ حصل خطأ: " + JSON.stringify(error));
//       });
//   });
// }


// ✅ تهيئة EmailJS
(function () {
  emailjs.init("KXTIh0msAdAh9BYY0"); // Public Key بتاعك
})();

// 🎯 Contact Form
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    emailjs.sendForm("service_j9veupr", "template_jltyky2", this)
      .then(function () {
        alert("✅ تم إرسال الرسالة بنجاح!");
        contactForm.reset();
      }, function (error) {
        alert("❌ حصل خطأ: " + JSON.stringify(error));
      });
  });
}

// 🎯 Newsletter Form
const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = newsletterForm.querySelector(".newsletter-input").value.trim();

    if (!email) {
      alert("⚠️ Please enter your email.");
      return;
    }

    // ✅ إرسال الإيميل عبر EmailJS
    emailjs.send("service_d9lep3g", "template_lccgfun", {
      user_email: email
    })
      .then(function () {
        alert("✅ شكراً لاشتراكك! تم تسجيل البريد بنجاح.");
        newsletterForm.reset();
      }, function (error) {
        alert("❌ حصل خطأ: " + JSON.stringify(error));
      });
  });
}
