---
title: "Documentación del Proyecto: SportsAndDietApp"
author: "43.5 - Sprint 1"
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
* **Ubicación:** `[Mockups]/Mockups.pdf` 

---

# 5. Listado de Páginas HTML y Mapeo
La página de inicio de la aplicación es: **`Home/index.html`**

| Archivo HTML | Mockup que Implementa | Ubicación |
| :--- | :--- | :--- |
| `index.html` | Landing Page / Home | `/Home` |
| `log-in-index.html` | Formulario de Acceso | `/Log_In` |
| `sign-up-index.html` | Formulario de Registro | `/Sign_Up` |
| `About-Us-index.html` | Información del Equipo | `/About_Us` |
| `explorer.html` | Buscador de Contenido | `/Explorer` |
| `Dashboard-Deporte_index.html` | Panel de Control Deporte | `/Dashboards` |
| `Dashboard-Dieta_index.html` | Panel de Control Dieta | `/Dashboards` |
| `Datos-Biometricos-1.html` a `5.html` | Cuestionario de Salud (Pasos) | `/Datos_Biometritos` |
| `Dietas_index.html` | Grid de Categorías Dieta | `/Dietas` |
| `Deporte_index.html` | Grid de Categorías Deporte | `/Deporte` |

---

# 6. Listado de Archivos Templates
El proyecto se basa en la carga de "vistas" dentro de "contenedores index".

| Archivo Template (Origen) | Archivo Destino (Carga) | Función |
| :--- | :--- | :--- |
| `header.html` | Todos los `*_index.html` | Menú de navegación global interactivo. |
| `footer.html` | Todos los `*_index.html` | Pie de página con información legal. |
| `Dietas_grid-view.html` | `Dietas_index.html` | Vista principal de nutrición. |
| `Deporte_grid-view.html` | `Deporte_index.html` | Vista principal de entrenamiento. |
| `PlanDeporte_grid-view.html` | `Plan_index.html` | Detalle 3x3 de rutinas. |
| `GuiaDeporte_grid-view.html` | `Guia_index.html` | Texto técnico detallado. |

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
