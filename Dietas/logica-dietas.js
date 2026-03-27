xLuIncludeFile();

// --- Lógica para Dietas_index.html ---
function inicializar() {
    const contenedor = document.getElementById('contenedor-dietas');
    const temp = document.getElementById('template-tarjeta');

    if (!contenedor || !temp) {
        setTimeout(inicializar, 100);
        return;
    }

    fetch('../data.json')
        .then(res => {
            if (!res.ok) throw new Error("No se encontró el data.json");
            return res.json();
        })
        .then(data => {
            data.dietas.forEach(dieta => {
                const clon = temp.content.cloneNode(true);
                clon.querySelector('.js-titulo').innerText = dieta.titulo;
                clon.querySelector('.js-imagen').src = dieta.imagen;
                clon.querySelector('.js-imagen').alt = dieta.titulo;

                clon.querySelector('.js-enlace').onclick = () => {
                    localStorage.setItem('dietaSeleccionada', dieta.id);
                    window.location.href = 'Plan_index.html';
                };
                contenedor.appendChild(clon);
            });
        })
        .catch(error => console.error("Error cargando dietas:", error));
}

// --- Lógica para Guia_index.html ---
function cargarPaginaReceta() {
    const tituloDOM = document.getElementById('receta-titulo');

    if (!tituloDOM) {
        setTimeout(cargarPaginaReceta, 100);
        return;
    }

    const recetaId = localStorage.getItem('recetaSeleccionada');
    if (!recetaId) {
        tituloDOM.innerText = "Selecciona una receta en el Plan";
        return;
    }

    fetch('../data.json')
        .then(res => res.json())
        .then(data => {
            let receta = null;

            data.dietas.forEach(dieta => {
                dieta.plan.forEach(fase => {
                    fase.opciones.forEach(opcion => {
                        if (opcion.id === recetaId) {
                            receta = opcion;
                        }
                    });
                });
            });

            if (!receta) {
                tituloDOM.innerText = "Receta no encontrada";
                return;
            }

            // PINTAR DATOS
            tituloDOM.innerText = receta.nombre;
            const hero = document.getElementById('receta-hero');
            if (hero && receta.imagen) {
                hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${receta.imagen}')`;
                hero.style.backgroundSize = 'cover';
                hero.style.backgroundPosition = 'center';
            }

            const listaIngredientes = document.getElementById('receta-ingredientes');
            if (listaIngredientes) {
                listaIngredientes.innerHTML = '';
                receta.ingredientes.forEach(ing => {
                    const li = document.createElement('li');
                    li.innerText = ing;
                    listaIngredientes.appendChild(li);
                });
            }

            const listaInfo = document.getElementById('receta-info');
            if (listaInfo) {
                listaInfo.innerHTML = '';
                for (const [key, value] of Object.entries(receta.informacion)) {
                    const li = document.createElement('li');
                    li.style.textTransform = 'capitalize';
                    li.innerHTML = `<strong>${key}:</strong> ${value}`;
                    listaInfo.appendChild(li);
                }
            }

            const prepDOM = document.getElementById('receta-preparacion');
            if (prepDOM) prepDOM.innerText = receta.preparacion;

            // PINTAR ICONOS DE ALÉRGENOS
            const contenedorEtiquetas = document.getElementById('contenedor-etiquetas');
            if (contenedorEtiquetas) {
                contenedorEtiquetas.innerHTML = '';

                const mapaIconos = {
                    "gluten": ["grass", "icon-gluten"],
                    "huevos": ["egg", "icon-huevos"],
                    "lacteos": ["water_drop", "icon-lacteos"],
                    "pescado": ["set_meal", "icon-pescado"],
                    "frutos_secos": ["nut", "icon-frutos"],
                    "soja": ["eco", "icon-soja"],
                    "apio": ["nutrition", "icon-apio"],
                    "mostaza": ["colorize", "icon-mostaza"]
                };

                if (receta.alergenos) {
                    receta.alergenos.forEach(alergeno => {
                        const clave = alergeno.toLowerCase().replace(' ', '_');
                        const info = mapaIconos[clave];
                        if (info) {
                            const span = document.createElement('span');
                            span.className = `material-symbols-outlined icono-alergeno ${info[1]}`;
                            span.innerText = info[0];
                            span.title = `Contiene ${alergeno}`;
                            contenedorEtiquetas.appendChild(span);
                        }
                    });
                }
            }

            // LÓGICA DEL BOTÓN AÑADIR
            const btnAnadir = document.getElementById('btn-anadir-plan');
            if (btnAnadir) {
                let guardadas = JSON.parse(localStorage.getItem('misRecetasGuardadas')) || [];

                if (guardadas.includes(recetaId)) {
                    btnAnadir.innerText = "✓ Guardada en tu plan";
                    btnAnadir.classList.add('guardado');
                }

                btnAnadir.onclick = () => {
                    let guardadasActuales = JSON.parse(localStorage.getItem('misRecetasGuardadas')) || [];

                    if (!guardadasActuales.includes(recetaId)) {
                        guardadasActuales.push(recetaId);
                        localStorage.setItem('misRecetasGuardadas', JSON.stringify(guardadasActuales));
                        btnAnadir.innerText = "✓ Guardada en tu plan";
                        btnAnadir.classList.add('guardado');
                        alert(`¡${receta.nombre} añadida a tu plan!`);
                    } else {
                        guardadasActuales = guardadasActuales.filter(id => id !== recetaId);
                        localStorage.setItem('misRecetasGuardadas', JSON.stringify(guardadasActuales));
                        btnAnadir.innerText = "Añadir a mi plan";
                        btnAnadir.classList.remove('guardado');
                    }
                };
            }
        })
        .catch(err => console.error("Error cargando los datos:", err));
}

// --- Lógica para Plan_index.html ---
let filtrosActivos = [];

function cargarPlanDieta() {
    const contenedorPrincipal = document.getElementById('secciones-dinamicas');
    const tempSeccion = document.getElementById('temp-seccion');
    const tempPlato = document.getElementById('temp-plato');

    if (!contenedorPrincipal || !tempSeccion) {
        setTimeout(cargarPlanDieta, 100);
        return;
    }

    const dietaId = localStorage.getItem('dietaSeleccionada');
    if (!dietaId) {
        document.getElementById('titulo-dieta-dinamico').innerText = "Selecciona una dieta";
        return;
    }

    fetch('../data.json')
        .then(res => res.json())
        .then(data => {
            const dieta = data.dietas.find(d => d.id === dietaId);
            if (!dieta) return;

            document.getElementById('titulo-dieta-dinamico').innerText = dieta.titulo;

            dieta.plan.forEach(fase => {
                const clonSeccion = tempSeccion.content.cloneNode(true);
                clonSeccion.querySelector('.js-momento').innerText = fase.momento;
                const grid = clonSeccion.querySelector('.js-contenedor-platos');

                fase.opciones.forEach(plato => {
                    const clonPlato = tempPlato.content.cloneNode(true);
                    const tarjeta = clonPlato.querySelector('.contenedor-item');
                    const btn = clonPlato.querySelector('.js-btn-receta');

                    tarjeta.setAttribute('data-alergenos', (plato.alergenos || []).join(',').toLowerCase());
                    tarjeta.setAttribute('data-etiquetas', (plato.etiquetas || []).join(',').toLowerCase());
                    clonPlato.querySelector('.js-nombre').innerText = plato.nombre;

                    if (plato.imagen) {
                        btn.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('${plato.imagen}')`;
                        btn.style.backgroundSize = 'cover';
                        btn.style.backgroundPosition = 'center';
                    }

                    btn.onclick = () => {
                        localStorage.setItem('recetaSeleccionada', plato.id);
                        window.location.href = 'Guia_index.html';
                    };

                    grid.appendChild(clonPlato);
                });

                configurarBotonesCarrusel(clonSeccion, grid);
                contenedorPrincipal.appendChild(clonSeccion);
            });
        })
        .catch(err => console.error("Error cargando el Plan:", err));
}

function configurarBotonesCarrusel(seccion, grid) {
    const btnNext = seccion.querySelector('.js-next');
    const btnPrev = seccion.querySelector('.js-prev');
    let enMovimiento = false;

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

// Lógica de Filtros (Plan_index.html)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-filtro')) {
        const filtro = e.target.getAttribute('data-filtro');

        if (filtro === 'todos') {
            filtrosActivos = [];
            document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        } else {
            document.querySelector('[data-filtro="todos"]').classList.remove('active');
            if (filtrosActivos.includes(filtro)) {
                filtrosActivos = filtrosActivos.filter(f => f !== filtro);
                e.target.classList.remove('active');
            } else {
                filtrosActivos.push(filtro);
                e.target.classList.add('active');
            }
            if (filtrosActivos.length === 0) {
                document.querySelector('[data-filtro="todos"]').classList.add('active');
            }
        }
        ejecutarFiltradoMulticapa();
    }
});

function ejecutarFiltradoMulticapa() {
    const tarjetas = document.querySelectorAll('.contenedor-item');
    tarjetas.forEach(tarjeta => {
        const recetaAlergenos = tarjeta.getAttribute('data-alergenos').split(',');
        const recetaEtiquetas = tarjeta.getAttribute('data-etiquetas').split(',');
        let debeOcultarse = false;

        filtrosActivos.forEach(f => {
            if (f === 'vegano') {
                if (!recetaEtiquetas.includes('vegano')) debeOcultarse = true;
            } else {
                if (recetaAlergenos.includes(f)) debeOcultarse = true;
            }
        });

        if (debeOcultarse) {
            tarjeta.classList.add('receta-oculta');
        } else {
            tarjeta.classList.remove('receta-oculta');
        }
    });
}


window.addEventListener('load', () => {
    console.log("Archivos cargados. Iniciando lógica según la página...");

    if (document.querySelector('[xlu-include-file="Dietas_grid-view.html"]')) {
        inicializar();
    } else if (document.querySelector('[xlu-include-file="PlanGuiaDieta_grid-view.html"]')) {
        cargarPaginaReceta();
    } else if (document.querySelector('[xlu-include-file="PlanDietas_grid-view.html"]')) {
        cargarPlanDieta();
    }
});