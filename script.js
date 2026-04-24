document.addEventListener("DOMContentLoaded", function () {

  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // animate once only
      }
    });
  }, {
    threshold: 0.2
  });

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });

});