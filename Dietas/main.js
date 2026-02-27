const datosModulo = {
    titulo: "Lorem Ipsum",
    subtitulo: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    items: Array(6).fill("Lorem Ipsum"),
    plan: [
        { subtitulo: "Lorem Ipsum", items: Array(9).fill("Lorem Ipsum") },
        { subtitulo: "Lorem Ipsum", items: Array(9).fill("Lorem Ipsum") },
        { subtitulo: "Lorem Ipsum", items: Array(9).fill("Lorem Ipsum") }
    ],
    guia: {
        tituloPrincipal: "Lorem Ipsum",
        subtituloHero: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        columna1: { titulo: "Lorem Ipsum", puntos: Array(5).fill("Lorem Ipsum") },
        columna2: { titulo: "Lorem Ipsum", puntos: Array(5).fill("Lorem Ipsum") },
        final: {
            titulo: "Lorem Ipsum",
            descripcion: "Lorem Ipsum ".repeat(150)
        }
    }
};

let bloqueado = false;

async function cargarComponentesGlobales() {
    try {
        const resHeader = await fetch('../Home/header.html');
        if (resHeader.ok) {
            document.getElementById('header-global').innerHTML = await resHeader.text();
        }

        const resFooter = await fetch('../Home/footer.html');
        if (resFooter.ok) {
            document.getElementById('footer-global').innerHTML = await resFooter.text();
        }
    } catch (e) { console.error("Error cargando componentes desde Home:", e); }
}

async function navegar(vista) {
    const contenedor = document.getElementById('contenedor-principal');
    let url = "";

    if (vista === 'main') url = 'Dietas_grid-view.html';
    if (vista === 'plan') url = 'PlanDietas_grid-view.html';
    if (vista === 'guia') url = 'PlanGuiaDieta_grid-view.html';

    try {
        const res = await fetch(url);
        const html = await res.text();
        contenedor.innerHTML = html;

        if (vista === 'main') renderMain();
        if (vista === 'plan') renderPlan();
        if (vista === 'guia') renderGuia();

        window.scrollTo(0, 0);
    } catch (e) { console.error(e); }
}

function renderMain() {
    document.getElementById('titulo-pagina').innerText = datosModulo.titulo;
    document.getElementById('subtitulo-pagina').innerText = datosModulo.subtitulo;
    const grid = document.getElementById('grid-items');
    grid.innerHTML = datosModulo.items.map(() => `
        <article class="tarjeta-item">
            <div class="placeholder-imagen" onclick="navegar('plan')"></div>
            <h3>Lorem Ipsum</h3>
        </article>
    `).join('');
}

function renderPlan() {
    document.getElementById('titulo-pagina').innerText = datosModulo.titulo;
    const contenedor = document.getElementById('secciones-dinamicas');
    contenedor.innerHTML = datosModulo.plan.map((seccion, idx) => `
        <div class="seccion-comida">
            <h2 class="text-48">${seccion.subtitulo}</h2>
            <div class="wrapper-carrusel">
                <div class="grid-3-cuadros" id="fila-${idx}">
                    ${seccion.items.map(texto => `
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
            for (let i = 0; i < 3; i++) fila.appendChild(fila.firstElementChild);
            fila.style.transform = "translateX(0)";
            bloqueado = false;
        }, 500);
    } else {
        fila.style.transition = "none";
        for (let i = 0; i < 3; i++) fila.prepend(fila.lastElementChild);
        fila.style.transform = `translateX(${-anchoMover * 3}px)`;
        setTimeout(() => {
            fila.style.transition = "transform 0.5s ease";
            fila.style.transform = "translateX(0)";
            setTimeout(() => { bloqueado = false; }, 500);
        }, 10);
    }
}

function renderGuia() {
    document.getElementById('titulo-guia').innerText = datosModulo.guia.tituloPrincipal;
    document.getElementById('subtitulo-hero').innerText = datosModulo.guia.subtituloHero;
    document.getElementById('col-titulo-1').innerText = datosModulo.guia.columna1.titulo;
    document.getElementById('col-titulo-2').innerText = datosModulo.guia.columna2.titulo;
    document.getElementById('col-lista-1').innerHTML = datosModulo.guia.columna1.puntos.map(() => `<li>Lorem Ipsum</li>`).join('');
    document.getElementById('col-lista-2').innerHTML = datosModulo.guia.columna2.puntos.map(() => `<li>Lorem Ipsum</li>`).join('');

    document.getElementById('titulo-final').innerText = datosModulo.guia.final.titulo;
    document.getElementById('texto-largo').innerHTML = datosModulo.guia.final.descripcion;

    const hero = document.querySelector('.hero-guia');
    hero.style.cursor = 'pointer';
    hero.onclick = () => navegar('main');
}

window.onload = async () => {
    await cargarComponentesGlobales();
    navegar('main');
};
