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

async function cargarGuiaDeporte() {
    try {
        const respuesta = await fetch('grid-view.html');
        const html = await respuesta.text();
        document.getElementById('contenedor-principal').innerHTML = html;

        document.getElementById('titulo-guia').innerText = datosGuia.tituloPrincipal;
        document.getElementById('subtitulo-hero').innerText = datosGuia.subtituloHero;

        const lista1 = document.getElementById('col-lista-1');
        document.getElementById('col-titulo-1').innerText = datosGuia.columna1.titulo;
        datosGuia.columna1.puntos.forEach(p => lista1.innerHTML += `<li>${p}</li>`);

        const lista2 = document.getElementById('col-lista-2');
        document.getElementById('col-titulo-2').innerText = datosGuia.columna2.titulo;
        datosGuia.columna2.puntos.forEach(p => lista2.innerHTML += `<li>${p}</li>`);

    } catch (e) { console.error(e); }
}

window.onload = cargarGuiaDeporte;