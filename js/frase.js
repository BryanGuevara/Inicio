function mostrarFraseAleatoria() {
  fetch('./json/frases.json') 
    .then(response => response.json())
    .then(data => {
      var frases = data;

      if (Array.isArray(frases) && frases.length > 0) {
        var fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
        document.getElementById("frase").innerHTML = fraseAleatoria;
      } else {
        console.error('El array de frases no está definido o está vacío.');
      }
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

document.addEventListener("DOMContentLoaded", function() {
    mostrarFraseAleatoria();
});
