const datosDeporte = {
    titulo: "Lorem Ipsum",
    subtitulo: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    items: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"]
};

const datosPlan = {
    titulo: "Lorem Ipsum",
    rutinas: [
        { subtitulo: "Lorem Ipsum", items: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"] },
        { subtitulo: "Lorem Ipsum", items: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"] },
        { subtitulo: "Lorem Ipsum", items: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"] }
    ]
};

const datosGuia = {
    tituloPrincipal: "Lorem Ipsum",
    subtituloHero: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    columna1: {
        titulo: "Lorem Ipsum",
        puntos: ["Lorem Ipsum Lorem Ipsum", "Lorem Ipsum Lorem Ipsum", "Lorem Ipsum Lorem Ipsum", "Lorem Ipsum Lorem Ipsum", "Lorem Ipsum Lorem Ipsum", "Lorem Ipsum Lorem Ipsum"]
    },
    columna2: {
        titulo: "Lorem Ipsum",
        puntos: ["Lorem Ipsum Lorem Ipsum", "Lorem Ipsum Lorem Ipsum", "Lorem Ipsum Lorem Ipsum", "Lorem Ipsum Lorem Ipsum", "Lorem Ipsum Lorem Ipsum", "Lorem Ipsum Lorem Ipsum"]
    }
};

async function navegar(vista) {
    const contenedor = document.getElementById('contenedor-principal');
    let url = "";

    if (vista === 'deporte') url = 'Deporte_grid-view.html';
    if (vista === 'plan') url = 'PlanDeporte_grid-view.html';
    if (vista === 'guia') url = 'PlanGuiaDeporte_grid-view.html';

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("File not found");
        const html = await res.text();
        contenedor.innerHTML = html;

        if (vista === 'deporte') renderDeporte();
        if (vista === 'plan') renderPlan();
        if (vista === 'guia') renderGuia();

        window.scrollTo(0, 0);
    } catch (e) { console.error(e); }
}

function renderDeporte() {
    document.getElementById('titulo-pagina').innerText = datosDeporte.titulo;
    document.getElementById('subtitulo-pagina').innerText = datosDeporte.subtitulo;
    const grid = document.getElementById('grid-items');
    grid.innerHTML = datosDeporte.items.map((texto, index) => `
        <article class="tarjeta-item">
            <div class="placeholder-imagen" onclick="navegar('${index % 2 === 0 ? 'plan' : 'guia'}')"></div>
            <h3>${texto}</h3>
        </article>
    `).join('');
}

function renderPlan() {
    document.getElementById('titulo-pagina').innerText = datosPlan.titulo;
    const contenedor = document.getElementById('secciones-dinamicas');
    contenedor.innerHTML = datosPlan.rutinas.map(rutina => `
        <div class="seccion-comida">
            <h2 class="text-48">${rutina.subtitulo}</h2>
            <div class="grid-3-cuadros">
                ${rutina.items.map(texto => `
                    <div class="contenedor-item">
                        <div class="cuadro-gris" onclick="navegar('guia')">
                            <div class="texto-interior">${texto}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function renderGuia() {
    document.getElementById('titulo-guia').innerText = datosGuia.tituloPrincipal;
    document.getElementById('subtitulo-hero').innerText = datosGuia.subtituloHero;
    document.getElementById('col-titulo-1').innerText = datosGuia.columna1.titulo;
    document.getElementById('col-titulo-2').innerText = datosGuia.columna2.titulo;

    document.getElementById('col-lista-1').innerHTML = datosGuia.columna1.puntos.map(p => `<li>${p}</li>`).join('');
    document.getElementById('col-lista-2').innerHTML = datosGuia.columna2.puntos.map(p => `<li>${p}</li>`).join('');

    const hero = document.querySelector('.hero-guia');
    hero.style.cursor = 'pointer';
    hero.onclick = () => navegar('deporte');
}

window.onload = () => navegar('deporte');
