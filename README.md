---
title: "Sport and Diet"
authors: "Salwa Madani Lazaar, Kemuel Rodriguez García, Margarita Cruz Perez, Óscar Yavar"
date: "01/03/2026"
---

# Introducción

Este documento detalla el trabajo realizado en los módulos de **Dieta** y **Deporte**. Se ha priorizado una arquitectura modular y 
una experiencia de usuario interactiva basada en estándares de desarrollo web.
---

# Características Técnicas

### 1. Arquitectura Modular
* Se usa de la API `fetch` para inyectar fragmentos HTML sin recargar el navegador.
* Organización del código en plantillas (`Dietas_grid-view.html`, etc.) para facilitar el mantenimiento.

### 2. Carrusel Infinito Bidireccional
El sistema de navegación en el **Plan Semanal** incluye:
* **Lógica Circular:** Movimiento continuo que salta del final al inicio (y viceversa) sin interrumpir la animación.
* **Reordenamiento Dinámico:** Manipulación del DOM en tiempo real para mover bloques de elementos.
* **Medidas Técnicas:** Botones de navegación de **50x50px** con iconos de **27px**, agrupados en un contenedor de **137x50px** alineado a la derecha.

### 3. Interacciones y Estética
* **Micro-interacciones:** Efecto de zoom suave (`scale 1.03`) al pasar el cursor sobre elementos interactivos.
* **Diseño Figma-Fidelity:** Uso de `clamp()` para tipografías adaptables y placeholders técnicos con aspas mediante pseudo-elementos CSS.



---

# Estructura del Proyecto

El proyecto se organiza de la siguiente manera para garantizar que los cambios no afecten a otros módulos:

---

# Tecnologías Utilizadas

* **HTML5:** Marcado semántico.
* **CSS3:** Flexbox, CSS Grid y Custom Properties.
* **JavaScript (Vanilla):** Lógica asíncrona y manipulación de eventos.

---

# Guía de Ejecución

1. **Servidor Local:** Es obligatorio usar un servidor local (WebStorm Preview) para habilitar las peticiones `fetch`.
2. **Navegación:** Haz clic en los cuadros grises de la vista principal para desplazarte entre el Plan y la Guía.
3. **Bucle:** Prueba las flechas del carrusel para verificar el desplazamiento infinito en ambas direcciones.

---

# Conclusión

El desarrollo cumple con los requisitos de diseño de Figma, ofreciendo una navegación robusta y una estructura de código escalable que permite añadir nuevas opciones (hasta 30 o más) sin romper la interfaz visual.
