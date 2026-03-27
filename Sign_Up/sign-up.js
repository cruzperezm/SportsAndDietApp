// =========================================================
// LÓGICA ESPECÍFICA DE LA PÁGINA DE SIGN UP
// =========================================================

function inyectarSignUp(data) {
    // 1. Inyectar Avatar
    const avatar = document.getElementById('signup-avatar');
    if (avatar) {
        avatar.src = data.avatar.src;
        avatar.alt = data.avatar.alt;
    }

    // 2. Inyectar Inputs
    const inputsContainer = document.getElementById('signup-inputs-container');
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

    // 3. Inyectar Botones
    const btnsContainer = document.getElementById('signup-buttons-container');
    if (btnsContainer) {
        btnsContainer.innerHTML = '';
        data.buttons.forEach(btn => {
            if (btn.type === 'submit') {
                btnsContainer.innerHTML += `
                    <button type="submit" class="wire-btn" style="border:none; font-family:inherit; font-size:inherit; font-weight:bold; background-color: #d9d9d9;">
                        ${btn.text}
                    </button>
                `;
            } else {
                btnsContainer.innerHTML += `<a href="${btn.link}" class="wire-btn">${btn.text}</a>`;
            }
        });
    }

    // 4. Inyectar Textos y Enlaces
    const prefix = document.getElementById('signup-prefix');
    if (prefix) prefix.textContent = data.links.prefix;

    const loginLink = document.getElementById('signup-login-link');
    if (loginLink) {
        loginLink.textContent = data.links.loginText;
        loginLink.href = data.links.loginLink;
    }

    const forgotText = document.getElementById('signup-forgot-text');
    if (forgotText) forgotText.textContent = data.links.forgotText;

    // 5. Inyectar Redes Sociales
    const socialContainer = document.getElementById('signup-social-container');
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

    // 6. LÓGICA DE CREACIÓN DE USUARIO (Base de Datos Local)
    const signupForm = document.getElementById('signup-form');
    const msg = document.getElementById('signup-message');

    if (signupForm) {
        signupForm.addEventListener('submit', function(evento) {
            evento.preventDefault();

            // Recogemos los datos introducidos
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            // Simulamos consulta a la Base de Datos (leemos de localStorage)
            let usuariosGuardados = JSON.parse(localStorage.getItem('db_usuarios_sports')) || [];

            // Comprobamos si el usuario ya existe
            const existeUsuario = usuariosGuardados.find(u => u.username === username);

            if (existeUsuario) {
                // Error: Ya existe
                msg.textContent = 'Este nombre de usuario ya está registrado.';
                msg.className = 'msg-error';
                msg.style.display = 'block';
            } else {
                // Éxito: Guardamos el nuevo usuario
                usuariosGuardados.push({ username: username, password: password, email: email });
                localStorage.setItem('db_usuarios_sports', JSON.stringify(usuariosGuardados));

                msg.textContent = '¡Registro exitoso! Redirigiendo al Log In...';
                msg.className = 'msg-success';
                msg.style.display = 'block';

                // Esperamos 1.5 segundos para que lea el mensaje y redirigimos
                const submitBtnData = data.buttons.find(b => b.type === 'submit');
                setTimeout(() => {
                    window.location.href = submitBtnData.link;
                }, 1500);
            }
        });
    }
}