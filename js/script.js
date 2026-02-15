(function () {
  const root = document.documentElement;

  // --- Tema (claro/escuro) ---
  const modeToggle = document.getElementById("modeToggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  modeToggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", current);
    localStorage.setItem("theme", current);
  });

  // --- Menu mobile ---
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  navToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Fechar menu ao clicar em link
  navMenu?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // --- Destaque da seção ativa ---
  const links = Array.from(document.querySelectorAll(".nav__link"));
  const sections = links
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    },
    { threshold: [0.15, 0.3, 0.5, 0.7] }
  );

  sections.forEach((s) => observer.observe(s));

  // --- Botão voltar ao topo ---
  const toTop = document.getElementById("toTop");
  const onScroll = () => {
    const show = window.scrollY > 500;
    toTop?.classList.toggle("show", show);
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
