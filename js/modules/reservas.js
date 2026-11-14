/**
 * ==========================================================================
 * MÓDULO: SANCTUARIUM & RESERVAS (Interacción y Formulario Concierge)
 * ==========================================================================
 * Este módulo gestiona:
 * 1. Selección interactiva de las tarjetas de experiencia con sincronización en tiempo real.
 * 2. Validación y envío accesible de la solicitud de reserva al concierge privado.
 * 3. Notificación de confirmación elegante y feedback inmediato para el usuario.
 */

export const initReservas = () => {
  const experienceCards = document.querySelectorAll(".experience-card");
  const selectedExperienceNotice = document.querySelector(".concierge-card__selection-name");
  const experienceInput = document.querySelector("#form-experiencia");
  const form = document.querySelector(".concierge-form");
  const feedbackBox = document.querySelector(".concierge-feedback");

  if (!experienceCards.length) {
    return;
  }

  // ------------------------------------------------------------------------
  // 1. SELECTOR INTERACTIVO DE EXPERIENCIAS SANCTUARIUM
  // ------------------------------------------------------------------------
  experienceCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remueve el estado activo de todas las tarjetas
      experienceCards.forEach((c) => {
        c.classList.remove("is-selected");
        c.setAttribute("aria-checked", "false");
      });

      // Activa la tarjeta clickeada
      card.classList.add("is-selected");
      card.setAttribute("aria-checked", "true");

      // Obtiene el nombre de la experiencia seleccionada
      const experienceName = card.querySelector(".experience-card__title")?.textContent?.trim() || "Experiencia Sanctuarium";

      // Sincroniza el aviso visual en el formulario
      if (selectedExperienceNotice) {
        selectedExperienceNotice.textContent = experienceName;
      }

      // Sincroniza el campo oculto/valor en el formulario
      if (experienceInput) {
        experienceInput.value = experienceName;
      }
    });
  });

  // ------------------------------------------------------------------------
  // 2. ENVÍO Y VALIDACIÓN CONCIERGE DEL FORMULARIO
  // ------------------------------------------------------------------------
  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita la recarga de página

    const submitBtn = form.querySelector(".concierge-submit-btn");
    const nameInput = form.querySelector("#form-nombre");
    const emailInput = form.querySelector("#form-email");

    // Validación básica de campos obligatorios
    if (!nameInput?.value.trim() || !emailInput?.value.trim()) {
      if (feedbackBox) {
        feedbackBox.textContent = "Por favor, complete su nombre y correo electrónico para coordinar su visita.";
        feedbackBox.classList.add("is-visible");
        feedbackBox.style.color = "#B65A3C";
      }
      return;
    }

    // Efecto de carga / procesamiento en el botón
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.75";
      submitBtn.innerHTML = `<span>Procesando solicitud...</span>`;
    }

    // Simulación de confirmación concierge en tiempo real
    setTimeout(() => {
      if (feedbackBox) {
        feedbackBox.innerHTML = `<strong>✓ Solicitud Recibida</strong><br>Gracias por su interés en el Sanctuarium. Nuestro Sommelier Concierge le contactará en un plazo máximo de 24 horas para coordinar cada detalle de su experiencia privada.`;
        feedbackBox.classList.add("is-visible");
        feedbackBox.style.color = "var(--color-primary, #5B1F2E)";
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.innerHTML = `<span>Solicitud Enviada con Éxito</span>`;
      }

      // Limpia campos del formulario
      form.reset();
    }, 600);
  });
};
