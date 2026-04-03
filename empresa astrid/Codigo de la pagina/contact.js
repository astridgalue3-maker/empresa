function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo');

    const soloLetras = /^[A-Za-zÀ-ÿ\s]+$/;
    const soloNumeros = /^\d+$/;

    if (!soloLetras.test(nombre)) {
        alert('Nombre inválido: solo letras y espacios.');
        return false;
    }

    if (!soloNumeros.test(telefono)) {
        alert('Teléfono inválido: solo números.');
        return false;
    }

    if (!correo.checkValidity()) {
        alert('Correo inválido.');
        return false;
    }

    alert('Formulario enviado correctamente');
    return false;
}