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

    // 3. Inyectar Botones (UNIFICADO)
    const btnsContainer = document.getElementById('signup-buttons-container');
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

    // =========================================================
    // --- NUEVA LÓGICA DE VALIDACIÓN VISUAL DE CAMPOS ---
    // =========================================================

    const inputs = document.querySelectorAll('.input-field input');

    // Función para validar un input individual
    function validarInput(input) {
        const id = input.id;
        const valor = input.value.trim();
        let esValido = false;

        // Limpiar clases previas
        input.classList.remove('is-valid', 'is-invalid');

        // Solo validamos si hay algo escrito
        if (valor === '') return;

        // Lógica de validación por ID
        if (id === 'signup-username') {
            // Nombre de usuario: Al menos 3 caracteres
            esValido = valor.length >= 3;
        } else if (id === 'signup-email') {
            // Correo electrónico: Expresión regular básica
            const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            esValido = reEmail.test(valor);
        } else if (id === 'signup-password') {
            // Contraseña: Mínimo 8 caracteres, al menos 1 mayúscula y 1 número
            const rePassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            esValido = rePassword.test(valor);

            // Si la contraseña principal cambia, forzamos la validación de la repetida
            const repeatInput = document.getElementById('signup-password-repeat');
            if (repeatInput && repeatInput.value !== '') {
                // Al quitar y poner la clase forzamos a que se vuelva a evaluar visualmente abajo
                if(repeatInput.value === valor) {
                    repeatInput.classList.remove('is-invalid');
                    repeatInput.classList.add('is-valid');
                } else {
                    repeatInput.classList.remove('is-valid');
                    repeatInput.classList.add('is-invalid');
                }
            }
        } else if (id === 'signup-password-repeat') {
            // Repetir contraseña: Debe ser exactamente igual a la primera
            const originalPassword = document.getElementById('signup-password').value;
            esValido = (valor === originalPassword && valor !== '');
        }

        // Aplicar la clase correspondiente al input actual
        if (esValido) {
            input.classList.add('is-valid'); // Borde Verde
        } else {
            input.classList.add('is-invalid'); // Borde Rojo
        }
    }

    // Escuchar el evento 'input' para validar mientras se escribe
    inputs.forEach(input => {
        input.addEventListener('input', () => validarInput(input));
    });


    // 6. LÓGICA DE CREACIÓN DE USUARIO (Base de Datos Local)
    const signupForm = document.getElementById('signup-form');
    const msg = document.getElementById('signup-message');

    if (signupForm) {
        signupForm.addEventListener('submit', function(evento) {
            evento.preventDefault();

            // Recogemos los datos introducidos
            const usernameInput = document.getElementById('signup-username');
            const emailInput = document.getElementById('signup-email');
            const passwordInput = document.getElementById('signup-password');

            const username = usernameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;

            // Validación final antes de guardar: Todos los campos deben ser válidos visualmente
            const todosValidos = [...inputs].every(input => input.classList.contains('is-valid'));

            if (!todosValidos) {
                // Forzamos la validación de todos los campos para que se pongan en rojo los que faltan
                inputs.forEach(input => validarInput(input));

                // Añadimos un mensaje más explicativo por si es la contraseña lo que falla
                msg.innerHTML = 'Por favor, rellena todos los campos correctamente.<br><small style="color:#555;">La contraseña requiere min 8 caracteres, 1 mayúscula y 1 número.</small>';
                msg.className = 'msg-error';
                msg.style.display = 'block';
                return; // Detiene el registro
            }

            // Simulamos consulta a la Base de Datos (leemos de localStorage)
            let usuariosGuardados = JSON.parse(localStorage.getItem('db_usuarios_sports')) || [];

            // Comprobamos si el usuario ya existe
            const existeUsuario = usuariosGuardados.find(u => u.username === username);

            if (existeUsuario) {
                // Error: Ya existe
                msg.textContent = 'Este nombre de usuario ya está registrado.';
                msg.className = 'msg-error';
                msg.style.display = 'block';
                usernameInput.classList.remove('is-valid');
                usernameInput.classList.add('is-invalid');
            } else {
                // Éxito: Guardamos el nuevo usuario
                usuariosGuardados.push({ username: username, password: password, email: email });
                localStorage.setItem('db_usuarios_sports', JSON.stringify(usuariosGuardados));

                msg.textContent = '¡Registro exitoso! Redirigiendo...';
                msg.className = 'msg-success';
                msg.style.display = 'block';

                // Redirigimos
                const submitBtnData = data.buttons.find(b => b.type === 'submit');
                setTimeout(() => {
                    window.location.href = submitBtnData.link;
                }, 1500);
            }
        });
    }
}