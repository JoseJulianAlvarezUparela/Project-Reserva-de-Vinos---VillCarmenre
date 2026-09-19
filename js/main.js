/**
 * ==========================================================================
 * VIÑA CARMENÈRE - ARCHIVO PRINCIPAL DE ENTRADA (JavaScript ES Module)
 * ==========================================================================
 * Este archivo actúa como punto de arranque (entry point) de la web.
 * Se encarga de importar e invocar las funciones que orquestan las
 * animaciones del Header y de la sección Hero.
 */

// Importación de módulos especializados
import { initHeaderAnimations } from "./modules/headerAnimations.js";
import { initHeroAnimations } from "./modules/heroAnimations.js";
import { initHistoryAnimations } from "./modules/historyAnimations.js";

/**
 * Función que arranca la lógica interactiva del sitio.
 */
const initSite = () => {
  initHeaderAnimations();
  initHeroAnimations();
  initHistoryAnimations();
};

/**
 * Control de ciclo de vida del DOM:
 * - Si el documento aún se está parseando ('loading'), espera el evento 'DOMContentLoaded'.
 * - Si el documento ya cargó completamente, invoca directamente initSite().
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSite);
} else {
  initSite();
}
