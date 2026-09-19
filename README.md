# 🍷 Viña Carmenère — Reserva de Vinos (Desde 1892 • Chile)

Bienvenido a la documentación integral del proyecto **Viña Carmenère**. Este repositorio combina el **diseño de identidad de marca patrimonial** con una **experiencia web interactiva e inmersiva**, desarrollada con estándares modernos de frontend y animaciones cinematográficas.

---

## 📌 Tabla de Contenidos
1. [Visión General del Proyecto](#-visión-general-del-proyecto)
2. [Estructura del Repositorio](#-estructura-del-repositorio)
3. [Sistema de Identidad y Diseño](#-sistema-de-identidad-y-diseño)
4. [Arquitectura del Sitio Web](#-arquitectura-del-sitio-web)
5. [Animaciones y Tecnologías Utilizadas](#-animaciones-y-tecnologías-utilizadas)
6. [Cómo Visualizar y Ejecutar el Proyecto](#-cómo-visualizar-y-ejecutar-el-proyecto)
7. [Guía de Colaboración y Próximos Pasos](#-guía-de-colaboración-y-próximos-pasos)

---

## 🍇 Visión General del Proyecto

**Viña Carmenère** rinde homenaje a una de las cepas más emblemáticas y místicas de la vitivinicultura chilena. El proyecto busca evocar:
- **Herencia y tradición:** Cuatro generaciones de trabajo y paciencia en la guarda del vino desde 1892.
- **Terroir y naturaleza:** La comunión entre suelos minerales, brisas de los valles chilenos y el cuidado artesanal.
- **Experiencia sensorial digital:** Una interfaz moderna, sobria y prémium donde la navegación se siente fluida y elegante mediante microinteracciones y efectos basados en el desplazamiento del usuario (*scroll-driven animations*).

---

## 📁 Estructura del Repositorio

El proyecto se divide en dos grandes áreas de trabajo:

```text
09 - Reserva de Vinos - Viña Carmenère/
│
├── 01 - Identidad/                          # Recursos gráficos y sistema de marca
│   ├── 01 - Propuestas de logotipos.png     # Exploración de isotipos y monogramas
│   ├── 02 - Logos seleccionados.png         # Versiones definitivas de la marca
│   ├── 03 - Sistema de identidad.png        # Guía visual, retículas y contrastes
│   ├── 04 - Etqueta - [3, 4, 5].png         # Diseños de etiquetas para botellas
│   ├── 05 - Bolsas.png / Papel de seda.png  # Packaging y empaques prémium
│   ├── 06 - Sello sticker de cierre.png     # Sellos de lacre y stickers
│   ├── 07 - Tarjeta de agradecimiento.png   # Papelería corporativa
│   ├── 08 - Menú.png                        # Carta para maridaje y catas
│   ├── 09 - Servilletas.png                 # Merchandising y degustación
│   ├── 10 - Material de degustación.png     # Fichas técnicas y notas de cata
│   ├── 11 - Iconos.png                      # Iconografía de apoyo
│   ├── 12 - Bottle 1.png / Cards.png        # Mockups de presentación
│   └── 13. Poster - [1..6].png              # Serie de cartelería y pósters
│
├── 02 - Sitio Web/                          # Código fuente de la web interactiva
│   ├── Index.html                           # Estructura semántica HTML5
│   ├── Styles.css                           # Enlace puente a estilos
│   ├── Script.js                            # Script de apoyo general
│   │
│   ├── assets/                              # Imágenes y recursos multimedia web
│   │   ├── 01 - Logo.png                    # Isotipo de la viña con transparencia
│   │   ├── 02 - Hero Image.jpg              # Fotografía principal de alta resolución
│   │   └── Img-Representativa.jpg           # Imagen complementaria
│   │
│   ├── css/
│   │   └── main.css                         # Hoja de estilos principal comentada
│   │
│   └── js/
│       ├── main.js                          # Punto de entrada (ES Modules)
│       └── modules/
│           ├── headerAnimations.js          # Intro del logo y menú hamburguesa
│           └── heroAnimations.js            # Parallax y efecto máscara de textos
│
└── README.md                                # Este documento
```

---

## 🎨 Sistema de Identidad y Diseño

El diseño visual está fundamentado en variables CSS (`:root`) dentro de [main.css](file:///c:/Users/josej/Documents/03%20-%20Desarrollador/02%20-%20Proyectos/09%20-%20Reserva%20de%20Vinos%20-%20Vi%C3%B1a%20Carmen%C3%A8re/02%20-%20Sitio%20Web/css/main.css):

### 1. Paleta de Colores
| Muestra | Nombre | Variable CSS | Código HEX | Rol y Significado |
| :---: | :--- | :--- | :--- | :--- |
| 🍷 | **Burdeos** | `--color-bordeaux` | `#5B1F2E` | Tono primario. Color del vino Carmenère, barricas y nobleza. |
| 🏅 | **Oro Envejecido** | `--color-aged-gold` | `#C8A96A` | Acento prémium, sellos de calidad y detalles tipográficos. |
| 📜 | **Tierra Clara** | `--color-light-earth` | `#DCC7A6` | Suelos minerales y matices cálidos de la arcilla. |
| 🌿 | **Verde Oliva** | `--color-olive-green` | `#6B705C` | Conexión con los viñedos, hojas de parra y el valle. |
| 🏺 | **Terracota** | `--color-terracotta` | `#B65A3C` | Tono otoñal, calor del sol y vasijas de guarda. |
| 🥛 | **Marfil** | `--color-ivory` | `#F7F2E9` | Fondo principal limpio y elegante que favorece la lectura. |

### 2. Tipografías Seleccionadas
- **Cinzel** (`--font-primary`): Inspiración romana clásica. Empleada en el logotipo, títulos principales (`h1`, `h2`) y botones destacados.
- **Playfair Display** (`--font-secondary`): Serif moderno con gran elegancia editorial, ideal para subtítulos y citas.
- **Lato** (`--font-body`): Sans-serif limpia y equilibrada para descripciones, párrafos de lectura y elementos de apoyo funcional.

---

## 💻 Arquitectura del Sitio Web

### [Index.html](file:///c:/Users/josej/Documents/03%20-%20Desarrollador/02%20-%20Proyectos/09%20-%20Reserva%20de%20Vinos%20-%20Vi%C3%B1a%20Carmen%C3%A8re/02%20-%20Sitio%20Web/Index.html)
Estructura semántica optimizada:
- `<div class="intro-logo-layer">`: Capa flotante con el logotipo centrado que protagoniza la transición inicial.
- `<header class="site-header">`: Barra fija con efecto de desenfoque de fondo (*glassmorphism*), botón accesible para móviles y menú con enlaces ancla.
- `<main>`:
  - `<section class="intro-screen">`: Espacio de desplazamiento reservado para accionar la transformación del logo.
  - `<section class="hero" id="origen">`: Contenedor *sticky* de 280vh donde ocurre la animación de zoom y texto.
  - `<section class="content-section" id="...">`: Bloques temáticos para **Nuestra Historia**, **Colección & Catas**, **El Terroir & Finca** y **Sanctuarium & Reservas**.

---

## ⚡ Animaciones y Tecnologías Utilizadas

El sitio utiliza **GSAP (GreenSock Animation Platform) 3.12.5** y el plugin **ScrollTrigger**:

1. **Transformación Dinámica del Logotipo ([headerAnimations.js](file:///c:/Users/josej/Documents/03%20-%20Desarrollador/02%20-%20Proyectos/09%20-%20Reserva%20de%20Vinos%20-%20Vi%C3%B1a%20Carmen%C3%A8re/02%20-%20Sitio%20Web/js/modules/headerAnimations.js)):**
   - Al cargar el sitio, el logotipo aparece a gran escala en el centro.
   - A través de cálculos de rectángulos en pantalla (`getBoundingClientRect()`), GSAP traslada y escala de forma exacta el logo hacia la barra de navegación al hacer scroll.
2. **Efecto Cortinilla y Zoom Parallax ([heroAnimations.js](file:///c:/Users/josej/Documents/03%20-%20Desarrollador/02%20-%20Proyectos/09%20-%20Reserva%20de%20Vinos%20-%20Vi%C3%B1a%20Carmen%C3%A8re/02%20-%20Sitio%20Web/js/modules/heroAnimations.js)):**
   - El fondo fotográfico del viñedo realiza un suave alejamiento (*zoom-out*).
   - Los títulos y subtítulos se revelan mediante máscaras (`clip-path: inset(...)`) y desenfoques progresivos (`filter: blur(...)`).
   - El desplazamiento de la rueda del ratón actúa como control de reproducción en tiempo real (`scrub: true`).
3. **Respaldo de Accesibilidad (Graceful Degradation):**
   - Si por alguna razón la red no carga los scripts de GSAP, el código cuenta con fallbacks que muestran el contenido de manera estática y funcional.

---

## 🚀 Cómo Visualizar y Ejecutar el Proyecto

Dado que el código JavaScript utiliza **Módulos ES6 nativos** (`import` / `export`), los navegadores requieren que el sitio sea servido mediante un servidor HTTP local (para evitar restricciones de seguridad CORS del protocolo `file:///`).

### Opción 1: Con la extensión Live Server (Recomendada en VS Code)
1. Abre la carpeta `02 - Sitio Web/` en VS Code.
2. Haz clic derecho sobre [Index.html](file:///c:/Users/josej/Documents/03%20-%20Desarrollador/02%20-%20Proyectos/09%20-%20Reserva%20de%20Vinos%20-%20Vi%C3%B1a%20Carmen%C3%A8re/02%20-%20Sitio%20Web/Index.html).
3. Selecciona **"Open with Live Server"**.

### Opción 2: Usando Python
Si tienes Python instalado, ejecuta en tu terminal:
```powershell
cd "c:\Users\josej\Documents\03 - Desarrollador\02 - Proyectos\09 - Reserva de Vinos - Viña Carmenère\02 - Sitio Web"
python -m http.server 8000
```
Luego abre en tu navegador: [http://localhost:8000](http://localhost:8000)

### Opción 3: Usando Node.js / npx
```powershell
cd "c:\Users\josej\Documents\03 - Desarrollador\02 - Proyectos\09 - Reserva de Vinos - Viña Carmenère\02 - Sitio Web"
npx serve
```

---

## 🤝 Guía de Colaboración y Próximos Pasos

A medida que vayas desarrollando nuevas partes del sitio, mantendremos este flujo de trabajo colaborativo:

- [x] **Comentarios didácticos:** Cada nueva sección de HTML, regla de CSS o función de JavaScript se documentará con etiquetas claras explicando qué hace y por qué.
- [ ] **Desarrollo de las secciones de contenido:**
  - Integrar las imágenes de los pósters y botellas de `01 - Identidad/` en la sección de **Colección**.
  - Crear una línea de tiempo interactiva en **Nuestra Historia**.
  - Desarrollar el formulario interactivo o modal de fechas para **Sanctuarium & Reservas**.
- [ ] **Optimización:** Compresión de imágenes de alta resolución a formatos web modernos (`.webp`) para carga ultrarrápida.

¡Sigamos avanzando juntos paso a paso en el desarrollo de Viña Carmenère! 🥂
