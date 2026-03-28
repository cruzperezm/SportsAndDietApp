document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargamos el archivo JSON
    fetch('about-us-data.json')
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.about) {
                inyectarAboutUs(datos.about);
            }
        })
        .catch(error => console.error('Error cargando los datos de About Us:', error));
});

function inyectarAboutUs(data) {
    // 2. Inyectar el recuadro grande (Hero)
    const heroContainer = document.getElementById('about-hero-container');
    if (heroContainer && data.hero) {
        heroContainer.innerHTML = `
            <div class="about-hero-bg" style="background-image: url('${data.hero.image}');"></div>
            <div class="about-hero-overlay"></div>
            <p class="about-hero-text">${data.hero.text}</p>
        `;
    }

    // 3. Inyectar los 4 recuadros (Features)
    const featuresContainer = document.getElementById('about-features-container');
    if (featuresContainer && data.features) {
        featuresContainer.innerHTML = ''; // Limpiamos por si acaso
        data.features.forEach(feature => {
            featuresContainer.innerHTML += `
                <article class="about-feature-card">
                    <span class="material-symbols-outlined feature-icon">${feature.icon}</span>
                    <h3 class="feature-title">${feature.title}</h3>
                    <p class="feature-desc">${feature.description}</p>
                </article>
            `;
        });
    }
}