let BOARD_SIZE = 0;
let NUM_MINES = 0;
let board = [];
let revealedBoard = [];
let remainingCells = 0;
let gameOver = false;
let startTime = null;
let timerInterval = null;
let bomb = '💥';
let casillaClass = 'bomb';
let difficulty;

function setDifficulty() {
    const select = document.getElementById('difficulty-select');
    difficulty = select.value;

    if (difficulty === 'ruleta') {
        BOARD_SIZE = 2;
        NUM_MINES = 1;
        reset();
    }  else if (difficulty === 'unop') {
        BOARD_SIZE = 10;
        NUM_MINES = 99;
        reset();
    } else if (difficulty === 'small1') {
        BOARD_SIZE = 5;
        NUM_MINES = 3;
        reset();
    } else if (difficulty === 'small2') {
        BOARD_SIZE = 5;
        NUM_MINES = 5;
        reset();
    } else if (difficulty === 'small3') {
        BOARD_SIZE = 5;
        NUM_MINES = 10;
        reset();
    } else if (difficulty === 'medium1') {
        BOARD_SIZE = 8;
        NUM_MINES = 4;
        reset();
    } else if (difficulty === 'medium2') {
        BOARD_SIZE = 8;
        NUM_MINES = 8;
        reset();
    } else if (difficulty === 'medium3') {
        BOARD_SIZE = 8;
        NUM_MINES = 16;
        reset();
    } else if (difficulty === 'medium4') {
        BOARD_SIZE = 8;
        NUM_MINES = 32;
        reset();
    } else if (difficulty === 'big1') {
        BOARD_SIZE = 10;
        NUM_MINES = 10;
        reset();
    } else if (difficulty === 'big2') {
        BOARD_SIZE = 10;
        NUM_MINES = 20;
        reset();
    } else if (difficulty === 'big3') {
        BOARD_SIZE = 10;
        NUM_MINES = 50;
        reset();
    } else if (difficulty === 'xl1') {
        BOARD_SIZE = 12;
        NUM_MINES = 12;
        reset();
    } else if (difficulty === 'xl2') {
        BOARD_SIZE = 12;
        NUM_MINES = 24;
        reset();
    } else if (difficulty === 'xl3') {
        BOARD_SIZE = 12;
        NUM_MINES = 72;
        reset();
    }

    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    gameContainer.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 40px)`;

    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement('button');
        cell.classList.add('cell');
        gameContainer.appendChild(cell);
    }
}

function reset(){
    clearInterval(timerInterval);
    const timeElement = document.getElementById('time');
    timeElement.textContent = '0';
    document.getElementById('time').textContent = '0';
    document.getElementById('reset-button').style.display = 'none';
    document.getElementById('start-button').style.display = 'inline-block';

}

function startGame() {
    setDifficulty();
    initializeGame();
}

function initializeGame() {
    board = generateBoard();
    revealedBoard = generateEmptyBoard();
    remainingCells = BOARD_SIZE * BOARD_SIZE - NUM_MINES;
    gameOver = false;
    startTime = null;
    bomb = '💥';
    casillaClass = 'bomb';
    clearInterval(timerInterval);
    const timeElement = document.getElementById('time');
    timeElement.textContent = '0';
    document.getElementById('time').textContent = '0';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('reset-button').style.display = 'inline-block';
    renderBoard();
}

function generateEmptyBoard() {
    return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(false));
}

function generateBoard() {
    const board = generateEmptyBoard();
    let minesPlaced = 0;

    while (minesPlaced < NUM_MINES) {
        const x = Math.floor(Math.random() * BOARD_SIZE);
        const y = Math.floor(Math.random() * BOARD_SIZE);

        if (!board[x][y]) {
            board[x][y] = true;
            minesPlaced++;
        }
    }

    return board;
}

function renderBoard() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {
            const cell = document.createElement('button');
            cell.classList.add('cell');
            if (revealedBoard[x][y]) {
                cell.classList.add('revealed');
                if (board[x][y]) {
                    cell.classList.add(casillaClass);
                    cell.textContent = bomb;
                } else {
                    const adjacentMines = countAdjacentMines(x, y);
                    cell.textContent = adjacentMines > 0 ? adjacentMines : '';
                }
            }
            cell.addEventListener('click', () => revealCell(x, y));
            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                markCell(x, y);
            });
            gameContainer.appendChild(cell);
        }
    }
}

function revealAllBombs() {
    for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {
            if (board[x][y]) {
                revealedBoard[x][y] = true;
            }
        }
    }
}

function countAdjacentMines(x, y) {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newX = x + i;
            const newY = y + j;

            if (newX >= 0 && newX < BOARD_SIZE && newY >= 0 && newY < BOARD_SIZE && board[newX][newY]) {
                count++;
            }
        }
    }

    return count;
}

function revealCell(x, y) {
    if (gameOver || revealedBoard[x][y]) {
        return;
    }

    if (startTime === null) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }
    revealedBoard[x][y] = true;
    remainingCells--;

    if (board[x][y]) {
        gameOver = true;
        clearInterval(timerInterval);
        revealAllBombs();
        updateTimerMessage(false);
        renderBoard();
        return;
    }

    if (remainingCells === 0) {
        gameOver = true;
        clearInterval(timerInterval);
        updateTimerMessage(true);
        renderBoard();
        return;
    }

    const adjacentMines = countAdjacentMines(x, y);

    if (adjacentMines === 0) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newX = x + i;
                const newY = y + j;
                if (newX >= 0 && newX < BOARD_SIZE && newY >= 0 && newY < BOARD_SIZE) {
                    revealCell(newX, newY);
                }
            }
        }
    }
    renderBoard();
}


function markCell(x, y) {
    if (gameOver || revealedBoard[x][y]) {
        return;
    }

    revealedBoard[x][y] = !revealedBoard[x][y];
    renderBoard();
}

function updateTimer() {
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('time').textContent = currentTime;
}

function updateTimerMessage(hasWon) {
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    
    const message = hasWon ? `¡Felicidades! has gando en ${currentTime}` : `Has perdido  Precione Reiniciar para volver a jugar Tiempo transcurrido: ${currentTime}`;
    document.getElementById('time').textContent = message;

    if (hasWon) {
        casillaClass = 'win';
        bomb = '💣';
        revealAllBombs();
        const cells = document.querySelectorAll('.cell');
    }
}

window.onload = function() {
    const select = document.getElementById('difficulty-select');
    select.addEventListener('change', setDifficulty);
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('reset-button').addEventListener('click', initializeGame);
};
