function mostrarFraseAleatoria() {
  document.getElementById("frase").innerHTML = 'Cargando Frase...';
  document.getElementById("frase2").innerHTML = '¡Preparando un poco de magia...';
  document.getElementById("frase3").innerHTML = '...';

  fetch('./json/frases.json') 
    .then(response => response.json())
    .then(data => {
      var frases = data.frases;
      var frasesSeguidores = data.frasesSeguidores;

      var todasLasFrases = frases.concat(frasesSeguidores);

      if (Array.isArray(todasLasFrases) && todasLasFrases.length > 0) {
        var fraseAleatoria = todasLasFrases[Math.floor(Math.random() * todasLasFrases.length)];
        document.getElementById("frase").innerHTML = fraseAleatoria;
        document.getElementById("frase2").innerHTML = fraseAleatoria;
        document.getElementById("frase3").innerHTML = fraseAleatoria;
      } 
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

document.addEventListener("DOMContentLoaded", function() {
  mostrarFraseAleatoria();
});
