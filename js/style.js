document.addEventListener('DOMContentLoaded', function() {
    cargarConfiguracion();
});

function cargarConfiguracion() {
    const paginaEstilo = document.getElementById('pagina-estilo');
    if (paginaEstilo) {
        const configuracionGuardada = localStorage.getItem('configuracion');
        if (configuracionGuardada) {
            const configuracion = JSON.parse(configuracionGuardada);
            const estiloSeleccionado = configuracion.estiloSeleccionado;
            paginaEstilo.href = `css/index/${estiloSeleccionado}.css`;
        } else {
            paginaEstilo.href = 'css/index/default.css';
        }
    }
}
