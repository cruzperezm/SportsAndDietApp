---
title: "Documentación del Proyecto: SportsAndDietApp - Sprint 3"
author: "Salwa Madani Lazaar, Kemuel Rodriguez García, Margarita Cruz Pérez, Oscar Yavar Rodríguez"
group: "43.5"
trello: https://trello.com/b/Y1fip0jQ/dieta-y-deporte
---

# 1. Información del Proyecto
**Nombre del Proyecto:** SportsAndDietApp
**Componentes del Grupo:**
* Salwa Madani Lazaar
* Kemuel Rodriguez García
* Margarita Cruz Perez
* Oscar Yavar Rodríguez

---

# Instrucciones de Ejecución

Este proyecto está desarrollado con Angular y requiere Node.js para funcionar localmente. Para evaluar la aplicación, sigue estos pasos:

### Requisitos Previos
* Tener instalado **Node.js** (versión 18 o superior recomendada).
* Se recomienda tener instalado **Angular CLI** a nivel global (`npm install -g @angular/cli`).

### Pasos para levantar el proyecto

1. **Descomprimir:** Abre una terminal en la carpeta raíz del proyecto (donde se encuentra el archivo `package.json`).
2. **Instalar las dependencias:** Ejecuta el siguiente comando para descargar todos los paquetes necesarios de Angular y Firebase:
```
npm install
```
   
Ejecutar el servidor de desarrollo: Una vez instaladas las dependencias, levanta el proyecto con:
```
ng serve
```
Visualizar la web: Abre tu navegador de preferencia y accede a la siguiente dirección:
```
http://localhost:4200
```

Si por algun casual no observa bien las paginas, tiene que ver con las normas del firebase:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      // Permitimos lectura y escritura abierta para la corrección del proyecto
      allow read, write: if true;
    }
  }
}
```

---

# 2. Diseño y Planificación (Mockups)
Los diseños previos, prototipos de alta fidelidad y el flujo de navegación (Storyboard) están centralizados en el siguiente documento:

* **Nombre del archivo:** `Mockups.pdf`
* **Ubicación:** `/Mockups/Mockups.pdf`

---

# 3. Estructura de la Aplicación Web
El proyecto ha evolucionado de un modelo estático a una **Single Page Application (SPA)** robusta utilizando el framework **Angular** con arquitectura de componentes Standalone.

**Página de Inicio (Entry Point):** Archivo `index.html` gestionado por el enrutador central (`app.routes.ts`).
**Ubicación del Contenido:** Los archivos locales `.json` han sido migrados a una base de datos NoSQL en la nube mediante **Firebase (Firestore)**.

### Mapeo de Rutas y Funcionalidades (Angular Router)

| Ruta Angular | Componente | Aspectos Responsive (RWD) | Origen de Datos |
| :--- | :--- | :--- | :---: |
| `/home` | `HomeComponent` | Adaptación de Hero y Flex-wrap. | Local / UI |
| `/log-in` | `LogInComponent` | Formulario escalable (100% width en móvil). | Firebase Auth |
| `/sign-up` | `SignUpComponent` | Reestructuración de inputs táctiles. | Firebase Auth |
| `/about-us` | `AboutUsComponent` | Reorganización de tarjetas de equipo. | Local / UI |
| `/dietas` | `DietasInicioComponent` | Grid dinámico y buscador integrado. | **Firestore** |
| `/dietas/plan/:id` | `DietaPlanComponent` | Grid: 2 col (Tablet) -> 1 col (Móvil). | **Firestore** |
| `/dietas/receta/:id` | `DietaDetalleComponent` | Flex-direction: column en pantallas < 768px. | **Firestore** |
| `/deporte` | `DeporteComponent` | Grid: 3 col (Desktop) -> 2 col (Tablet). | **Firestore** |
| `/dashboards` | `DashboardComponent` | Panel de control con métricas adaptables. | - |

---

# 4. Validaciones de Formularios
La aplicación combina las directivas reactivas de **Angular** con la **validación nativa HTML5** para asegurar la calidad de los datos sin afectar el rendimiento:

### Registro y Acceso (Sign Up / Log In):
* **Campos Requeridos:** Uso de `required` y control de estado de Angular.
* **Correo Electrónico:** Validación de formato y dominio mediante `type="email"`.
* **Seguridad de Contraseña:** Mínimo de 8 caracteres, exigiendo al menos una letra mayúscula y un número.
* **Feedback Visual:** El botón de envío ("Siguiente" o "Acceder") se bloquea dinámicamente si los criterios técnicos no se cumplen. Los campos erróneos muestran feedback en tiempo real.

---

# 5. Autenticación y Credenciales
En este Sprint, se ha abandonado el almacenamiento inseguro en `localStorage` y la validación mediante JSON local. El sistema de acceso y registro está ahora preparado para integrarse de forma segura utilizando los proveedores de **Firebase Authentication**.

### Registro Dinámico
Cualquier usuario creado en la página de **Sign Up** puede ser procesado por el backend en la nube. Los usuarios pueden iniciar sesión en la pantalla de **Log In** sin necesidad de reiniciar la aplicación, manteniendo un flujo de estado seguro y moderno.

---

# 6. Detalles Técnicos de Implementación

### 1. Framework y Arquitectura Frontend
* **Angular Standalone:** El proyecto está construido bajo el estándar moderno de Angular, omitiendo el uso de `NgModules`. Cada sección de la página (Header, Footer, Dietas, Deportes) funciona como un componente aislado, inyectable y modular.
* **Server-Side Rendering (SSR):** Se ha habilitado SSR mediante el motor de Vite integrado en Angular (`@angular/ssr`). Esto permite que las vistas se pre-rendericen en el servidor, mejorando los tiempos de carga (FCP) y facilitando el SEO.

### 2. Base de Datos Reactiva (Firebase)
* El dinamismo de la web está respaldado por **Firestore Database**. Se han creado servicios inyectables (ej. `DietaService`, `DeporteService`) que conectan con la base de datos de Google.
* **RxJS y Observables:** Las peticiones a Firebase no bloquean la interfaz. Se utilizan flujos de datos asíncronos (`Observables`, `map`) para leer las colecciones (`dietas`, `deportes`).
* **Change Detection:** Se hace uso avanzado del ciclo de vida de Angular (`ChangeDetectorRef`) para asegurar que la interfaz reaccione al instante cuando los datos se descargan desde la nube.

### 3. Implementación Responsive
El control del diseño se sigue gestionando de forma fluida y "Mobile First" mediante **Media Queries** en CSS puro:
* **Breakpoint 1024px:** Optimización del Grid para navegación táctil en Tablet.
* **Breakpoint 768px:** Reestructuración a una columna para dispositivos móviles, maximizando elementos interactivos y zonas de "tap".
