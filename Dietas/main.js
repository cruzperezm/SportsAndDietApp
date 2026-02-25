const datosPaginas = {
    dieta: {
        titulo: "Lorem Ipsum",
        subtitulo: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        items: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"]
    },
    deporte: {
        titulo: "Lorem Ipsum",
        subtitulo: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        items: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"]
    }
};

async function cargarContenido(tipo) {
    try {
        const respuesta = await fetch('grid-view.html');
        if (!respuesta.ok) throw new Error("Error al cargar template PlanDeporte_grid-view.html");
        const html = await respuesta.text();

        document.getElementById('contenedor-principal').innerHTML = html;

        const info = datosPaginas[tipo];
        document.getElementById('titulo-pagina').innerText = info.titulo;
        document.getElementById('subtitulo-pagina').innerText = info.subtitulo;

        const grid = document.getElementById('grid-items');
        grid.innerHTML = "";

        info.items.forEach(texto => {
            grid.innerHTML += `
        <article class="tarjeta-item">
          <div class="placeholder-imagen"></div>
          <h3>${texto}</h3>
        </article>
      `;
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

window.onload = () => cargarContenido('dieta');