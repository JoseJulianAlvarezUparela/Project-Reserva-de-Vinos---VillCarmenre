/**
 * ==========================================================================
 * NUESTRA HISTORIA EDITORIAL - ANIMACIONES MODULARES
 * Este módulo controla únicamente los 5 pósters verticales de #historia.
 * Usa GSAP ScrollTrigger para pinning, revelado de imagen, entrada de texto
 * en cascada y parallax sutil.
 * ==========================================================================
 */

/**
 * Inicializa las animaciones de la sección Nuestra Historia.
 */
export const initHistoryAnimations = () => {
  // Selecciona todos los bloques editoriales que deben animarse.
  const posterBlocks = document.querySelectorAll("[data-poster-block]");

  // Si la sección no existe en la página, el módulo termina sin afectar nada.
  if (!posterBlocks.length) {
    return;
  }

  // Si GSAP o ScrollTrigger no cargaron, dejamos el contenido visible como fallback.
  if (!window.gsap || !window.ScrollTrigger) {
    posterBlocks.forEach((block) => {
      // Muestra los textos sin animación para mantener accesibilidad del contenido.
      block.querySelectorAll("[data-poster-text-item]").forEach((item) => {
        item.style.opacity = "1";
      });

      // Muestra la imagen sin animación para evitar una sección vacía.
      const image = block.querySelector("[data-poster-image]");
      if (image) {
        image.style.opacity = "1";
      }
    });

    return;
  }

  // Registra ScrollTrigger para que GSAP pueda sincronizar animaciones con el scroll.
  window.gsap.registerPlugin(window.ScrollTrigger);

  // Recorre cada póster para construir una línea de tiempo independiente.
  posterBlocks.forEach((block) => {
    // Detecta si el bloque está invertido para decidir desde qué lateral entra el texto.
    const isReverse = block.classList.contains("poster-block--reverse");

    // Selecciona la imagen temporal dentro del marco del póster.
    const image = block.querySelector("[data-poster-image]");

    // Selecciona los elementos textuales que deben entrar en cascada.
    const textItems = block.querySelectorAll("[data-poster-text-item]");

    // Si un póster queda incompleto en futuras ediciones, se omite sin detener los demás.
    if (!image || !textItems.length) {
      return;
    }

    // Define la dirección horizontal de entrada según el patrón zig-zag.
    const textOffsetX = isReverse ? 50 : -50;

    // Prepara la imagen antes del scroll: ligeramente ampliada y transparente.
    window.gsap.set(image, {
      opacity: 0,
      scale: 1.1,
      yPercent: 4,
      transformOrigin: "center center"
    });

    // Prepara los textos antes del scroll: desplazados desde su lateral y transparentes.
    window.gsap.set(textItems, {
      opacity: 0,
      x: textOffsetX
    });

    // Crea una línea de tiempo vinculada al scroll para este póster específico.
    const timeline = window.gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1
      }
    });

    // Revela la imagen con una máscara visual basada en escala y opacidad.
    timeline.to(image, {
      opacity: 1,
      scale: 1,
      duration: 0.28,
      ease: "power2.out"
    }, 0.04);

    // Hace entrar año, titular y párrafo en cascada desde el lateral correspondiente.
    timeline.to(textItems, {
      opacity: 1,
      x: 0,
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.15
    }, 0.12);

    // Aplica parallax sutil a la imagen durante el mismo scroll fijado.
    timeline.to(image, {
      yPercent: -10,
      duration: 0.7,
      ease: "none"
    }, 0.28);
  });
};
