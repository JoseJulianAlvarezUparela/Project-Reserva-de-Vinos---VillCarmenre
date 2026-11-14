/**
 * ==========================================================================
 * MÓDULO: EXPERIENCIA CINEMATOGRÁFICA — EL TERROIR & FINCA
 * ==========================================================================
 * Dos experiencias según el ancho de pantalla (gsap.matchMedia):
 *
 * DESKTOP (> 900px): Scroll HORIZONTAL pinneado
 *   - La sección se fija (pin) mientras GSAP traduce el scroll en un tween X.
 *   - 500vw de ancho total → 5 paneles de 100vw se recorren horizontalmente.
 *   - Parallax inverso en la imagen (xPercent) para profundidad tridimensional.
 *   - containerAnimation enlaza animaciones internas al tween horizontal.
 *   - HUD horizontal inferior: barra de avance + contador 01/05 + puntos.
 *
 * MÓVIL (≤ 900px): Scroll VERTICAL pinneado
 *   - La sección se fija (pin) durante los 5 paneles apilados en Z.
 *   - Cada panel entra desde Y: 100% → Y: 0 con ease elástico suave.
 *   - Parallax vertical en la imagen (yPercent) para profundidad.
 *   - HUD lateral derecho: barra vertical + contador + puntos en columna.
 * ==========================================================================
 */

export const initTerroirExperience = () => {
  // Verificación de disponibilidad de GSAP y ScrollTrigger en window
  if (!window.gsap || !window.ScrollTrigger) {
    return;
  }

  // Registro oficial del plugin ScrollTrigger en GSAP
  window.gsap.registerPlugin(window.ScrollTrigger);

  // ------------------------------------------------------------------------
  // SELECCIÓN DE ELEMENTOS DEL DOM (comunes a ambos modos)
  // ------------------------------------------------------------------------
  const wrapper          = document.querySelector("[data-terroir-pin]");
  const track            = document.querySelector("[data-terroir-track]");
  const panels           = document.querySelectorAll("[data-panel]");
  const counterCurrent   = document.querySelector("[data-counter-current]");
  const progressBar      = document.querySelector("[data-progress-bar]");
  const dots             = document.querySelectorAll("[data-dot]");

  if (!wrapper || !track || panels.length === 0) {
    return;
  }

  // Función auxiliar: actualiza el punto activo del HUD según el panel actual
  const updateDots = (activeIndex) => {
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === activeIndex);
    });
  };

  // Función auxiliar: actualiza el texto del contador (ej. "03")
  const updateCounter = (num) => {
    if (counterCurrent) {
      counterCurrent.textContent = `0${num}`;
    }
  };

  // ========================================================================
  // gsap.matchMedia() — separa la lógica por breakpoint sin conflictos
  // ========================================================================
  const mm = window.gsap.matchMedia();

  // =========================================================================
  // DESKTOP (> 900px): RECORRIDO HORIZONTAL PINNEADO
  // =========================================================================
  mm.add("(min-width: 901px)", () => {

    // Distancia total de desplazamiento: ancho total del track − 1 viewport
    const getScrollAmount = () => track.scrollWidth - window.innerWidth;

    // Distancia vertical de scroll del usuario durante el pin (2.2 × alto viewport)
    // → Responde ágilmente al ratón sin ser demasiado lento
    const getScrollDistance = () => Math.round(window.innerHeight * 2.2);

    // --------------------------------------------------------------------
    // TWEEN PRINCIPAL HORIZONTAL (track se mueve de X: 0 → X: -scrollAmount)
    // --------------------------------------------------------------------
    const horizontalTween = window.gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",             // Movimiento 1:1 exacto con el scroll del ratón
      scrollTrigger: {
        trigger: wrapper,
        pin: true,              // Fija la sección durante todo el recorrido
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        scrub: true,            // Sigue el ratón en tiempo real sin inercia añadida
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Actualiza la barra de progreso horizontal (width en %)
          if (progressBar) {
            const pct = Math.min(100, Math.max(20, self.progress * 100));
            progressBar.style.width = `${pct}%`;
          }
          // Actualiza el contador y los puntos según el panel activo
          const panelIdx = Math.min(4, Math.floor(self.progress * 5));
          updateCounter(panelIdx + 1);
          updateDots(panelIdx);
        }
      }
    });

    // --------------------------------------------------------------------
    // ANIMACIONES INTERNAS DE CADA PANEL (containerAnimation)
    // Texto entra escalonado (stagger) cuando el panel asoma en el viewport
    // --------------------------------------------------------------------
    panels.forEach((panel, index) => {
      // Revelado escalonado de los textos al entrar el panel
      const textItems = panel.querySelectorAll("[data-panel-text]");
      if (textItems.length > 0 && index > 0) {
        window.gsap.from(textItems, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          stagger: 0.13,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalTween, // Vinculado al tween horizontal
            start: "left 72%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Parallax inverso en la imagen de fondo (xPercent 0 → 18)
      const bgImage = panel.querySelector("[data-panel-bg]");
      if (bgImage) {
        window.gsap.to(bgImage, {
          xPercent: 18,         // La imagen se mueve más despacio → profundidad
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalTween,
            start: "left right",
            end: "right left",
            scrub: true
          }
        });
      }
    });

    // Función de cleanup que GSAP ejecuta al salir del breakpoint
    return () => {
      window.ScrollTrigger.getAll().forEach(t => t.kill());
    };
  });

  // =========================================================================
  // MÓVIL (≤ 900px): RECORRIDO VERTICAL PINNEADO CON PANELES APILADOS
  // =========================================================================
  mm.add("(max-width: 900px)", () => {

    // Número de paneles y distancia de scroll por panel
    const panelCount     = panels.length;                     // 5
    const scrollPerPanel = window.innerHeight * 1.0;          // 1 altura de viewport por panel
    const totalScroll    = scrollPerPanel * (panelCount - 1); // 4 transiciones en total

    // Posicionamos todos los paneles en Y: 100% (fuera del viewport, abajo)
    // excepto el primero que ya es visible (Y: 0)
    panels.forEach((panel, i) => {
      window.gsap.set(panel, { yPercent: i === 0 ? 0 : 100 });
    });

    // --------------------------------------------------------------------
    // TIMELINE PRINCIPAL — una transición vertical por cada panel
    // --------------------------------------------------------------------
    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        pin: true,              // Fija la sección mientras transcurren los 5 paneles
        start: "top top",
        end: () => `+=${totalScroll}`,
        scrub: true,            // Sigue el dedo/ratón en tiempo real
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Actualiza la barra de progreso vertical (height en %)
          if (progressBar) {
            const pct = Math.min(100, Math.max(20, self.progress * 100));
            progressBar.style.height = `${pct}%`;
          }
          // Actualiza el contador y los puntos según el panel activo
          const panelIdx = Math.min(panelCount - 1, Math.floor(self.progress * panelCount));
          updateCounter(panelIdx + 1);
          updateDots(panelIdx);
        }
      }
    });

    // Añadimos a la timeline una transición por cada panel (del 2 al 5)
    panels.forEach((panel, i) => {
      if (i === 0) return; // El primero ya está visible, no necesita transición entrante

      // El panel entra desde Y: 100% (abajo) → Y: 0 (posición visible)
      tl.to(panel, {
        yPercent: 0,
        ease: "power2.inOut",   // Suave entrada y salida, sensación cinematográfica
        duration: 1
      }, i - 1);                // Cada transición ocupa 1 unidad en la timeline

      // Parallax en la imagen de fondo: sube ligeramente mientras el panel entra
      const bgImage = panel.querySelector("[data-panel-bg]");
      if (bgImage) {
        tl.fromTo(bgImage,
          { yPercent: -6 },     // Empieza un poco arriba (efecto de profundidad)
          { yPercent: 6, ease: "none", duration: 1 },
          i - 1
        );
      }

      // Revelado de los textos: fade + subida pequeña al entrar el panel
      const textItems = panel.querySelectorAll("[data-panel-text]");
      if (textItems.length > 0) {
        tl.from(textItems, {
          y: 36,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out"
        }, i - 0.4);            // Se activan un poco después del inicio del panel
      }
    });

    // Función de cleanup al salir del breakpoint
    return () => {
      window.ScrollTrigger.getAll().forEach(t => t.kill());
      // Limpia los estilos inline que pusimos con gsap.set
      panels.forEach(panel => window.gsap.set(panel, { clearProps: "all" }));
    };
  });
};
