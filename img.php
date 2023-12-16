<?php

$listaImagenes = [];

// Añadir imágenes .png
$imagenesPNG = [1, 4, 5, 19, 21, 36, 41, 54, 55, 72, 76, 77, 79, 80, 81, 93, 95, 99, 101, 109, 113, 118, 119];
foreach ($imagenesPNG as $numero) {
    $listaImagenes[] = '"img/fondos/' . $numero . '.png"';
}

// Añadir imágenes .jpg
for ($numero = 1; $numero <= 120; $numero++) {
    if (!in_array($numero, $imagenesPNG)) {
        $listaImagenes[] = '"img/fondos/' . $numero . '.jpg"';
    }
}

// Unir la lista con comas y espacios
$listaHTML = implode(', ', $listaImagenes);

// Reemplazar comas y espacios con <br>
$listaHTML = str_replace(', ', '<br>', $listaHTML);

// Mostrar la lista resultante como HTML
echo '[' . $listaHTML . ']';
