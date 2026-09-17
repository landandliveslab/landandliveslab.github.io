document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelectorAll(".theme-nav a[data-theme-link]");
  var sections = document.querySelectorAll(".theme-section");
  if (!links.length || !sections.length || !("IntersectionObserver" in window)) return;

  var linkById = {};
  links.forEach(function (link) {
    linkById[link.getAttribute("data-theme-link")] = link;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var link = linkById[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-20% 0px -70% 0px" }
  );

  sections.forEach(function (section) { observer.observe(section); });
});
