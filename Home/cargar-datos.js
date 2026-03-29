document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(respuesta => {
            if (!respuesta.ok) throw new Error('Error al cargar dieta.json');
            return respuesta.json();
        })
        .then(datos => {
            inyectarDatosEnHome(datos);
            esperarElemento('.navigation', () => inyectarHeader(datos.header));
            esperarElemento('.footer-content', () => inyectarFooter(datos.footer));
        })
        .catch(error => console.error('Error cargando los datos:', error));
});

function esperarElemento(selector, callback) {
    if (document.querySelector(selector)) {
        callback();
    } else {
        setTimeout(() => esperarElemento(selector, callback), 100);
    }
}


function inyectarDatosEnHome(data) {
    document.getElementById('hero-title').textContent = data.hero.title;

    const heroVideo = document.getElementById('hero-img');
    const playlist = data.hero.bgVideos;
    let videoActual = 0;

    if (playlist && playlist.length > 0) {
        heroVideo.src = playlist[videoActual];
        heroVideo.play().catch(error => console.log("Autoplay bloqueado por el navegador", error));

        heroVideo.addEventListener('ended', () => {
            videoActual = (videoActual + 1) % playlist.length;
            heroVideo.src = playlist[videoActual];
            heroVideo.play();
        });
    }

    const featuresContainer = document.getElementById('features-container');
    data.features.forEach(feature => {
        const textClass = feature.type === 'about-us' ? 'text-wrapper-5' : `${feature.type}-text`;
        featuresContainer.innerHTML += `
        <article class="feature-${feature.type}">
          <img src="${feature.icon}" alt="${feature.type} Logo">
          <p class="${textClass}">${feature.text}</p>
        </article>
      `;
    });

    document.getElementById('diet-preview-link').href = data.dietPreview.link;
    document.getElementById('diet-preview-img').src = data.dietPreview.image;
    document.getElementById('diet-info-text').textContent = data.dietPreview.info;

    const dietGallery = document.getElementById('diet-gallery-container');
    dietGallery.innerHTML = '';
    const dietTrack = document.createElement('div');
    dietTrack.className = 'carousel-track carousel-track-left';

    const dietImages = [...data.dietPreview.gallery, ...data.dietPreview.gallery];
    dietImages.forEach((imgSrc, index) => {
        dietTrack.innerHTML += `<img src="${imgSrc}" alt="diet ${index + 1}">`;
    });
    dietGallery.appendChild(dietTrack);

    document.getElementById('sport-preview-link').href = data.sportPreview.link;
    document.getElementById('sport-preview-img').src = data.sportPreview.image;
    document.getElementById('sport-info-text').textContent = data.sportPreview.info;

    const sportGallery = document.getElementById('sport-gallery-container');
    sportGallery.innerHTML = '';
    const sportTrack = document.createElement('div');
    sportTrack.className = 'carousel-track carousel-track-right';

    const sportImages = [...data.sportPreview.gallery, ...data.sportPreview.gallery];
    sportImages.forEach((imgSrc, index) => {
        sportTrack.innerHTML += `<img src="${imgSrc}" alt="exercise ${index + 1}">`;
    });
    sportGallery.appendChild(sportTrack);

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

    document.getElementById('sign-up-heading').innerHTML = data.signUp.heading;
    document.getElementById('sign-up-img').src = data.signUp.image;

    const signUpBtn = document.getElementById('sign-up-link');
    signUpBtn.href = data.signUp.buttonLink;
    signUpBtn.textContent = data.signUp.buttonText;
}