/**
 * ==========================================================================
 * MÓDULO: ANIMACIONES DEL HEADER E INTRODUCCIÓN DEL LOGO
 * ==========================================================================
 * Este módulo gestiona:
 * 1. La transición cinemática del logotipo central grande hacia el header al hacer scroll.
 * 2. El cambio de aspecto del header (desenfoque y sombra) tras superar los 80px de scroll.
 * 3. La interactividad y accesibilidad del menú hamburguesa en dispositivos móviles.
 */

export const initHeaderAnimations = () => {
  // Selección de nodos del DOM mediante selectores de datos y clases
  const header = document.querySelector("[data-header]");
  const logo = document.querySelector("[data-logo]");
  const brandCopy = document.querySelector(".brand-copy");
  const introScreen = document.querySelector("[data-intro-screen]");
  const introLogoLayer = document.querySelector("[data-intro-logo-layer]");
  const introLogo = document.querySelector("[data-intro-logo]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");

  // Si no existe el elemento del header, finaliza la ejecución de forma segura
  if (!header) {
    return;
  }

  /**
   * Alterna la clase CSS 'is-scrolled' en el header para activar el fondo
   * y efectos visuales de desenfoque cuando el usuario se desplaza.
   */
  const setScrolledState = (isScrolled) => {
    header.classList.toggle("is-scrolled", isScrolled);
  };

  // Verificación de disponibilidad de GSAP y ScrollTrigger
  if (window.gsap && window.ScrollTrigger) {
    // Registro oficial del plugin ScrollTrigger en GSAP
    window.gsap.registerPlugin(window.ScrollTrigger);

    /**
     * Trigger 1: Detector de scroll para el fondo del header.
     * Se activa cuando la parte superior de la ventana baja 80px respecto al inicio.
     */
    window.ScrollTrigger.create({
      start: "80px top",
      end: 99999,
      onEnter: () => setScrolledState(true),
      onLeaveBack: () => setScrolledState(false)
    });

    /**
     * Animación de Introducción (Intro Logo -> Header Logo):
     * Convierte el gran logotipo centrado en el isotipo pequeño del header a través
     * del desplazamiento del scroll del usuario (efecto "scrub").
     */
    if (introScreen && introLogoLayer && introLogo && logo) {
      document.body.classList.add("is-entering");

      // Estados iniciales antes de animar (ocultos o desplazados)
      window.gsap.set(logo, { opacity: 0 });
      window.gsap.set(brandCopy, { opacity: 0, x: -12 });
      window.gsap.set(nav, { opacity: 0, x: 42 });
      window.gsap.set(navToggle, { opacity: 0, x: 18 });
      const navigationElements = [nav, navToggle].filter(Boolean);

      /**
       * Construcción de la línea de tiempo GSAP sincronizada con el scroll
       */
      const buildIntroTimeline = () => {
        // Obtenemos coordenadas y dimensiones en pantalla de ambos logos
        const introRect = introLogo.getBoundingClientRect();
        const logoRect = logo.getBoundingClientRect();

        // Calculamos la distancia exacta en X e Y para trasladar el logo central hasta el header
        const x = logoRect.left + logoRect.width / 2 - (introRect.left + introRect.width / 2);
        const y = logoRect.top + logoRect.height / 2 - (introRect.top + introRect.height / 2);

        // Calculamos la escala relativa entre el tamaño inicial y el tamaño final
        const scale = logoRect.width / introRect.width;

        // Limpia transformaciones previas y asegura el origen de la escala
        window.gsap.set(introLogo, {
          clearProps: "transform",
          transformOrigin: "center center"
        });
        window.gsap.set(introLogoLayer, { opacity: 1 });

        // Creación del timeline atado al scroll de la sección 'introScreen'
        return window.gsap.timeline({
          scrollTrigger: {
            trigger: introScreen,
            start: "top top",
            end: "bottom top",
            scrub: 1.15, // Suavizado del scroll para un movimiento fluido
            invalidateOnRefresh: true, // Recalcula posiciones al redimensionar ventana
            onUpdate: (self) => {
              // Cuando se supera el 92% del scroll, el logo ya está en el header
              const isSettled = self.progress > 0.92;
              header.classList.toggle("is-intro", !isSettled);
              document.body.classList.toggle("is-entering", !isSettled);
            },
            onLeave: () => {
              header.classList.remove("is-intro");
              document.body.classList.remove("is-entering");
            },
            onEnterBack: () => {
              header.classList.add("is-intro");
              document.body.classList.add("is-entering");
            }
          }
        })
          // 1. Mueve y escala el logo inicial hacia la posición del logo del header
          .to(introLogo, { x, y, scale, duration: 0.78, ease: "none" }, 0)
          // 2. Hace aparecer los elementos del menú de navegación
          .to(navigationElements, { opacity: 1, x: 0, duration: 0.24, ease: "power2.out" }, 0.48)
          // 3. Revela el texto del nombre de la viña en el header
          .to(brandCopy, { opacity: 1, x: 0, duration: 0.22, ease: "power2.out" }, 0.58)
          // 4. Muestra el logo definitivo del header
          .to(logo, { opacity: 1, duration: 0.08, ease: "none" }, 0.88)
          // 5. Desvanece la capa flotante temporal del logo
          .to(introLogoLayer, { opacity: 0, duration: 0.1, ease: "none" }, 0.9);
      };

      buildIntroTimeline();
    }
  } else {
    /**
     * Alternativa de respaldo (Fallback) en caso de que GSAP no esté disponible:
     * Utiliza listeners nativos de scroll para cambiar el estado del header y
     * oculta de inmediato las capas de animación introductoria.
     */
    const updateHeader = () => setScrolledState(window.scrollY > 80);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    header.classList.remove("is-intro");
    document.body.classList.remove("is-entering");

    if (introLogoLayer) {
      introLogoLayer.style.display = "none";
    }

    if (introScreen) {
      introScreen.style.display = "none";
    }
  }

  // Si no existen los elementos del menú de navegación móvil, terminamos aquí
  if (!nav || !navToggle) {
    return;
  }

  /**
   * Cierra el menú móvil y restablece los atributos de accesibilidad
   */
  const closeNav = () => {
    nav.classList.remove("is-open");
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  /**
   * Listener para abrir o cerrar el menú al presionar el botón hamburguesa
   */
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  /**
   * Cierra automáticamente el menú móvil cuando el usuario hace clic en un enlace de navegación
   */
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });
};
