// =========================================================
// LÓGICA ESPECÍFICA DE LA PÁGINA DE LOG IN
// =========================================================

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

    // 3. Inyectar Botones (UNIFICADO)
    const btnsContainer = document.getElementById('login-buttons-container');
    if (btnsContainer) {
        btnsContainer.innerHTML = '';
        data.buttons.forEach(btn => {
            if (btn.type === 'submit') {
                btnsContainer.innerHTML += `
                    <button type="submit" class="wire-btn solid-btn btn-submit">
                        ${btn.text}
                    </button>
                `;
            } else {
                btnsContainer.innerHTML += `<a href="${btn.link}" class="wire-btn solid-btn">${btn.text}</a>`;
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

    // =========================================================
    // --- LÓGICA DE VALIDACIÓN VISUAL Y DE USUARIO ---
    // =========================================================

    const inputs = document.querySelectorAll('.input-field input');

    // Función para validar visualmente un input individual
    function validarInput(input) {
        const id = input.id;
        const valor = input.value.trim();
        let esValido = false;

        input.classList.remove('is-valid', 'is-invalid');
        if (valor === '') return;

        if (id === 'username') {
            // Nombre de usuario: Al menos 3 caracteres
            esValido = valor.length >= 3;
        } else if (id === 'password') {
            // Contraseña: Mínimo 8 caracteres, al menos 1 mayúscula y 1 número (Igual que Sign Up)
            const rePassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            esValido = rePassword.test(valor);
        }

        if (esValido) {
            input.classList.add('is-valid');
        } else {
            input.classList.add('is-invalid');
        }
    }

    // Escuchar el evento 'input' para validar mientras se escribe
    inputs.forEach(input => {
        input.addEventListener('input', () => validarInput(input));
    });

    // 6. LÓGICA DE SUBMIT DEL FORMULARIO
    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('login-error');

    if (loginForm) {
        loginForm.addEventListener('submit', function(evento) {
            evento.preventDefault();

            // Primero: Validamos que ambos campos cumplan con el formato correcto
            const todosValidos = [...inputs].every(input => input.classList.contains('is-valid'));

            if (!todosValidos) {
                // Forzamos a que se pongan rojos los que están mal
                inputs.forEach(input => validarInput(input));
                errorMsg.innerHTML = 'Por favor, rellena los campos correctamente.<br><small style="color:#555;">La contraseña requiere min 8 caracteres, 1 mayúscula y 1 número.</small>';
                errorMsg.className = 'msg-error';
                errorMsg.style.display = 'block';
                return; // Detiene el intento de inicio de sesión
            }

            // Segundo: Si el formato es correcto, buscamos el usuario en la BD
            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;

            let usuariosLocales = JSON.parse(localStorage.getItem('db_usuarios_sports')) || [];
            let todosLosUsuarios = [...data.users, ...usuariosLocales];

            const usuarioValido = todosLosUsuarios.find(u => u.username === usernameInput && u.password === passwordInput);

            if (usuarioValido) {
                // Éxito: Guardamos la sesión
                errorMsg.textContent = '¡Inicio de sesión correcto! Redirigiendo...';
                errorMsg.className = 'msg-success';
                errorMsg.style.display = 'block';
                sessionStorage.setItem('usuarioAutenticado', usuarioValido.username);

                // Redirigimos al Dashboard con un ligero delay para que se lea el mensaje verde
                const submitBtnData = data.buttons.find(b => b.type === 'submit');
                setTimeout(() => {
                    window.location.href = submitBtnData.link;
                }, 1000);
            } else {
                // Falla: No coincide la contraseña o no existe
                errorMsg.textContent = 'Nombre de usuario o contraseña incorrectos, o usuario no registrado.';
                errorMsg.className = 'msg-error';
                errorMsg.style.display = 'block';
            }
        });
    }
}