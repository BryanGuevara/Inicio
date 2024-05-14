document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('styleSelect');
    const guardarBtn = document.getElementById('guardarBtn');

    cargarConfiguracion(select);

    guardarBtn.addEventListener('click', function() {
        guardarConfiguracion(select);
        window.location.href = '../index.html';
    });
});

function cargarConfiguracion(select) {
    const configuracionGuardada = localStorage.getItem('configuracion');
    if (configuracionGuardada) {
        const configuracion = JSON.parse(configuracionGuardada);
        const estiloSeleccionado = configuracion.estiloSeleccionado;
        select.value = estiloSeleccionado;
    }
}

function guardarConfiguracion(select) {
    const estiloSeleccionado = select.value;
    const configuracion = { estiloSeleccionado };
    localStorage.setItem('configuracion', JSON.stringify(configuracion));
}
