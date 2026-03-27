// --- 1. INICIALIZADOR GLOBAL ---
// Se ejecuta en TODAS las páginas automáticamente
document.addEventListener('DOMContentLoaded', async () => {
    // Primero, cargamos los componentes estáticos (Header/Footer si los hay)
    await xLuIncludeFile();

    // Segundo, comprobamos si la página actual necesita datos dinámicos JSON
    const body = document.body;
    const jsonRuta = body.getAttribute('data-json-src'); // Ej: 'log-in-data.json'
    const pageId = body.getAttribute('data-page-id');    // Ej: 'login'

    if (jsonRuta && pageId) {
        cargarDatosPagina(jsonRuta, pageId);
    }
});

// --- 2. GESTOR DE JSON GENÉRICO ---
async function cargarDatosPagina(ruta, pageId) {
    try {
        const respuesta = await fetch(ruta);
        if (!respuesta.ok) throw new Error(`Error buscando ${ruta}`);

        const datosCompletos = await respuesta.json();

        // Esto permite que uses 1 solo JSON gigante, o 1 por página.
        // Busca el bloque específico de la página (ej: datosCompletos["login"])
        const datosPagina = datosCompletos[pageId] || datosCompletos;

        // "Enrutador": Decide qué función de inyección usar según la página
        if (pageId === 'login') {
            inyectarLogIn(datosPagina);
        } else if (pageId === 'home') {
            // inyectarHome(datosPagina); <- Aquí meterías la función del home que hicimos antes
        }
    } catch (error) {
        console.error("Fallo al cargar los datos:", error);
    }
}

// --- 3. FUNCIONES DE INYECCIÓN ESPECÍFICAS DE CADA PÁGINA ---

function inyectarLogIn(data) {
    // 1. Avatar
    const avatar = document.getElementById('login-avatar');
    avatar.src = data.avatar.src;
    avatar.alt = data.avatar.alt;

    // 2. Inputs de texto
    const inputsContainer = document.getElementById('login-inputs-container');
    data.inputs.forEach(input => {
        inputsContainer.innerHTML += `
            <div class="input-field">
              <input type="${input.type}" placeholder="${input.placeholder}" />
            </div>
        `;
    });

    // 3. Botones principales
    const btnsContainer = document.getElementById('login-buttons-container');
    data.buttons.forEach(btn => {
        btnsContainer.innerHTML += `
            <a href="${btn.link}" class="wire-btn">${btn.text}</a>
        `;
    });

    // 4. Enlaces de texto inferiores
    document.getElementById('login-prefix').textContent = data.links.prefix;
    const signupLink = document.getElementById('login-signup-link');
    signupLink.textContent = data.links.signupText;
    signupLink.href = data.links.signupLink;
    document.getElementById('login-forgot-text').textContent = data.links.forgotText;

    // 5. Redes sociales
    const socialContainer = document.getElementById('login-social-container');
    data.social.forEach(red => {
        socialContainer.innerHTML += `
            <a href="${red.link}" class="wireframe-icon" aria-label="${red.platform}">
              <img src="${red.icon}" alt="Icono ${red.platform}" />
            </a>
        `;
    });
}

// --- 4. CARGA DE COMPONENTES ESTÁTICOS (Tu función xLu Include original mejorada) ---
async function xLuIncludeFile() {
    let z = document.querySelectorAll("*");
    for (let i = 0; i < z.length; i++) {
        if (z[i].getAttribute("xlu-include-file")) {
            let a = z[i].cloneNode(false);
            let file = z[i].getAttribute("xlu-include-file");

            try {
                let response = await fetch(file);
                if (response.ok) {
                    let content = await response.text();
                    a.removeAttribute("xlu-include-file");
                    a.innerHTML = content;
                    z[i].parentNode.replaceChild(a, z[i]);
                    await xLuIncludeFile(); // Recursividad por si hay componentes dentro de componentes
                }
            } catch (error) {
                console.error("Error fetching component:", error);
            }
            return;
        }
    }
}