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

async function cargarGuia() {
    try {
        const respuesta = await fetch('grid-view.html');

        if (!respuesta.ok) throw new Error("No se encuentra grid-view.html en la carpeta actual");

        const html = await respuesta.text();
        document.getElementById('contenedor-principal').innerHTML = html;

        document.getElementById('titulo-guia').innerText = datosGuia.tituloPrincipal;
        document.getElementById('subtitulo-hero').innerText = datosGuia.subtituloHero;

        document.getElementById('col-titulo-1').innerText = datosGuia.columna1.titulo;
        const lista1 = document.getElementById('col-lista-1');
        lista1.innerHTML = "";
        datosGuia.columna1.puntos.forEach(p => lista1.innerHTML += `<li>${p}</li>`);

        document.getElementById('col-titulo-2').innerText = datosGuia.columna2.titulo;
        const lista2 = document.getElementById('col-lista-2');
        lista2.innerHTML = "";
        datosGuia.columna2.puntos.forEach(p => lista2.innerHTML += `<li>${p}</li>`);

        document.getElementById('titulo-final').innerText = datosGuia.final.titulo;
        document.getElementById('texto-largo').innerHTML = datosGuia.final.descripcion;

    } catch (e) { console.error("Error en la carga:", e); }
}

window.onload = cargarGuia;