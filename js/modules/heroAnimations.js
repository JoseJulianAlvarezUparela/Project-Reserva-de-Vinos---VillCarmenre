/**
 * ==========================================================================
 * MÓDULO: ANIMACIONES DE LA SECCIÓN HERO / PORTADA
 * ==========================================================================
 * Este módulo orquesta la presentación cinematográfica del Hero:
 * 1. Efecto Parallax en la imagen de fondo (zoom sutil y desplazamiento vertical).
 * 2. Revelado tipográfico elegante mediante máscaras (clip-path) y desenfoques progresivos.
 * 3. Sincronización continua con la rueda de desplazamiento usando GSAP ScrollTrigger (scrubbing).
 */

export const initHeroAnimations = () => {
  // Selección de los elementos estructurales de la sección hero
  const hero = document.querySelector("#origen");
  const heroBackground = document.querySelector("[data-hero-bg]");
  const heroContent = document.querySelector("[data-hero-content]");
  const lineInners = document.querySelectorAll(".hero-title .line-inner, .hero-subtitle .line-inner");
  const heroItems = document.querySelectorAll("[data-hero-item]");

  // Si no se encuentran los elementos mínimos necesarios, salimos de forma segura
  if (!hero || !heroBackground) {
    return;
  }

  /**
   * Respaldo (Fallback) básico sin animaciones:
   * Si GSAP no está cargado, muestra el contenido de inmediato para garantizar accesibilidad.
   */
  if (!window.gsap) {
    if (heroContent) {
      heroContent.style.opacity = "1";
    }

    heroItems.forEach((item) => {
      item.style.opacity = "1";
    });

    return;
  }

  // Si ScrollTrigger está presente en window, lo registramos en GSAP
  if (window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  /**
   * Estados iniciales (gsap.set):
   * Configuramos los elementos en sus posiciones previas al inicio de la animación:
   * - Fondo ampliado con escala 1.18 para permitir el zoom-out durante el scroll.
   * - Textos ocultos con opacidad 0, desenfocados (blur) y desplazados hacia abajo.
   * - Líneas de texto recortadas con clipPath para el efecto de cortinilla tipográfica.
   */
  window.gsap.set(heroBackground, { scale: 1.18, yPercent: 0 });
  window.gsap.set(heroContent, { opacity: 0, y: 82, filter: "blur(18px)" });
  window.gsap.set(lineInners, {
    clipPath: "inset(100% 0% 0% 0%)", // Oculta el texto desde la base
    opacity: 0,
    y: 76
  });
  window.gsap.set(heroItems, { opacity: 0, y: 28, filter: "blur(10px)" });

  /**
   * Animación directa de entrada (si ScrollTrigger NO está activo):
   * Se ejecuta automáticamente tras la carga de la página como una animación tradicional basada en tiempo.
   */
  if (!window.ScrollTrigger) {
    window.gsap.to(heroBackground, { scale: 1, duration: 1.8, ease: "power2.out" });
    window.gsap.to(heroContent, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out" });
    window.gsap.to(lineInners, {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.12 // Revelado escalonado entre líneas
    });
    window.gsap.to(heroItems, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      delay: 0.45,
      stagger: 0.14,
      ease: "power3.out"
    });
    return;
  }

  /**
   * Animación vinculada al scroll (ScrollTrigger Scrubbing):
   * La posición del scroll del usuario actúa como la barra de reproducción de la animación.
   */
  const scrollTimeline = window.gsap.timeline({
    scrollTrigger: {
      trigger: hero,              // Elemento que define la altura total del recorrido (280vh)
      start: "top top",           // Inicia cuando la parte superior de #origen toca la parte superior de la ventana
      end: "bottom bottom",       // Termina al alcanzar el fondo de #origen
      scrub: true                 // Movimiento bidireccional suave según la velocidad del scroll
    }
  });

  // Secuencia temporal del timeline:
  scrollTimeline
    // 1. Escala inicial y sutil paneo del fondo fotográfico
    .to(heroBackground, { scale: 1.1, yPercent: 3, duration: 0.34, ease: "none" }, 0)
    // 2. Aparición y enfoque progresivo del bloque central de contenido
    .to(heroContent, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.16, ease: "power2.out" }, 0.34)
    // 3. Revelado por máscara de las líneas de título y subtítulo con desfase (stagger)
    .to(lineInners, {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out",
      stagger: 0.025
    }, 0.38)
    // 4. Aparición nítida de los elementos complementarios (antetítulo e indicador de scroll)
    .to(heroItems, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.14,
      ease: "power2.out",
      stagger: 0.025
    }, 0.46)
    // 5. Desplazamiento parallax hacia arriba del contenido mientras continúa el scroll
    .to(heroContent, { yPercent: -10, duration: 0.32, ease: "none" }, 0.56)
    // 6. El fondo continúa ajustando su escala y traslación vertical
    .to(heroBackground, { scale: 1, yPercent: 9, duration: 0.62, ease: "none" }, 0.34)
    // 7. Desvanecimiento y desenfoque final del hero para dar paso fluido a la siguiente sección
    .to([heroContent, ...heroItems], {
      opacity: 0,
      filter: "blur(14px)",
      duration: 0.16,
      ease: "power2.in"
    }, 0.84);
};
