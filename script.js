document.addEventListener("DOMContentLoaded", () => {
  // Smoothly open the scrapbook.
  document.querySelectorAll("[data-scroll]").forEach(button => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });
const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
const openBook = document.querySelector(".open-book");

const startMusic = () => {
  if (!music) return;

  music.volume = 0.22;

  music.play().then(() => {
    musicToggle?.classList.add("is-playing");

    if (musicToggle) {
      musicToggle.setAttribute("aria-label", "Pause music");
      musicToggle.setAttribute("title", "Pause music");
    }
  }).catch(() => {});
};

openBook?.addEventListener("click", startMusic, { once: true });

musicToggle?.addEventListener("click", async () => {
  if (!music) return;

  if (music.paused) {
    music.volume = 0.22;

    try {
      await music.play();

      musicToggle.classList.add("is-playing");
      musicToggle.setAttribute("aria-label", "Pause music");
      musicToggle.setAttribute("title", "Pause music");
    } catch (_) {}
  } else {
    music.pause();

    musicToggle.classList.remove("is-playing");
    musicToggle.setAttribute("aria-label", "Play music");
    musicToggle.setAttribute("title", "Play music");
  }
});

music?.addEventListener("play", () => {
  musicToggle?.classList.add("is-playing");
});

music?.addEventListener("pause", () => {
  musicToggle?.classList.remove("is-playing");
});
  // Gentle reveal as scrapbook pages enter the viewport.
  const revealTargets = document.querySelectorAll(
    ".memory, .chapter, .honour, .ending, .intro-card"
  );

  revealTargets.forEach(el => {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach(el => observer.observe(el));

  // Tiny scrapbook-style cursor note on desktop.
  const cursor = document.querySelector(".cursor-note");
  if (window.matchMedia("(pointer:fine)").matches && cursor) {
    let x = 0, y = 0, tx = 0, ty = 0;

    window.addEventListener("mousemove", e => {
      tx = e.clientX + 15;
      ty = e.clientY + 15;
    });

    const animate = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      cursor.style.transform = `translate(${x}px, ${y}px) rotate(-8deg)`;
      requestAnimationFrame(animate);
    };
    animate();
  } else if (cursor) {
    cursor.remove();
  }
});
