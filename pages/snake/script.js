document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const gameOverMessage = document.getElementById('game-over-message');
    const gridSize = 20;
    const snakeSpeed = 150;
    let snake = [];
    let food = { x: 15, y: 15 };
    let direction = 'right';
    let gameInterval;

    function createGrid() {
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = `${x}-${y}`;
                gameArea.appendChild(cell);
            }
        }

        document.querySelectorAll('.cell').forEach(cell => {
            cell.style.width = `${400 / gridSize}px`;
            cell.style.height = `${400 / gridSize}px`;
        });
    }


    function draw() {
        document.querySelectorAll('.snake').forEach((segment) => segment.classList.remove('snake', 'head'));

        snake.forEach((segment, index) => {
            const snakeSegment = document.getElementById(`${segment.x}-${segment.y}`);
            snakeSegment.classList.add('snake');
            if (index === 0) {
                snakeSegment.classList.add('head');
            }
        });

        const foodCell = document.getElementById(`${food.x}-${food.y}`);
        foodCell.classList.add('food');
    }


    function moveSnake() {
        const head = { ...snake[0] };
    
        switch (direction) {
            case 'up':
            case 'w':
                head.y = (head.y - 1 + gridSize) % gridSize; 
                break;
            case 'down':
            case 's':
                head.y = (head.y + 1) % gridSize; 
                break;
            case 'left':
            case 'a':
                head.x = (head.x - 1 + gridSize) % gridSize; 
                break;
            case 'right':
            case 'd':
                head.x = (head.x + 1) % gridSize; 
                break;
        }
    
        if (head.x === food.x && head.y === food.y) {
            snake.unshift({ ...food });
            const foodCell = document.getElementById(`${food.x}-${food.y}`);
            foodCell.classList.remove('food');
            generateFood();
        } else {
            snake.unshift(head);
            snake.pop();
        }
    }
    
    

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
        };

        if (snake.some((segment) => segment.x === food.x && segment.y === food.y)) {
            generateFood();
        }
    }

    function changeDirection(e) {
        const key = e.key.toLowerCase(); 
    
        if (['ArrowUp', 'w'].includes(key) && direction !== 'down') direction = 'up';
        else if (['ArrowDown', 's'].includes(key) && direction !== 'up') direction = 'down';
        else if (['ArrowLeft', 'a'].includes(key) && direction !== 'right') direction = 'left';
        else if (['ArrowRight', 'd'].includes(key) && direction !== 'left') direction = 'right';
        else if (key === ' ') { 
            if (gameInterval) {
                pauseGame();
            } else {
                resumeGame();
            }
        }
    }

    function checkCollision() {
        const head = snake[0];
        if (
            head.x < 0 ||
            head.x >= gridSize ||
            head.y < 0 ||
            head.y >= gridSize ||
            snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
            clearInterval(gameInterval);
            showGameOver();
        }
    }

    function gameLoop() {
        moveSnake();
        draw();
        checkCollision();
    }

    function startGame() {
        snake = [{ x: 10, y: 10 }];
        direction = 'right';
        gameOverMessage.style.display = 'none'; 
        gameArea.innerHTML = ''; 
        createGrid();
        draw();
        if (gameInterval) {
            clearInterval(gameInterval);
        }
        gameInterval = setInterval(gameLoop, snakeSpeed);
        document.addEventListener('keydown', changeDirection);
        startButton.textContent = 'Restart'; 
    }
    
    function restartGame() {
        startGame(); 
    }
    

    function pauseGame() {
        clearInterval(gameInterval);
        document.removeEventListener('keydown', changeDirection);
    }

    function resumeGame() {
        gameInterval = setInterval(gameLoop, snakeSpeed);
        document.addEventListener('keydown', changeDirection);
    }

    function showGameOver() {
        gameOverMessage.style.display = 'block'; 
        startButton.disabled = false; 
        restartButton.disabled = true; 
    }

    startButton.addEventListener('click', startGame);

    restartButton.addEventListener('click', restartGame);

});
