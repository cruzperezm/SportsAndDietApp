---
title: "Documentación del Proyecto: SportsAndDietApp"
author: "43.5 - Sprint 1"
date: "`r Sys.Date()`"
output: github_document
---

# 1. Nombre del Proyecto y Componentes
**Nombre:** SportsAndDietApp  
**Componentes del Equipo:**
* Salwa Madani Lazaar
* Kemuel Rodriguez García
* Margarita Cruz Perez
* Oscar Yavar

---

# 2. Descripción del Proyecto
SportsAndDietApp es una plataforma web modular diseñada para la gestión integral del bienestar físico. La aplicación permite a los usuarios explorar planes nutricionales y rutinas de entrenamiento mediante una interfaz intuitiva y consistente. 

---

# 3. Listado de Requisitos Funcionales
Siguiendo los estándares de ingeniería de software, se han identificado los siguientes servicios:

* **Navegación Multinivel:** El sistema debe permitir al usuario profundizar desde categorías generales hasta guías detalladas mediante una jerarquía de 3 clics.
* **Inyección Dinámica:** El sistema debe cargar componentes globales (Header/Footer) automáticamente en cada vista.
* **Filtrado de Contenido:** El usuario puede seleccionar entre objetivos desde el menú principal.
* **Interactividad de Planes:** El sistema debe reaccionar al clic en las tarjetas de planes mostrando la guía técnica específica.

---

# 4. Mockups y Storyboard
Los diseños previos, esquemas visuales y el flujo de navegación se encuentran documentados en el siguiente archivo:

* **Nombre:** `Mockuos.pdf`
* **Ubicación:** `[carpeta_documentacion]/Mockups.pdf` 

---

# 5. Listado de Páginas HTML y Mapeo
La página de inicio de la aplicación es: **`Home/index.html`**

| Archivo HTML | Mockup que Implementa | Ubicación |
| :--- | :--- | :--- |
| `Dietas_index.html` | Grid Principal de Categorías (Dieta) | `/Dietas` |
| `Plan_index.html` | Planificación 3x3 / Carrusel (Dieta) | `/Dietas` |
| `Guia_index.html` | Guía de Texto Detallada (Dieta) | `/Dietas` |
| `Deporte_index.html` | Grid Principal de Categorías (Deporte) | `/Deporte` |
| `Plan_index.html` | Planificación 3x3 / Carrusel (Deporte) | `/Deporte` |
| `Guia_index.html` | Guía de Texto Detallada (Deporte) | `/Deporte` |

---

# 6. Listado de Archivos Templates
Se utiliza un sistema de inyección de fragmentos para optimizar la mantenibilidad.

| Archivo Template (Origen) | Archivo donde se carga (Destino) | Función |
| :--- | :--- | :--- |
| `header.html` | Todos los archivos `_index.html` | Navegación global interactiva. |
| `footer.html` | Todos los archivos `_index.html` | Información de contacto y cierre. |
| `Dietas_grid-view.html` | `Dietas_index.html` | Vista de categorías de dieta. |
| `PlanDietas_grid-view.html` | `Plan_index.html` | Vista de carruseles de dieta. |
| `PlanGuiaDieta_grid-view.html`| `Guia_index.html` | Vista de información final. |

---

# 7. Otros Aspectos para la Evaluación

### A. Implementación de JavaScript
* **Navegación Asíncrona:** Uso del script `xlu-include-file.js` para la modularización del HTML.
* **Lógica de Usuario:** Implementación de eventos `onclick="location.href=..."` para gestionar el flujo entre los contenedores y sus vistas.
* **Control de Movimiento:** Scripts locales en vistas de carrusel para gestionar el desplazamiento horizontal del grid 3x3.

### B. Organización de Hojas de Estilo (CSS)
* **Consistencia Visual:** Uso de un archivo `style.css` compartido que define la identidad visual (aspas de placeholders, tipografía Inter, paleta de colores).
* **Diseño Atómico:** Separación de estilos por componentes (`header.css`, `footer.css`, `style.css`) para facilitar la interoperabilidad.

### C. Calidad y Mantenibilidad (RNF)
* **Portabilidad:** Implementación estricta de **rutas relativas** (`../`), permitiendo que el proyecto sea totalmente funcional en cualquier entorno local o servidor sin reconfiguración.
* **Aprendizaje Nulo:** La simetría entre los módulos de Dieta y Deporte garantiza que la curva de aprendizaje para el usuario sea inexistente.
