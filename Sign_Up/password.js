document.addEventListener('DOMContentLoaded', () => {
    const input2 = document.getElementById('input-2');
    const input3 = document.getElementById('input-3');
    const confirmBtn = document.getElementById('confirm-btn');

    // Deshabilitar el botón inicialmente
    confirmBtn.classList.add('is-disabled');

    function checkInputs() {
        if (input2.value && input3.value && input2.value === input3.value) {
            confirmBtn.classList.remove('is-disabled');
        } else {
            confirmBtn.classList.add('is-disabled');
        }
    }

    input2.addEventListener('input', checkInputs);
    input3.addEventListener('input', checkInputs);
});