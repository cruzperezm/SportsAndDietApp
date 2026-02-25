const datosDietas = {
    titulo: "Lorem Ipsum",
    subtitulo: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    items: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"]
};

const datosPlan = {
    titulo: "Lorem Ipsum",
    comidas: [
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
    },
    final: {
        titulo: "Lorem Ipsum",
        descripcion: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem <br/><br/>Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum <br/><br/>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
    }
};

async function navegar(vista) {
    const contenedor = document.getElementById('contenedor-principal');
    let url = "";

    if (vista === 'dietas') url = 'Dietas_grid-view.html';
    if (vista === 'plan') url = 'PlanDietas_grid-view.html';
    if (vista === 'guia') url = 'PlanGuiaDieta_grid-view.html';

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("File not found");
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
    grid.innerHTML = datosDietas.items.map((texto, index) => `
        <article class="tarjeta-item">
            <div class="placeholder-imagen" onclick="navegar('${index % 2 === 0 ? 'plan' : 'guia'}')"></div>
            <h3>${texto}</h3>
        </article>
    `).join('');
}

function renderPlan() {
    document.getElementById('titulo-pagina').innerText = datosPlan.titulo;
    const contenedor = document.getElementById('secciones-dinamicas');
    contenedor.innerHTML = datosPlan.comidas.map(comida => `
        <div class="seccion-comida">
            <h2 class="text-48">${comida.subtitulo}</h2>
            <div class="grid-3-cuadros">
                ${comida.items.map(texto => `
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

    document.getElementById('titulo-final').innerText = datosGuia.final.titulo;
    document.getElementById('texto-largo').innerHTML = datosGuia.final.descripcion;

    document.querySelector('.hero-guia').style.cursor = 'pointer';
    document.querySelector('.hero-guia').onclick = () => navegar('dietas');
}

window.onload = () => navegar('dietas');
