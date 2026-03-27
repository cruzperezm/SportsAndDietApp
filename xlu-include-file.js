document.addEventListener('DOMContentLoaded', async () => {
    // 1. Inyectamos todo el HTML estático primero (Header, Footer, Artículos)
    await xLuIncludeFile();

    const body = document.body;

    // 2. Cargamos los datos GLOBALES (Header y Footer)
    const globalRuta = body.getAttribute('data-global-src');
    if (globalRuta) {
        try {
            const respuestaGlobal = await fetch(globalRuta);
            if (respuestaGlobal.ok) {
                const datosGlobales = await respuestaGlobal.json();
                if (datosGlobales.header) inyectarHeader(datosGlobales.header);
                if (datosGlobales.footer) inyectarFooter(datosGlobales.footer);
            }
        } catch (error) {
            console.error("Error cargando los datos globales:", error);
        }
    }

    // 3. Cargamos los datos ESPECÍFICOS de la página actual (Si los requiere)
    const jsonPaginRuta = body.getAttribute('data-json-src');
    const pageId = body.getAttribute('data-page-id');

    if (jsonPaginRuta && pageId) {
        try {
            const respuestaPagina = await fetch(jsonPaginRuta);
            if (respuestaPagina.ok) {
                const datosCompletos = await respuestaPagina.json();
                const datosPagina = datosCompletos[pageId] || datosCompletos;

                // Enrutador para páginas específicas
                if (pageId === 'home' && typeof inyectarHome === 'function') inyectarHome(datosPagina);
                if (pageId === 'login' && typeof inyectarLogIn === 'function') inyectarLogIn(datosPagina);
                if (pageId === 'signup' && typeof inyectarSignUp === 'function') inyectarSignUp(datosPagina);
            }
        } catch (error) {
            console.error(`Error cargando los datos de la página ${pageId}:`, error);
        }
    }
});

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

                    if (file === "article-template.html") {
                        let articleData = {
                            title: z[i].getAttribute("data-title"),
                            subtitle: z[i].getAttribute("data-subtitle"),
                            date: z[i].getAttribute("data-date"),
                            displayDate: z[i].getAttribute("data-display-date"),
                            content: z[i].getAttribute("data-content"),
                            image: z[i].getAttribute("data-image"),
                            imageCaption: z[i].getAttribute("data-image-caption")
                        };

                        content = content.replace(/{{title}}/g, articleData.title)
                            .replace(/{{subtitle}}/g, articleData.subtitle)
                            .replace(/{{date}}/g, articleData.date)
                            .replace(/{{displayDate}}/g, articleData.displayDate)
                            .replace(/{{content}}/g, articleData.content)
                            .replace(/{{image}}/g, articleData.image || '')
                            .replace(/{{imageCaption}}/g, articleData.imageCaption || '');
                    }

                    a.removeAttribute("xlu-include-file");
                    a.innerHTML = content;
                    z[i].parentNode.replaceChild(a, z[i]);

                    // Await añadido para asegurar la sincronía de carga de componentes
                    await xLuIncludeFile();
                }
            } catch (error) {
                console.error("Error fetching file:", error);
            }

            return;
        }
    }
}