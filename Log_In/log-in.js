// =========================================================
// LÓGICA ESPECÍFICA DE LA PÁGINA DE LOG IN
// =========================================================

// Esta función será detectada y llamada automáticamente por tu script global
// (xlu-include-file.js) en cuanto termine de descargar el JSON.
function inyectarLogIn(data) {
    // 1. Inyectar Avatar
    const avatar = document.getElementById('login-avatar');
    if (avatar) {
        avatar.src = data.avatar.src;
        avatar.alt = data.avatar.alt;
    }

    // 2. Inyectar Inputs
    const inputsContainer = document.getElementById('login-inputs-container');
    if (inputsContainer) {
        inputsContainer.innerHTML = '';
        data.inputs.forEach(input => {
            inputsContainer.innerHTML += `
                <div class="input-field">
                  <input id="${input.id}" type="${input.type}" placeholder="${input.placeholder}" required />
                </div>
            `;
        });
    }

    // 3. Inyectar Botones (Siguiente debe ser type="submit" para que el enter funcione)
    const btnsContainer = document.getElementById('login-buttons-container');
    if (btnsContainer) {
        btnsContainer.innerHTML = '';
        data.buttons.forEach(btn => {
            if (btn.type === 'submit') {
                btnsContainer.innerHTML += `
                    <button type="submit" class="wire-btn" style="border:none; font-family:inherit; font-size:inherit;">
                        ${btn.text}
                    </button>
                `;
            } else {
                btnsContainer.innerHTML += `<a href="${btn.link}" class="wire-btn">${btn.text}</a>`;
            }
        });
    }

    // 4. Inyectar Textos y Enlaces Inferiores
    const prefix = document.getElementById('login-prefix');
    if (prefix) prefix.textContent = data.links.prefix;

    const signupLink = document.getElementById('login-signup-link');
    if (signupLink) {
        signupLink.textContent = data.links.signupText;
        signupLink.href = data.links.signupLink;
    }

    const forgotText = document.getElementById('login-forgot-text');
    if (forgotText) forgotText.textContent = data.links.forgotText;

    // 5. Inyectar Iconos Redes Sociales
    const socialContainer = document.getElementById('login-social-container');
    if (socialContainer) {
        socialContainer.innerHTML = '';
        data.social.forEach(red => {
            socialContainer.innerHTML += `
                <a href="${red.link}" class="wireframe-icon" aria-label="${red.platform}">
                  <img src="${red.icon}" alt="Icono ${red.platform}" />
                </a>
            `;
        });
    }

    // 6. LÓGICA DE VALIDACIÓN DEL FORMULARIO
    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('login-error');

    if (loginForm) {
        loginForm.addEventListener('submit', function(evento) {
            evento.preventDefault(); // Evita que la página recargue

            // Leemos lo introducido
            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;

            // Leemos los usuarios que se hayan registrado desde la página de Sign Up
            let usuariosLocales = JSON.parse(localStorage.getItem('db_usuarios_sports')) || [];

            // Unimos los usuarios del JSON con los nuevos usuarios registrados
            let todosLosUsuarios = [...data.users, ...usuariosLocales];

            // Comprobamos si el usuario existe en nuestra base de datos combinada
            const usuarioValido = todosLosUsuarios.find(u => u.username === usernameInput && u.password === passwordInput);

            if (usuarioValido) {
                // Éxito: Guardamos la sesión
                errorMsg.style.display = 'none';
                sessionStorage.setItem('usuarioAutenticado', usuarioValido.username);

                // Redirigimos al Dashboard
                const submitBtnData = data.buttons.find(b => b.type === 'submit');
                window.location.href = submitBtnData.link;
            } else {
                // Falla: Mostramos el error
                errorMsg.textContent = 'Nombre de usuario o contraseña incorrectos.';
                errorMsg.style.display = 'block';
            }
        });
    }
}