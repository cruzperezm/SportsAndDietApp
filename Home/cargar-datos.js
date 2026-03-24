// Esperamos a que el HTML base esté cargado en el navegador
document.addEventListener('DOMContentLoaded', () => {
    // 1. Solicitamos el archivo JSON
    fetch('data.json')
        .then(respuesta => {
            if (!respuesta.ok) throw new Error('Error al cargar data.json');
            return respuesta.json(); // Convertimos la respuesta a objeto JavaScript
        })
        .then(datos => {
            // 2. Inyectamos la Home (que carga inmediatamente)
            inyectarDatosEnHome(datos);

            // 3. Esperamos a que los componentes externos se carguen para inyectarlos
            esperarElemento('.navigation', () => inyectarHeader(datos.header));
            esperarElemento('.footer-content', () => inyectarFooter(datos.footer));
        })
        .catch(error => console.error('Error cargando los datos:', error));
});

// --- FUNCIÓN VIGILANTE PARA COMPONENTES ASÍNCRONOS ---
function esperarElemento(selector, callback) {
    if (document.querySelector(selector)) {
        callback(); // Si el elemento ya existe, ejecuta la función de inyectar
    } else {
        // Si no existe, vuelve a comprobarlo en 100 milisegundos
        setTimeout(() => esperarElemento(selector, callback), 100);
    }
}

// --- FUNCIONES DE INYECCIÓN DE DATOS ---

function inyectarHeader(headerData) {
    // Logo Home
    const navHome = document.getElementById('nav-home');
    if (navHome) {
        navHome.href = headerData.home.link;
        navHome.innerHTML = `<img src="${headerData.home.logo}" alt="${headerData.home.alt}">`;
    }

    // Links de navegación
    headerData.navLinks.forEach(linkObj => {
        const linkElement = document.getElementById(linkObj.id);
        if (linkElement) {
            linkElement.href = linkObj.link;
            linkElement.textContent = linkObj.text;
        }
    });
}

function inyectarFooter(footerData) {
    // Columnas de texto
    const columnas = document.querySelectorAll('.footer-column p');
    if (columnas.length >= 2) {
        columnas[0].textContent = footerData.textColumns[0];
        columnas[1].textContent = footerData.textColumns[1];
    }

    // Redes Sociales (las creamos dinámicamente)
    const socialContainer = document.querySelector('.social-links');
    if (socialContainer) {
        socialContainer.innerHTML = ''; // Vaciamos el contenedor
        footerData.socialLinks.forEach(social => {
            socialContainer.innerHTML += `
                <a href="${social.link}" class="${social.name}" aria-label="${social.name}">
                    <img alt="${social.alt}" src="${social.icon}">
                </a>
            `;
        });
    }
}

function inyectarDatosEnHome(data) {
    // --- HERO SECTION ---
    document.getElementById('hero-title').textContent = data.hero.title;

    // NUEVA LÓGICA DE VIDEOS:
    const heroVideo = document.getElementById('hero-img');
    const playlist = data.hero.bgVideos;
    let videoActual = 0; // Empezamos por el primer video (posición 0)

    if (playlist && playlist.length > 0) {
        // Cargamos el primer video y le damos al play
        heroVideo.src = playlist[videoActual];
        heroVideo.play().catch(error => console.log("Autoplay bloqueado por el navegador", error));

        // Escuchamos el evento 'ended' (cuando el video termina)
        heroVideo.addEventListener('ended', () => {
            // Pasamos al siguiente video. Si llegamos al final, volvemos al 0.
            videoActual = (videoActual + 1) % playlist.length;
            heroVideo.src = playlist[videoActual];
            heroVideo.play();
        });
    }

    // --- FEATURES SECTION (Generamos los <article> dinámicamente) ---
    const featuresContainer = document.getElementById('features-container');
    data.features.forEach(feature => {
        // Tu HTML original usaba una clase diferente para el tercer texto, lo respetamos
        const textClass = feature.type === 'about-us' ? 'text-wrapper-5' : `${feature.type}-text`;
        featuresContainer.innerHTML += `
        <article class="feature-${feature.type}">
          <img src="${feature.icon}" alt="${feature.type} Logo">
          <p class="${textClass}">${feature.text}</p>
        </article>
      `;
    });

    // --- DIET PREVIEW ---
    document.getElementById('diet-preview-link').href = data.dietPreview.link;
    document.getElementById('diet-preview-img').src = data.dietPreview.image;
    document.getElementById('diet-info-text').textContent = data.dietPreview.info;

    const dietGallery = document.getElementById('diet-gallery-container');
    dietGallery.innerHTML = ''; // Limpiamos el contenedor
    const dietTrack = document.createElement('div');
    // Le damos la clase general y la de dirección izquierda
    dietTrack.className = 'carousel-track carousel-track-left';

    // MAGIA JS: Duplicamos el array para el bucle infinito
    const dietImages = [...data.dietPreview.gallery, ...data.dietPreview.gallery];
    dietImages.forEach((imgSrc, index) => {
        dietTrack.innerHTML += `<img src="${imgSrc}" alt="diet ${index + 1}">`;
    });
    dietGallery.appendChild(dietTrack);

    // --- SPORT PREVIEW ---
    document.getElementById('sport-preview-link').href = data.sportPreview.link;
    document.getElementById('sport-preview-img').src = data.sportPreview.image;
    document.getElementById('sport-info-text').textContent = data.sportPreview.info;

    const sportGallery = document.getElementById('sport-gallery-container');
    sportGallery.innerHTML = '';
    const sportTrack = document.createElement('div');
    // Le damos la clase general y la de dirección derecha
    sportTrack.className = 'carousel-track carousel-track-right';

    // MAGIA JS: Duplicamos el array también para el deporte
    const sportImages = [...data.sportPreview.gallery, ...data.sportPreview.gallery];
    sportImages.forEach((imgSrc, index) => {
        sportTrack.innerHTML += `<img src="${imgSrc}" alt="exercise ${index + 1}">`;
    });
    sportGallery.appendChild(sportTrack);

    // --- COMMENTS SECTION ---
    document.getElementById('comments-heading').textContent = data.comments.heading;
    const commentsContainer = document.getElementById('comments-container');
    data.comments.items.forEach((comment, index) => {
        commentsContainer.innerHTML += `
        <article id="comment-${index + 1}">
          <div class="comment-box">
            <div class="comment-comas" aria-hidden="true">,,</div>
            <blockquote class="comment">${comment}</blockquote>
          </div>
        </article>
      `;
    });

    // --- SIGN UP SECTION ---
    // Usamos innerHTML porque tu texto tiene una etiqueta <br />
    document.getElementById('sign-up-heading').innerHTML = data.signUp.heading;
    document.getElementById('sign-up-img').src = data.signUp.image;

    const signUpBtn = document.getElementById('sign-up-link');
    signUpBtn.href = data.signUp.buttonLink;
    signUpBtn.textContent = data.signUp.buttonText;
}