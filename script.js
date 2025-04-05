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
  
  const Player = (name = "Player", marker = "X", score = 0) => {
    return { name, marker, score };
  };
  

  const GameController = (() => {

    let player1=Player();
    let player2=Player();
    let currentPlayer;
    let gameOver = false;

    const reset = () => {
        let name1 = document.getElementById("player1-name").value;
        let name2 = document.getElementById("player2-name").value;
        let score1 = 0;
        let score2 = 0;
        player1 = Player(name1, "X", score1);
        player2 = Player(name2, "O", score2);
        currentPlayer = player1;
        updateScores('reset');
        gameOver = false;
    }

    const updateScores = (result) => {
        if(result==='win')
            currentPlayer.score++;
        DisplayController.updateScoreboard(player1, player2);
    };
  
    const playTurn = (index) => {
      if (gameOver) return;
  
      if (Gameboard.setMark(index, currentPlayer.marker)) {
        DisplayController.render();
        if (checkWinner()) {
          gameOver = true;
          DisplayController.displayMessage(`${currentPlayer.name} wins!`);
          updateScores('win');
        } else if (Gameboard.getBoard().every(cell => cell !== "")) {
          gameOver = true;
          DisplayController.displayMessage("It's a tie!");
          updateScores('tie');
        } else {
          switchPlayer();
        }
      }
    };
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      DisplayController.displayMessage(`${currentPlayer.name}'s turn`);
      console.log(currentPlayer);
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
  
    return { playTurn, restart, reset };
  })();
  
  const DisplayController = (() => {
    const boardEl = document.getElementById("board");
    const messageEl = document.getElementById("message");
    const restartBtn = document.getElementById("restart");
    const startBtn = document.getElementById("start-btn");
    const player1ScoreEl = document.getElementById("player1-score");
    const player2ScoreEl = document.getElementById("player2-score");
  
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

    const updateScoreboard = (player1, player2) => {
        player1ScoreEl.textContent = `${player1.name || "Player 1"}: ${player1.score}`;
        player2ScoreEl.textContent = `${player2.name || "Player 2"}: ${player2.score}`;
      };
  
    restartBtn.addEventListener("click", () => {
      GameController.restart();
    });

    startBtn.addEventListener("click", () => {
      GameController.restart();
      GameController.reset();
    });
  
    return { render, displayMessage, updateScoreboard };
  })();
  


DisplayController.render();
DisplayController.displayMessage("Player 1's turn");
