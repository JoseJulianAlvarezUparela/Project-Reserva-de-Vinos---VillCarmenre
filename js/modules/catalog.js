/**
 * ==========================================================================
 * MÓDULO: CATÁLOGO DE VINOS (Interacciones y Favoritos)
 * ==========================================================================
 * Este módulo gestiona la interactividad del catálogo de vinos:
 * - Alternancia del botón de favoritos (corazón) con actualización de aria-pressed.
 * - Soporte para duplicar o renderizar dinámicamente las tarjetas mediante un array de datos.
 */

/**
 * Array de datos estructurados del catálogo de vinos.
 * Puedes utilizar este modelo para modificar, duplicar o consumir datos de una API futura.
 */
export const CATALOGO_DATA = [
  {
    id: "reserva-familia",
    destacada: true,
    tipoVino: "Reserva de Familia",
    variedad: "Carmenère",
    origen: "Valle del Maule · Chile",
    descripcion: "Nuestro vino icono, elaborado solo en cosechas excepcionales con uvas seleccionadas a mano.",
    caracteristica: {
      tipo: "produccion",
      label: "PRODUCCIÓN LIMITADA",
      valor: "1.200 botellas por cosecha"
    },
    maridajes: [
      { id: "carne", nombre: "Carnes rojas asadas" },
      { id: "queso", nombre: "Quesos maduros" },
      { id: "caliente", nombre: "Platos calientes y guisos" }
    ],
    imagen: "assets/Img-Representativa.jpg",
    enlace: "#reservas"
  },
  {
    id: "gran-reserva",
    destacada: false,
    tipoVino: "Gran Reserva",
    variedad: "Carmenère & Syrah",
    origen: "Valle del Maule · Chile",
    descripcion: "Ensamblaje maduro con profundas notas a frutos negros, pimienta silvestre y sutil cacao.",
    caracteristica: {
      tipo: "barrica",
      label: "CRIANZA EN ROBLE",
      valor: "18 meses en roble francés"
    },
    maridajes: [
      { id: "carne", nombre: "Cordero braseado" },
      { id: "queso", nombre: "Quesos curados" },
      { id: "caliente", nombre: "Pastas en reducción de vino" }
    ],
    imagen: "assets/Img-Representativa.jpg",
    enlace: "#reservas"
  },
  {
    id: "terroir-seleccion",
    destacada: false,
    tipoVino: "Terroir Selección",
    variedad: "Carmenère Puro",
    origen: "Valle del Maule · Chile",
    descripcion: "Expresión mineral y taninos sedosos nacida de laderas pedregosas con brisas templadas.",
    caracteristica: {
      tipo: "parcela",
      label: "ORIGEN PARCELA",
      valor: "Cuartel Los Aromos · Finca 1892"
    },
    maridajes: [
      { id: "hongo", nombre: "Setas y hongos silvestres" },
      { id: "carne", nombre: "Carnes magras" },
      { id: "caliente", nombre: "Risotto de trufa negra" }
    ],
    imagen: "assets/Img-Representativa.jpg",
    enlace: "#reservas"
  },
  {
    id: "cosecha-historica",
    destacada: false,
    tipoVino: "Cosecha Histórica",
    variedad: "Carmenère de Guarda",
    origen: "Valle del Maule · Chile",
    descripcion: "Homenaje al año de fundación: taninos sedosos, tabaco noble y frutos deshidratados.",
    caracteristica: {
      tipo: "tiempo",
      label: "TIEMPO DE GUARDA",
      valor: "Potencial de guarda de 15 años"
    },
    maridajes: [
      { id: "carne", nombre: "Estofado de jabalí" },
      { id: "queso", nombre: "Queso azul y frutos secos" },
      { id: "caliente", nombre: "Platos de cocción lenta" }
    ],
    imagen: "assets/Img-Representativa.jpg",
    enlace: "#reservas"
  },
  {
    id: "linaje-andino",
    destacada: false,
    tipoVino: "Linaje Andino",
    variedad: "Carmenère & Cabernet",
    origen: "Valle del Maule · Chile",
    descripcion: "Estructura vibrante y final persistente, con recuerdos de higo maduro y especias dulces.",
    caracteristica: {
      tipo: "altitud",
      label: "ALTITUD VIÑEDO",
      valor: "480 m.s.n.m. en pie de monte"
    },
    maridajes: [
      { id: "ave", nombre: "Pato confitado" },
      { id: "caliente", nombre: "Verduras asadas al romero" },
      { id: "queso", nombre: "Quesos de cabra curados" }
    ],
    imagen: "assets/Img-Representativa.jpg",
    enlace: "#reservas"
  },
  {
    id: "edicion-centenario",
    destacada: false,
    tipoVino: "Edición Centenario",
    variedad: "Viejas Parras",
    origen: "Valle del Maule · Chile",
    descripcion: "Proveniente de viñas centenarias de secano interior, con profunda identidad rústica.",
    caracteristica: {
      tipo: "vendimia",
      label: "VENDIMIA MANUAL",
      valor: "Cosechado al amanecer en cajas"
    },
    maridajes: [
      { id: "brasa", nombre: "Cortes a la leña" },
      { id: "hongo", nombre: "Portobellos salteados" },
      { id: "queso", nombre: "Quesos mantecosos artesanales" }
    ],
    imagen: "assets/Img-Representativa.jpg",
    enlace: "#reservas"
  }
];

/**
 * Inicializa los eventos interactivos del catálogo.
 * - Detecta el clic en el botón de corazón (favorito).
 * - Alterna la clase CSS y actualiza los atributos accesibles aria-pressed y aria-label.
 */
export const initCatalog = () => {
  const favoriteButtons = document.querySelectorAll(".card__favorite");

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Previene cualquier comportamiento no deseado por propagación
      event.preventDefault();

      // Lee el estado actual desde el atributo accesible
      const isCurrentlyPressed = button.getAttribute("aria-pressed") === "true";
      const nextPressedState = !isCurrentlyPressed;

      // Actualiza atributo aria-pressed
      button.setAttribute("aria-pressed", String(nextPressedState));

      // Alterna clase visual para estilos y animaciones CSS
      button.classList.toggle("is-favorite", nextPressedState);

      // Actualiza la etiqueta accesible para lectores de pantalla
      const cardTitle = button.closest(".card")?.querySelector(".card__wine-variety")?.textContent?.trim() || "vino";
      button.setAttribute(
        "aria-label",
        nextPressedState
          ? `Quitar ${cardTitle} de mis vinos favoritos`
          : `Añadir ${cardTitle} a mis vinos favoritos`
      );
    });
  });
};
