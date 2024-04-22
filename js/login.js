const loginButton = document.getElementById('login');
const codeInput = document.getElementById('code');
const passwordInput = document.getElementById('password');
const errorDiv = document.getElementById('error');

loginButton.addEventListener('click', () => {
    const code = codeInput.value;
    const password = passwordInput.value;

    if (code === '' || password === '') {
        errorDiv.textContent = 'Por favor, ingrese todas las credenciales.';
        return;
    }

    fetch('https://api-parcial.crangarita.repl.co/login',  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorDiv.textContent = 'Credenciales inválidas.';
                codeInput.value = '';
                passwordInput.value = '';
            } else {
                localStorage.setItem('user', JSON.stringify(data));
                window.location.href = 'notas.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorDiv.textContent = 'Error al iniciar sesión. Por favor, inténtelo más tarde.';
        });
});