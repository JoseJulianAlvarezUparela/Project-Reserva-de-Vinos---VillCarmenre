
/**
 * ==========================================================================
 * HERO ANIMATIONS — CINEMATIC SCROLL EXPERIENCE
 * ==========================================================================
 * 1. Parallax fotográfico progresivo.
 * 2. Revelado tipográfico temprano y escalonado.
 * 3. Permanencia del contenido para facilitar su lectura.
 * 4. Salida cinematográfica sincronizada con ScrollTrigger.
 */

export const initHeroAnimations = () => {
  const hero = document.querySelector("#origen");
  const heroBackground = document.querySelector("[data-hero-bg]");
  const heroContent = document.querySelector("[data-hero-content]");
  const lineInners = document.querySelectorAll(
    ".hero-title .line-inner, .hero-subtitle .line-inner"
  );
  const heroItems = document.querySelectorAll("[data-hero-item]");

  if (!hero || !heroBackground) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  // Fallback accesible
  if (!gsap) {
    if (heroContent) heroContent.style.opacity = "1";

    heroItems.forEach((item) => {
      item.style.opacity = "1";
    });

    lineInners.forEach((line) => {
      line.style.opacity = "1";
      line.style.clipPath = "none";
      line.style.transform = "none";
    });

    return;
  }

  if (ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Estado inicial
  gsap.set(heroBackground, {
    scale: 3.16,
    yPercent: 0,
    transformOrigin: "center center"
  });

  gsap.set(heroContent, {
    opacity: 0,
    y: 45,
    filter: "blur(12px)"
  });

  gsap.set(lineInners, {
    clipPath: "inset(100% 0% 0% 0%)",
    opacity: 0,
    y: 35
  });

  gsap.set(heroItems, {
    opacity: 0,
    y: 18,
    filter: "blur(6px)"
  });

  // Animación tradicional sin ScrollTrigger
  if (!ScrollTrigger) {
    gsap.to(heroBackground, {
      scale: 1,
      duration: 2,
      ease: "power2.out"
    });

    gsap.to(heroContent, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out"
    });

    gsap.to(lineInners, {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out"
    });

    gsap.to(heroItems, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      stagger: 0.12,
      delay: 0.3,
      ease: "power3.out"
    });

    return;
  }

  // Timeline cinematográfico
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      invalidateOnRefresh: true
    }
  });

  timeline

    // 1. Movimiento inicial del fondo
    .to(heroBackground, {
      scale: 1.10,
      yPercent: 2,
      duration: 1,
      ease: "none"
    }, 0)

    // 2. Entrada temprana del contenido
    .to(heroContent, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out"
    }, 0.08)

    // 3. Revelado tipográfico
    .to(lineInners, {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    }, 0.1)

    // 4. Elementos complementarios
    .to(heroItems, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.6,
      stagger: 0.10,
      ease: "power2.out"
    }, 0.25)

    // 5. Parallax sutil del fondo
    .to(heroBackground, {
      scale: 1.04,
      yPercent: 5,
      duration: 5,
      ease: "none"
    }, 0.15)

    // 6. Permanencia del contenido
    // No se anima el texto durante este tramo:
    // permanece visible para facilitar su lectura.

    // 7. Desplazamiento vertical muy sutil
    .to(heroContent, {
      yPercent: -5,
      duration: 1.2,
      ease: "none"
    }, 0.68)

    // 8. Salida cinematográfica
    .to([heroContent, ...heroItems], {
      opacity: 0,
      filter: "blur(8px)",
      y: -15,
      duration: 0.8,
      ease: "power2.in"
    }, 0.84)

    // 9. Movimiento final del fondo
    .to(heroBackground, {
      scale: 1,
      yPercent: 8,
      duration: 1,
      ease: "none"
    }, 0.84);

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
  };
};
