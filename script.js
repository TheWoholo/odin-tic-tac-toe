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

const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
  
    const getBoard = () => board;
  
    const setMark = (index, mark) => {
      if (board[index] === "") {
        board[index] = mark;
        return true;
      }
      return false;
    };
  
    const reset = () => {
      board = ["", "", "", "", "", "", "", "", ""];
    };
  
    return {
      getBoard,
      setMark,
      reset
    };
  })();
  
  const Player = (name, marker) => {
    return { name, marker };
  };

  const GameController = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;
    let gameOver = false;
  
    const playTurn = (index) => {
      if (gameOver) return;
  
      if (Gameboard.setMark(index, currentPlayer.marker)) {
        DisplayController.render();
        if (checkWinner()) {
          gameOver = true;
          DisplayController.displayMessage(`${currentPlayer.name} wins!`);
        } else if (Gameboard.getBoard().every(cell => cell !== "")) {
          gameOver = true;
          DisplayController.displayMessage("It's a tie!");
        } else {
          switchPlayer();
        }
      }
    };
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      DisplayController.displayMessage(`${currentPlayer.name}'s turn`);
    };
  
    const checkWinner = () => {
      const b = Gameboard.getBoard();
      const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];
  
      return winPatterns.some(pattern => {
        const [a, b1, c] = pattern;
        return b[a] && b[a] === b[b1] && b[a] === b[c];
      });
    };
  
    const restart = () => {
      Gameboard.reset();
      currentPlayer = player1;
      gameOver = false;
      DisplayController.render();
      DisplayController.displayMessage(`${currentPlayer.name}'s turn`);
    };
  
    return { playTurn, restart };
  })();
  
  const DisplayController = (() => {
    const boardEl = document.getElementById("board");
    const messageEl = document.getElementById("message");
    const restartBtn = document.getElementById("restart");
  
    const render = () => {
      boardEl.innerHTML = "";
      Gameboard.getBoard().forEach((cell, index) => {
        const cellEl = document.createElement("div");
        cellEl.classList.add("cell");
        cellEl.textContent = cell;
        cellEl.addEventListener("click", () => GameController.playTurn(index));
        boardEl.appendChild(cellEl);
      });
    };
  
    const displayMessage = (msg) => {
      messageEl.textContent = msg;
    };
  
    restartBtn.addEventListener("click", () => {
      GameController.restart();
    });
  
    return { render, displayMessage };
  })();
  


DisplayController.render();
DisplayController.displayMessage("Player 1's turn");
