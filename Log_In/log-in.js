function inyectarLogIn(data) {
    const avatar = document.getElementById('login-avatar');
    if (avatar) {
        avatar.src = data.avatar.src;
        avatar.alt = data.avatar.alt;
    }

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

    const prefix = document.getElementById('login-prefix');
    if (prefix) prefix.textContent = data.links.prefix;

    const signupLink = document.getElementById('login-signup-link');
    if (signupLink) {
        signupLink.textContent = data.links.signupText;
        signupLink.href = data.links.signupLink;
    }

    const forgotText = document.getElementById('login-forgot-text');
    if (forgotText) forgotText.textContent = data.links.forgotText;

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

    const inputs = document.querySelectorAll('.input-field input');

    function validarInput(input) {
        const id = input.id;
        const valor = input.value.trim();
        let esValido = false;

        input.classList.remove('is-valid', 'is-invalid');
        if (valor === '') return;

        if (id === 'username') {
            esValido = valor.length >= 3;
        } else if (id === 'password') {
            const rePassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            esValido = rePassword.test(valor);
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

    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('login-error');

    if (loginForm) {
        loginForm.addEventListener('submit', function(evento) {
            evento.preventDefault();

            const todosValidos = [...inputs].every(input => input.classList.contains('is-valid'));

            if (!todosValidos) {
                inputs.forEach(input => validarInput(input));
                errorMsg.innerHTML = 'Por favor, rellena los campos correctamente.<br><small style="color:#555;">La contraseña requiere min 8 caracteres, 1 mayúscula y 1 número.</small>';
                errorMsg.className = 'msg-error';
                errorMsg.style.display = 'block';
                return;
            }

            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;

            let usuariosLocales = JSON.parse(localStorage.getItem('db_usuarios_sports')) || [];
            let todosLosUsuarios = [...data.users, ...usuariosLocales];

            const usuarioValido = todosLosUsuarios.find(u => u.username === usernameInput && u.password === passwordInput);

            if (usuarioValido) {
                errorMsg.textContent = '¡Inicio de sesión correcto! Redirigiendo...';
                errorMsg.className = 'msg-success';
                errorMsg.style.display = 'block';
                sessionStorage.setItem('usuarioAutenticado', usuarioValido.username);

                const submitBtnData = data.buttons.find(b => b.type === 'submit');
                setTimeout(() => {
                    window.location.href = submitBtnData.link;
                }, 1000);
            } else {
                errorMsg.textContent = 'Nombre de usuario o contraseña incorrectos, o usuario no registrado.';
                errorMsg.className = 'msg-error';
                errorMsg.style.display = 'block';
            }
        });
    }
}