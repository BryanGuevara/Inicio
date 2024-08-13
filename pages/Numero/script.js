let num = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let startTime = Date.now(); 

function checkGuess() {
    const guessInput = document.getElementById('guess');
    const feedback = document.getElementById('feedback');
    const attemptsDisplay = document.getElementById('attempts');
    const timeDisplay = document.getElementById('time');
    const guess = parseInt(guessInput.value);

    attempts++;
    
    if (isNaN(guess)) {
        feedback.textContent = 'Error, solo se admiten números.';
        feedback.style.color = 'red';
        return;
    }

    if (guess < num) {
        feedback.textContent = 'No, el número en el que pienso es más alto.';
        feedback.style.color = 'black';
        timeDisplay.style.display = 'none'; 
    } else if (guess > num) {
        feedback.textContent = 'No, el número en el que pienso es más bajo.';
        feedback.style.color = 'black';
        timeDisplay.style.display = 'none'; 
    } else {
        const endTime = Date.now(); 
        const timeTaken = ((endTime - startTime) / 1000).toFixed(2); 
        feedback.textContent = `¡Felicidades! Era el ${num}. Usaste ${attempts} intentos.`;
        feedback.style.color = 'green';
        timeDisplay.textContent = `Tiempo tardado: ${timeTaken} segundos.`;
        timeDisplay.style.display = 'block';
        
        attemptsDisplay.textContent = '';
        
        num = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        guessInput.value = '';
        startTime = Date.now(); 
        return;
    }

    attemptsDisplay.textContent = `Número de intentos: ${attempts}`;
}
