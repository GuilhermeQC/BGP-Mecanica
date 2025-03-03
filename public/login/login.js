const usuario = document.getElementById('user');
const senha = document.getElementById('pass');
const formulario = document.getElementById('form-login');

if (formulario) {
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        if (usuario.value === 'admin' && senha.value === 'admin') {
            window.location.href = '../main/main.html';
        } else {
            alert('Usuário ou senha inválidos');
        }
    });
}