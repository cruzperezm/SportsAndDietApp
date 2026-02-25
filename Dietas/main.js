const datosDietas = {
    titulo: "Lorem Ipsum",
    subtitulo: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    items: Array(6).fill("Lorem Ipsum")
};

const datosPlan = {
    titulo: "Lorem Ipsum",
    comidas: [
        { subtitulo: "Lorem Ipsum", items: Array(9).fill("Lorem Ipsum") },
        { subtitulo: "Lorem Ipsum", items: Array(9).fill("Lorem Ipsum") },
        { subtitulo: "Lorem Ipsum", items: Array(9).fill("Lorem Ipsum") }
    ]
};

const datosGuia = {
    tituloPrincipal: "Lorem Ipsum",
    subtituloHero: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    columna1: { titulo: "Lorem Ipsum", puntos: Array(5).fill("Lorem Ipsum") },
    columna2: { titulo: "Lorem Ipsum", puntos: Array(5).fill("Lorem Ipsum") },
    final: {
        titulo: "Lorem Ipsum",
        descripcion: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem <br/><br/>Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum <br/><br/>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
    }
};

let bloqueado = false;

async function navegar(vista) {
    const contenedor = document.getElementById('contenedor-principal');
    let url = "";

    if (vista === 'dietas') url = 'Dietas_grid-view.html';
    if (vista === 'plan') url = 'PlanDietas_grid-view.html';
    if (vista === 'guia') url = 'PlanGuiaDieta_grid-view.html';

    try {
        const res = await fetch(url);
        const html = await res.text();
        contenedor.innerHTML = html;

        if (vista === 'dietas') renderDietas();
        if (vista === 'plan') renderPlan();
        if (vista === 'guia') renderGuia();

        window.scrollTo(0, 0);
    } catch (e) { console.error(e); }
}

function renderDietas() {
    document.getElementById('titulo-pagina').innerText = datosDietas.titulo;
    document.getElementById('subtitulo-pagina').innerText = datosDietas.subtitulo;
    const grid = document.getElementById('grid-items');
    grid.innerHTML = datosDietas.items.map(() => `
        <article class="tarjeta-item">
            <div class="placeholder-imagen" onclick="navegar('plan')"></div>
            <h3>Lorem Ipsum</h3>
        </article>
    `).join('');
}

function renderPlan() {
    document.getElementById('titulo-pagina').innerText = datosPlan.titulo;
    const contenedor = document.getElementById('secciones-dinamicas');

    contenedor.innerHTML = datosPlan.comidas.map((comida, idx) => `
        <div class="seccion-comida">
            <h2 class="text-48">${comida.subtitulo}</h2>
            <div class="wrapper-carrusel">
                <div class="grid-3-cuadros" id="fila-${idx}">
                    ${comida.items.map(texto => `
                        <div class="contenedor-item">
                            <div class="cuadro-gris" onclick="navegar('guia')">
                                <div class="texto-interior">${texto}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="controles-carrusel">
                <button class="btn-nav" onclick="moverCarrusel(${idx}, -1)">←</button>
                <button class="btn-nav" onclick="moverCarrusel(${idx}, 1)">→</button>
            </div>
        </div>`).join('');
}

function moverCarrusel(idx, dir) {
    if (bloqueado) return;
    bloqueado = true;

    const fila = document.getElementById(`fila-${idx}`);
    const items = fila.querySelectorAll('.contenedor-item');
    const anchoMover = items[0].offsetWidth + parseFloat(getComputedStyle(fila).gap);

    if (dir === 1) {
        fila.style.transition = "transform 0.5s ease";
        fila.style.transform = `translateX(${-anchoMover * 3}px)`;

        setTimeout(() => {
            fila.style.transition = "none";
            for (let i = 0; i < 3; i++) {
                fila.appendChild(fila.firstElementChild);
            }
            fila.style.transform = "translateX(0)";
            bloqueado = false;
        }, 500);
    } else {
        fila.style.transition = "none";
        for (let i = 0; i < 3; i++) {
            fila.prepend(fila.lastElementChild);
        }
        fila.style.transform = `translateX(${-anchoMover * 3}px)`;

        setTimeout(() => {
            fila.style.transition = "transform 0.5s ease";
            fila.style.transform = "translateX(0)";
            setTimeout(() => { bloqueado = false; }, 500);
        }, 10);
    }
}

function renderGuia() {
    document.getElementById('titulo-guia').innerText = datosGuia.tituloPrincipal;
    document.getElementById('subtitulo-hero').innerText = datosGuia.subtituloHero;
    document.getElementById('col-titulo-1').innerText = datosGuia.columna1.titulo;
    document.getElementById('col-titulo-2').innerText = datosGuia.columna2.titulo;
    document.getElementById('col-lista-1').innerHTML = datosGuia.columna1.puntos.map(() => `<li>Lorem Ipsum</li>`).join('');
    document.getElementById('col-lista-2').innerHTML = datosGuia.columna2.puntos.map(() => `<li>Lorem Ipsum</li>`).join('');

    // ESTA ES LA PARTE QUE FALTABA
    document.getElementById('titulo-final').innerText = datosGuia.final.titulo;
    document.getElementById('texto-largo').innerHTML = datosGuia.final.descripcion;

    const hero = document.querySelector('.hero-guia');
    hero.style.cursor = 'pointer';
    hero.onclick = () => navegar('dietas');
}

window.onload = () => navegar('dietas');