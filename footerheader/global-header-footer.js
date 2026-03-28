document.addEventListener('DOMContentLoaded', () => {
    // Comprobamos cada 100ms si el HTML del header y footer ya fue inyectado
    const intervalo = setInterval(() => {
        const nav = document.getElementById('main-nav');
        const footerTextos = document.getElementById('footer-text-columns');

        // Si ya existen en la página, paramos la búsqueda y cargamos los datos
        if (nav && footerTextos) {
            clearInterval(intervalo);
            cargarDatosGlobales();
        }
    }, 100);
});

function cargarDatosGlobales() {
    // Forzamos la ruta exacta que necesitas
    fetch('../footerheader/data.json')
        .then(respuesta => {
            if (!respuesta.ok) throw new Error("No se pudo cargar el JSON del Header/Footer");
            return respuesta.json();
        })
        .then(datos => {
            if (datos.header) inyectarHeader(datos.header);
            if (datos.footer) inyectarFooter(datos.footer);
        })
        .catch(error => console.error("Error inyectando globales:", error));
}

// --- FUNCIONES DE INYECCIÓN ---
function inyectarHeader(headerData) {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    nav.innerHTML = `
        <a id="nav-home" class="nav-button" href="${headerData.home.link}">
            <img src="${headerData.home.logo}" alt="${headerData.home.alt}" style="width: 100%; height: 100%; object-fit: contain;">
        </a>
    `;

    if (headerData.navLinks) {
        headerData.navLinks.forEach(enlace => {
            nav.innerHTML += `
                <a id="${enlace.id}" class="nav-button" href="${enlace.link}">
                    <span class="material-symbols-outlined nav-icon">${enlace.icon}</span>
                    <span class="nav-text">${enlace.text}</span>
                </a>
            `;
        });
    }
}

function inyectarFooter(footerData) {
    const footerTextos = document.getElementById('footer-text-columns');
    if (footerTextos && footerData.textColumns) {
        footerTextos.innerHTML = '';
        footerData.textColumns.forEach(texto => {
            footerTextos.innerHTML += `
                <div class="footer-column">
                    <p>${texto}</p>
                </div>
            `;
        });
    }

    const footerSocial = document.getElementById('footer-social-links');
    if (footerSocial && footerData.socialLinks) {
        footerSocial.innerHTML = '';
        footerData.socialLinks.forEach(red => {
            footerSocial.innerHTML += `
                <a href="${red.link}" class="${red.name.toLowerCase()}" aria-label="${red.name}">
                    <img alt="${red.alt}" src="${red.icon}">
                </a>
            `;
        });
    }
}