const rutaImagenesJSON = "../json/imgs.json";
const fondoPorDefecto = "../img/fondo/fondo.jpg";

let imagenesFondo = [];

async function cargarImagenes() {
    try {
        const response = await fetch(rutaImagenesJSON);
        if (!response.ok) throw new Error("No se pudo cargar el JSON");
        imagenesFondo = await response.json();

        // Forzar el uso de "1.png"
        const imagenSeleccionada = "https://github.com/BryanGuevara/Inicio/raw/main/img/fondos/1.jpg";
        // Pre-cargar la imagen y establecer el fondo
        await preCargarImagen(imagenSeleccionada);
        document.getElementById("body").style.backgroundImage = `url(${imagenSeleccionada})`;
    } catch (error) {
        console.error("Error al cargar imágenes desde JSON:", error);
        document.getElementById("body").style.backgroundImage = `url(${fondoPorDefecto})`;
    }
}

async function preCargarImagen(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = () => reject(new Error(`No se pudo cargar la imagen: ${url}`));
    });
}

cargarImagenes();
