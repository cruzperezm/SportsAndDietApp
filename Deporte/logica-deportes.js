xLuIncludeFile();

// Lógica para Deporte_index.html
function inicializarDeportes() {
    const contenedor = document.getElementById('contenedor-deportes');
    const temp = document.getElementById('template-tarjeta');

    if (!contenedor || !temp) {
        setTimeout(inicializarDeportes, 100);
        return;
    }

    fetch('../data.json')
        .then(res => res.json())
        .then(data => {
            if (!data.deportes) {
                console.error("No se encontró la clave 'deportes' en el JSON");
                return;
            }

            data.deportes.forEach(deporte => {
                const clon = temp.content.cloneNode(true);
                clon.querySelector('.js-titulo').innerText = deporte.titulo;
                clon.querySelector('.js-imagen').src = deporte.imagen;

                clon.querySelector('.js-enlace').onclick = () => {
                    localStorage.setItem('deporteSeleccionado', deporte.id);
                    window.location.href = 'PlanDeporte_index.html';
                };
                contenedor.appendChild(clon);
            });
        })
        .catch(error => console.error("Error cargando deportes:", error));
}

// --- Lógica para Guia_index.html (Deporte) ---
function cargarPaginaEjercicio() {
    const tituloDOM = document.getElementById('ejercicio-titulo');

    if (!tituloDOM) {
        setTimeout(cargarPaginaEjercicio, 100);
        return;
    }

    const ejercicioId = localStorage.getItem('ejercicioSeleccionado');
    if (!ejercicioId) {
        tituloDOM.innerText = "Selecciona un ejercicio";
        return;
    }

    fetch('../data.json')
        .then(res => res.json())
        .then(data => {
            let ejercicio = null;

            data.deportes.forEach(deporte => {
                deporte.plan.forEach(fase => {
                    fase.opciones.forEach(opcion => {
                        if (opcion.id === ejercicioId) ejercicio = opcion;
                    });
                });
            });

            if (!ejercicio) {
                tituloDOM.innerText = "Ejercicio no encontrado";
                return;
            }

            // PINTAR LOS DATOS
            tituloDOM.innerText = ejercicio.nombre;
            const hero = document.getElementById('ejercicio-hero');
            if (hero && ejercicio.imagen) {
                hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${ejercicio.imagen}')`;
                hero.style.backgroundSize = 'cover';
            }

            // Material
            const listaMaterial = document.getElementById('ejercicio-material');
            if (listaMaterial) {
                listaMaterial.innerHTML = '';
                (ejercicio.material || []).forEach(mat => {
                    const li = document.createElement('li');
                    li.innerText = mat;
                    listaMaterial.appendChild(li);
                });
            }

            // Detalles Técnicos
            const listaDetalles = document.getElementById('ejercicio-detalles');
            if (listaDetalles) {
                listaDetalles.innerHTML = '';
                for (const [key, value] of Object.entries(ejercicio.detalles || {})) {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${key.replace('_', ' ')}:</strong> ${value}`;
                    listaDetalles.appendChild(li);
                }
            }

            // Vídeo
            const videoIframe = document.getElementById('ejercicio-video');
            if (videoIframe && ejercicio.video) {
                videoIframe.src = ejercicio.video;
            } else if (videoIframe) {
                videoIframe.parentElement.style.display = 'none';
            }

            // PINTAR ICONOS DEPORTIVOS
            const contenedorIconos = document.getElementById('contenedor-iconos-deporte');
            if (contenedorIconos) {
                contenedorIconos.innerHTML = '';
                const mapaIconos = {
                    "fuerza": ["fitness_center", "icon-fuerza"],
                    "cardio": ["directions_run", "icon-cardio"],
                    "tiempo": ["timer", "icon-tiempo"],
                    "alta_intensidad": ["bolt", "icon-alta"]
                };

                (ejercicio.caracteristicas || []).forEach(caract => {
                    const clave = caract.toLowerCase().replace(' ', '_');
                    const info = mapaIconos[clave];
                    if (info) {
                        const span = document.createElement('span');
                        span.className = `material-symbols-outlined icono-deporte ${info[1]}`;
                        span.innerText = info[0];
                        contenedorIconos.appendChild(span);
                    }
                });
            }

            // LÓGICA BOTÓN AÑADIR RUTINA
            const btnAnadir = document.getElementById('btn-anadir-rutina');
            if (btnAnadir) {
                let rutina = JSON.parse(localStorage.getItem('miRutinaDeportiva')) || [];
                if (rutina.includes(ejercicioId)) {
                    btnAnadir.innerText = "✓ En tu rutina";
                    btnAnadir.classList.add('guardado');
                }

                btnAnadir.onclick = () => {
                    let actual = JSON.parse(localStorage.getItem('miRutinaDeportiva')) || [];
                    if (!actual.includes(ejercicioId)) {
                        actual.push(ejercicioId);
                        localStorage.setItem('miRutinaDeportiva', JSON.stringify(actual));
                        btnAnadir.innerText = "✓ En tu rutina";
                        btnAnadir.classList.add('guardado');
                    } else {
                        actual = actual.filter(id => id !== ejercicioId);
                        localStorage.setItem('miRutinaDeportiva', JSON.stringify(actual));
                        btnAnadir.innerText = "Añadir a mi rutina 📅";
                        btnAnadir.classList.remove('guardado');
                    }
                };
            }
        })
        .catch(err => console.error("Error cargando deporte:", err));
}

// --- Lógica para PlanDeporte_index.html ---
function cargarPlanDeporte() {
    const contenedorPrincipal = document.getElementById('secciones-dinamicas');
    const tempSeccion = document.getElementById('temp-seccion');
    const tempPlato = document.getElementById('temp-plato');

    if (!contenedorPrincipal || !tempSeccion || !tempPlato) {
        setTimeout(cargarPlanDeporte, 100);
        return;
    }

    const deporteId = localStorage.getItem('deporteSeleccionado');

    fetch('../data.json')
        .then(res => res.json())
        .then(data => {
            const deporte = data.deportes.find(d => d.id === deporteId);

            if (!deporte) {
                document.getElementById('titulo-deporte-dinamico').innerText = "Deporte no encontrado";
                return;
            }

            document.getElementById('titulo-deporte-dinamico').innerText = deporte.titulo;

            deporte.plan.forEach(fase => {
                const clonSeccion = tempSeccion.content.cloneNode(true);
                clonSeccion.querySelector('.js-momento').innerText = fase.momento;
                const grid = clonSeccion.querySelector('.js-contenedor-platos');

                fase.opciones.forEach(ejercicio => {
                    const clonPlato = tempPlato.content.cloneNode(true);
                    clonPlato.querySelector('.js-nombre').innerText = ejercicio.nombre;
                    const btn = clonPlato.querySelector('.js-btn-receta');

                    if (ejercicio.imagen) {
                        btn.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('${ejercicio.imagen}')`;
                        btn.style.backgroundSize = 'cover';
                    }

                    btn.onclick = () => {
                        localStorage.setItem('ejercicioSeleccionado', ejercicio.id);
                        window.location.href = 'GuiaDeporte_index.html'; // Asegúrate de que este archivo se llama así
                    };
                    grid.appendChild(clonPlato);
                });

                // Añadimos el carrusel
                configurarBotonesCarrusel(clonSeccion, grid);
                contenedorPrincipal.appendChild(clonSeccion);
            });
        })
        .catch(err => console.error("Error crítico en el fetch:", err));
}

// Función del Carrusel
function configurarBotonesCarrusel(seccion, grid) {
    const btnNext = seccion.querySelector('.js-next');
    const btnPrev = seccion.querySelector('.js-prev');
    let enMovimiento = false;

    if (!btnNext || !btnPrev) return;

    btnNext.onclick = () => {
        if (enMovimiento) return;
        if (grid.children.length <= 3) return;

        enMovimiento = true;
        const anchoElemento = grid.firstElementChild.offsetWidth;
        const gap = parseFloat(window.getComputedStyle(grid).gap) || 0;
        const distancia = anchoElemento + gap;

        grid.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        grid.style.transform = `translateX(-${distancia}px)`;

        setTimeout(() => {
            grid.style.transition = 'none';
            grid.appendChild(grid.firstElementChild);
            grid.style.transform = 'translateX(0)';
            enMovimiento = false;
        }, 500);
    };

    btnPrev.onclick = () => {
        if (enMovimiento) return;
        if (grid.children.length <= 3) return;

        enMovimiento = true;
        const anchoElemento = grid.firstElementChild.offsetWidth;
        const gap = parseFloat(window.getComputedStyle(grid).gap) || 0;
        const distancia = anchoElemento + gap;

        grid.style.transition = 'none';
        grid.insertBefore(grid.lastElementChild, grid.firstElementChild);
        grid.style.transform = `translateX(-${distancia}px)`;
        grid.offsetHeight;

        grid.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        grid.style.transform = 'translateX(0)';

        setTimeout(() => {
            enMovimiento = false;
        }, 500);
    };
}

window.addEventListener('load', () => {
    console.log("Archivos cargados. Iniciando lógica según la página de Deporte...");

    if (document.querySelector('[xlu-include-file="Deporte_grid-view.html"]')) {
        inicializarDeportes();
    } else if (document.querySelector('[xlu-include-file="PlanGuiaDeporte_grid-view.html"]')) {
        cargarPaginaEjercicio();
    } else if (document.querySelector('[xlu-include-file="PlanDeporte_grid-view.html"]')) {
        cargarPlanDeporte();
    }
});