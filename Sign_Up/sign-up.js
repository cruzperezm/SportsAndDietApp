function inyectarSignUp(data) {
    const avatar = document.getElementById('signup-avatar');
    if (avatar) {
        avatar.src = data.avatar.src;
        avatar.alt = data.avatar.alt;
    }

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

    const prefix = document.getElementById('signup-prefix');
    if (prefix) prefix.textContent = data.links.prefix;

    const loginLink = document.getElementById('signup-login-link');
    if (loginLink) {
        loginLink.textContent = data.links.loginText;
        loginLink.href = data.links.loginLink;
    }

    const forgotText = document.getElementById('signup-forgot-text');
    if (forgotText) forgotText.textContent = data.links.forgotText;

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


    const inputs = document.querySelectorAll('.input-field input');

    function validarInput(input) {
        const id = input.id;
        const valor = input.value.trim();
        let esValido = false;

        input.classList.remove('is-valid', 'is-invalid');

        if (valor === '') return;

        if (id === 'signup-username') {
            esValido = valor.length >= 3;
        } else if (id === 'signup-email') {
            const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            esValido = reEmail.test(valor);
        } else if (id === 'signup-password') {
            const rePassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            esValido = rePassword.test(valor);

            const repeatInput = document.getElementById('signup-password-repeat');
            if (repeatInput && repeatInput.value !== '') {
                if(repeatInput.value === valor) {
                    repeatInput.classList.remove('is-invalid');
                    repeatInput.classList.add('is-valid');
                } else {
                    repeatInput.classList.remove('is-valid');
                    repeatInput.classList.add('is-invalid');
                }
            }
        } else if (id === 'signup-password-repeat') {
            const originalPassword = document.getElementById('signup-password').value;
            esValido = (valor === originalPassword && valor !== '');
        }

        if (esValido) {
            input.classList.add('is-valid');
        } else {
            input.classList.add('is-invalid');
        }
    }

    inputs.forEach(input => {
        input.addEventListener('input', () => validarInput(input));
    });


    const signupForm = document.getElementById('signup-form');
    const msg = document.getElementById('signup-message');

    if (signupForm) {
        signupForm.addEventListener('submit', function(evento) {
            evento.preventDefault();

            const usernameInput = document.getElementById('signup-username');
            const emailInput = document.getElementById('signup-email');
            const passwordInput = document.getElementById('signup-password');

            const username = usernameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;

            const todosValidos = [...inputs].every(input => input.classList.contains('is-valid'));

            if (!todosValidos) {
                inputs.forEach(input => validarInput(input));

                msg.innerHTML = 'Por favor, rellena todos los campos correctamente.<br><small style="color:#555;">La contraseña requiere min 8 caracteres, 1 mayúscula y 1 número.</small>';
                msg.className = 'msg-error';
                msg.style.display = 'block';
                return;
            }

            let usuariosGuardados = JSON.parse(localStorage.getItem('db_usuarios_sports')) || [];

            const existeUsuario = usuariosGuardados.find(u => u.username === username);

            if (existeUsuario) {
                msg.textContent = 'Este nombre de usuario ya está registrado.';
                msg.className = 'msg-error';
                msg.style.display = 'block';
                usernameInput.classList.remove('is-valid');
                usernameInput.classList.add('is-invalid');
            } else {
                usuariosGuardados.push({ username: username, password: password, email: email });
                localStorage.setItem('db_usuarios_sports', JSON.stringify(usuariosGuardados));

                msg.textContent = '¡Registro exitoso! Redirigiendo...';
                msg.className = 'msg-success';
                msg.style.display = 'block';

                const submitBtnData = data.buttons.find(b => b.type === 'submit');
                setTimeout(() => {
                    window.location.href = submitBtnData.link;
                }, 1500);
            }
        });
    }
}