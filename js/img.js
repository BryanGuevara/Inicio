const rutaImagenesJSON = "../json/imgs.json";

let imagenesFondo = [];

async function cargarImagenes() {
    try {
        const response = await fetch(rutaImagenesJSON);
        imagenesFondo = await response.json();

        cambiarFondo();
    } catch (error) {
        console.error("Error al cargar imágenes:", error);
    }
}

function cambiarFondo() {
    try {
        const imagenSeleccionada = imagenesFondo[Math.floor(Math.random() * imagenesFondo.length)];
        document.getElementById("body").style.backgroundImage = `url(${imagenSeleccionada})`;
    } catch (error) {
        console.error("Error al cambiar el fondo:", error);
    }
}

cargarImagenes();