// Función para cargar componentes HTML
function cargarComponente(idContenedor, archivoHTML) {
    const contenedor = document.getElementById(idContenedor);

    // Si el contenedor no existe en esta página en concreto, no hace nada y evita errores
    if (!contenedor) return;

    fetch(archivoHTML)
        .then((response) => {
            if (!response.ok) throw new Error('Error al cargar ' + archivoHTML);
            return response.text();
        })
        .then((html) => {
            contenedor.innerHTML = html;
        })
        .catch((error) => console.error(error));
}

// Ejecutamos la función cuando el DOM cargue
document.addEventListener('DOMContentLoaded', () => {
    // Asegúrate de que en tu index.html (y las demás páginas) tienes un
    // <div id="header-container"></div> y un <div id="footer-container"></div>
    cargarComponente('header-container', 'header.html');
    cargarComponente('footer-container', 'footer.html');
});