xLuIncludeFile();

function inicializarDeportes() {
    const contenedor = document.getElementById('contenedor-deportes');
    const temp = document.getElementById('template-tarjeta');

    if (!contenedor || !temp) {
        setTimeout(inicializarDeportes, 100);
        return;
    }

    fetch('../Dietas/DietaDeporte.json')
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

    fetch('../Dietas/DietaDeporte.json')
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

            tituloDOM.innerText = ejercicio.nombre;
            const hero = document.getElementById('ejercicio-hero');
            if (hero && ejercicio.imagen) {
                hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${ejercicio.imagen}')`;
                hero.style.backgroundSize = 'cover';
            }

            const listaMaterial = document.getElementById('ejercicio-material');
            if (listaMaterial) {
                listaMaterial.innerHTML = '';
                (ejercicio.material || []).forEach(mat => {
                    const li = document.createElement('li');
                    li.innerText = mat;
                    listaMaterial.appendChild(li);
                });
            }

            const listaDetalles = document.getElementById('ejercicio-detalles');
            if (listaDetalles) {
                listaDetalles.innerHTML = '';
                for (const [key, value] of Object.entries(ejercicio.detalles || {})) {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${key.replace('_', ' ')}:</strong> ${value}`;
                    listaDetalles.appendChild(li);
                }
            }

            const videoIframe = document.getElementById('ejercicio-video');
            if (videoIframe && ejercicio.video) {
                videoIframe.src = ejercicio.video;
            } else if (videoIframe) {
                videoIframe.parentElement.style.display = 'none';
            }

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

function cargarPlanDeporte() {
    const contenedorPrincipal = document.getElementById('secciones-dinamicas');
    const tempSeccion = document.getElementById('temp-seccion');
    const tempPlato = document.getElementById('temp-plato');

    if (!contenedorPrincipal || !tempSeccion || !tempPlato) {
        setTimeout(cargarPlanDeporte, 100);
        return;
    }

    const deporteId = localStorage.getItem('deporteSeleccionado');

    fetch('../Dietas/DietaDeporte.json')
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
                    const tarjeta = clonPlato.querySelector('.contenedor-item');

                    if (tarjeta) {
                        tarjeta.setAttribute('data-zonas', (ejercicio.zonas || []).join(',').toLowerCase());
                    }

                    clonPlato.querySelector('.js-nombre').innerText = ejercicio.nombre;
                    const btn = clonPlato.querySelector('.js-btn-receta');

                    if (ejercicio.imagen) {
                        btn.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('${ejercicio.imagen}')`;
                        btn.style.backgroundSize = 'cover';
                    }

                    btn.onclick = () => {
                        localStorage.setItem('ejercicioSeleccionado', ejercicio.id);
                        window.location.href = 'GuiaDeporte_index.html';
                    };
                    grid.appendChild(clonPlato);
                });

                configurarBotonesCarrusel(clonSeccion, grid);
                contenedorPrincipal.appendChild(clonSeccion);
            });
        })
        .catch(err => console.error("Error crítico en el fetch:", err));
}

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

let filtrosDeporteActivos = [];

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-filtro-deporte')) {
        const filtro = e.target.getAttribute('data-filtro');

        if (filtro === 'todos') {
            filtrosDeporteActivos = [];
            document.querySelectorAll('.btn-filtro-deporte').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        } else {
            document.querySelector('.btn-filtro-deporte[data-filtro="todos"]')?.classList.remove('active');

            if (filtrosDeporteActivos.includes(filtro)) {
                filtrosDeporteActivos = filtrosDeporteActivos.filter(f => f !== filtro);
                e.target.classList.remove('active');
            } else {
                filtrosDeporteActivos.push(filtro);
                e.target.classList.add('active');
            }

            if (filtrosDeporteActivos.length === 0) {
                document.querySelector('.btn-filtro-deporte[data-filtro="todos"]')?.classList.add('active');
            }
        }
        ejecutarFiltradoDeportes();
    }
});

function ejecutarFiltradoDeportes() {
    const tarjetas = document.querySelectorAll('.contenedor-item');

    tarjetas.forEach(tarjeta => {
        const zonasCard = tarjeta.getAttribute('data-zonas');
        if (!zonasCard) return;

        const zonasArray = zonasCard.split(',');
        let debeMostrarse = false;

        if (filtrosDeporteActivos.length === 0) {
            debeMostrarse = true;
        } else {
            debeMostrarse = filtrosDeporteActivos.some(filtro => zonasArray.includes(filtro));
        }

        if (debeMostrarse) {
            tarjeta.classList.remove('ejercicio-oculto');
        } else {
            tarjeta.classList.add('ejercicio-oculto');
        }
    });
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