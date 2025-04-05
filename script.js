const board = document.getElementById('board');

for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.addEventListener('click', () => handleClick(cell));
  board.appendChild(cell);
}

let currentPlayer = 'X';

function handleClick(cell) {
  if (cell.textContent !== '') return;
  cell.textContent = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}
