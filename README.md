---
title: "Documentación del Proyecto: SportsAndDietApp"
author: "Salwa Madani, Kemuel Rodriguez, Margarita Cruz, Oscar Yavar"
date: "`r Sys.Date()`"
output:
  html_document:
    toc: true
    toc_depth: 2
    theme: united
---

# 1. Información del Proyecto
**Nombre del Proyecto:** SportsAndDietApp 43.5 
**Componentes del Grupo:**
* Salwa Madani Lazaar
* Kemuel Rodriguez García
* Margarita Cruz Perez
* Oscar Yavar

---

# 2. Diseño y Planificación (Mockups)
Los diseños previos, prototipos de alta fidelidad y el flujo de navegación (Storyboard) están centralizados en el siguiente documento:

* **Nombre del archivo:** `Mockups.pdf`
* **Ubicación:** `/Mockups/Mockups.pdf`

---

# 3. Estructura de la Aplicación Web
**Página de Inicio (Entry Point):** `Home/index.html`  
**Ubicación del Contenido JSON:** Local (`/Dietas/dieta.json`, `/About_Us/about-us.json`,`/Dashboard/data.json`, `/Deporte/deporte.json`, `/Explorer/explorer.json`, `/Home/data.json`, `/Log_In/log-in-data.json`, `/Sign_Up/sign-up-data.json`, `/footerheader/data.json`)

### Mapeo de Páginas y Funcionalidades

| Archivo HTML | Ubicación | Aspectos Responsive (RWD) | Carga Template / JSON |
| :--- | :--- | :--- | :---: |
| `home-index.html` | `/Home` | Adaptación de Hero y Flex-wrap. | **SÍ** |
| `log-in-index.html` | `/Log_In` | Formulario escalable (100% width en móvil). | **SÍ** |
| `sign-up-index.html` | `/Sign_Up` | Reestructuración de inputs táctiles. | **SÍ** |
| `about-us-index.html` | `/About_Us` | Reorganización de tarjetas de equipo. | **SÍ** |
| `explorer.html` | `/` (Raíz) | Buscador dinámico responsive. | No |
| `Dashboard-Deporte.html` | `/Dashboards` | Panel de control con métricas adaptables. | **SÍ** |
| `Dashboard-Dieta.html` | `/Dashboards` | Panel de control con métricas adaptables. | **SÍ** |
| `Datos-Biometricos-1.html` a `5.html` | `/Datos_Biometricos` | Formulario por pasos (Wizard) responsive. | No |
| `Dietas_index.html` | `/Dietas` | Grid: 3 col (Desktop) $\rightarrow$ 2 col (Tablet). | **SÍ** |
| `Plan_index.html` | `/Plan` | Grid: 2 col (Tablet) $\rightarrow$ 1 col (Móvil). | **SÍ** |
| `Guia_index.html` | `/Guia` | Flex-direction: column en pantallas < 768px. | **SÍ** |
| `Deporte_index.html` | `/Deporte` | Grid: 3 col (Desktop) $\rightarrow$ 2 col (Tablet). | **SÍ** |

---

# 4. Validaciones de Formularios
Se ha implementado **validación nativa HTML5** para asegurar la calidad de los datos de entrada sin dependencia de librerías externas:

### En Registro (Sign Up):
* **Nombre de Usuario:** Atributo `required`.
* **Correo Electrónico:** Atributo `type="email"` (valida formato "@" y dominio) y `required`.
* **Contraseña:** Atributo `required` y `type="password"` para enmascaramiento.

### En Acceso (Log In):
* **Correo/Usuario:** Atributo `required`.
* **Contraseña:** Atributo `required` y `type="password"`.
* **Feedback:** Bloqueo nativo de envío si existen campos vacíos.

---

# 5. Credenciales de Prueba y Acceso
Para evaluar el flujo de autenticación, el sistema permite el acceso mediante usuarios predefinidos en el archivo `log-in-data.json` o mediante usuarios creados dinámicamente.

### Usuarios registrados (Base de Datos JSON)
| Usuario | Contraseña |
| :--- | :--- |
| `admin` | `Admin1234` |
| `prueba` | `Prueba123` |

### IMPORTANTE: Requisitos de Validación
El sistema cuenta con una **validación visual en tiempo real**. El botón de acceso ("Siguiente") solo procesará el formulario si los campos cumplen los siguientes criterios técnicos definidos en `log-in.js`:

* **Nombre de usuario:** Mínimo 3 caracteres.
* **Contraseña:** Mínimo 8 caracteres, incluyendo al menos **una letra mayúscula** y **un número**.
  * *Nota:* Si el campo se muestra con un borde rojo, el sistema bloqueará el envío hasta que el formato sea correcto.

### Registro Dinámico
Cualquier usuario creado en la página de **Sign Up** se almacenará automáticamente en el `localStorage` del navegador bajo la clave `db_usuarios_sports`. Estos nuevos usuarios podrán iniciar sesión inmediatamente en la pantalla de **Log In** sin necesidad de reiniciar la aplicación.

---

# 6. Detalles Técnicos de Implementación

### Implementación Responsive
El control del diseño se gestiona mediante **Media Queries** en el archivo `style.css`:
* **Breakpoint 1024px:** Optimización del Grid para navegación táctil en Tablet.
* **Breakpoint 768px:** Reestructuración total a una columna para dispositivos móviles, maximizando el tamaño de los botones para facilitar el "tap".

### Carga Dinámica de Datos
El dinamismo de la web se basa en tres pilares:
1. **Etiqueta `<template>`:** Define los moldes de las tarjetas de dietas y ejercicios en el DOM.
2. **Fetch API:** Realiza la petición asíncrona al archivo local `dieta.json`.
3. **Manipulación del DOM:** Clonación de nodos (`cloneNode`) e inyección dinámica mediante `appendChild` basándose en la lógica de JavaScript.

### Modularización (Templates de Componentes)
Se utiliza el script `xlu-include-file.js` para cargar de forma asíncrona los componentes globales:
* **`header.html`**: Menú de navegación común.
* **`footer.html`**: Pie de página informativo.
