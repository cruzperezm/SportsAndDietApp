const datosPlan = {
    titulo: "Lorem Ipsum",
    comidas: [
        { subtitulo: "Lorem Ipsum", items: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"] },
        { subtitulo: "Lorem Ipsum", items: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"] },
        { subtitulo: "Lorem Ipsum", items: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"] }
    ]
};

async function cargarPlanDietas() {
    try {
        const respuesta = await fetch('PlanDietas/grid-view.html');
        if (!respuesta.ok) throw new Error("No se encuentra el template");
        const html = await respuesta.text();

        document.getElementById('contenedor-principal').innerHTML = html;
        document.getElementById('titulo-pagina').innerText = datosPlan.titulo;

        const contenedor = document.getElementById('secciones-dinamicas');
        contenedor.innerHTML = "";

        datosPlan.comidas.forEach(comida => {
            let cuadrosHTML = "";
            comida.items.forEach(texto => {
                cuadrosHTML += `
                    <div class="contenedor-item">
                        <div class="cuadro-gris">
                            <div class="texto-interior">${texto}</div>
                        </div>
                    </div>`;
            });

            contenedor.innerHTML += `
                <div class="seccion-comida">
                    <h2 class="text-48">${comida.subtitulo}</h2>
                    <div class="grid-3-cuadros">${cuadrosHTML}</div>
                </div>`;
        });
    } catch (e) {
        console.error("Error cargando:", e);
    }
}

window.onload = cargarPlanDietas;