let currentPlayer = 'X';
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

function placeMarker(row, col) {
  if (board[row][col] === '' && !checkForWinner()) {
    board[row][col] = currentPlayer;
    render();
    if (checkForWinner()) {
      document.getElementById('status').innerText = `¡El jugador ${currentPlayer} ha ganado!`;
      document.getElementById('game').classList.add('disabled');
      highlightWinner();
    } else if (checkForTie()) {
      document.getElementById('status').innerText = '¡Empate!';
      document.getElementById('game').classList.add('tie');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      document.getElementById('status').innerText = `Turno del jugador ${currentPlayer}`;
    }
  }
}

function highlightWinner() {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
      for (let j = 0; j < 3; j++) {
        document.querySelectorAll('.cell')[i * 3 + j].classList.add('winner-cell');
      }
      return;
    }
    if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
      for (let j = 0; j < 3; j++) {
        document.querySelectorAll('.cell')[i + j * 3].classList.add('winner-cell');
      }
      return;
    }
  }
  if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
    for (let i = 0; i < 3; i++) {
      document.querySelectorAll('.cell')[i * 4].classList.add('winner-cell');
    }
    return;
  }
  if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
    for (let i = 0; i < 3; i++) {
      document.querySelectorAll('.cell')[2 + i * 2].classList.add('winner-cell');
    }
    return;
  }
}

function checkForWinner() {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
      return true;
    }
    if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
      return true;
    }
  }
  if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
    return true;
  }
  if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
    return true;
  }
  return false;
}

function checkForTie() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

function resetGame() {
  currentPlayer = 'X';
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('winner-cell');
  });
  document.getElementById('status').innerText = 'Turno del jugador X';
  document.getElementById('game').classList.remove('disabled', 'tie');
  render();
}

function render() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    cell.innerText = board[row][col];
  });
}
