const rutaImagenesJSON = "../json/imgs.json";
const fondoPorDefecto = "../img/fondo/fondo.jpg";

let imagenesFondo = [];

async function cargarImagenes() {
    try {
        const response = await fetch(rutaImagenesJSON);
        if (!response.ok) throw new Error("No se pudo cargar el JSON");
        imagenesFondo = await response.json();
        await preCargarImagenes(imagenesFondo);
        cambiarFondo();
    } catch (error) {
        console.error("Error al cargar imágenes desde JSON:", error);
        document.getElementById("body").style.backgroundImage = `url(${fondoPorDefecto})`;
    }
}

async function preCargarImagenes(urls) {
    const preloadedImages = urls.map(url => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(url);
            img.onerror = () => resolve(null); 
        });
    });
    await Promise.all(preloadedImages);
}

function cambiarFondo() {
    try {
        if (imagenesFondo.length === 0) {
            document.getElementById("body").style.backgroundImage = `url(${fondoPorDefecto})`;
            return;
        }

        const imagenSeleccionada = imagenesFondo[Math.floor(Math.random() * imagenesFondo.length)];

        const img = new Image();
        img.src = imagenSeleccionada;

        img.onload = function() {
            document.getElementById("body").style.backgroundImage = `url(${imagenSeleccionada})`;
        };

        img.onerror = function() {
            document.getElementById("body").style.backgroundImage = `url(${fondoPorDefecto})`;
        };
    } catch (error) {
        console.error("Error al cambiar el fondo:", error);
        document.getElementById("body").style.backgroundImage = `url(${fondoPorDefecto})`;
    }
}

cargarImagenes();
