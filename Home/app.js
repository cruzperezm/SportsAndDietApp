// Función para cargar componentes HTML
function cargarComponente(idContenedor, archivoHTML) {
  fetch(archivoHTML)
    .then((response) => {
      if (!response.ok) throw new Error('Error al cargar ' + archivoHTML);
      return response.text();
    })
    .then((html) => {
      document.getElementById(idContenedor).innerHTML = html;
    })
    .catch((error) => console.error(error));
}

// Ejecutamos la función cuando el DOM cargue
document.addEventListener('DOMContentLoaded', () => {
  cargarComponente('header-placeholder', 'header.html');
  cargarComponente('footer-container', 'footer.html');
});
