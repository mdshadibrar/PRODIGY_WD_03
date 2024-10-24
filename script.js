// script.js

const board = Array(9).fill(null); // Track the state of the board
let currentPlayer = 'X'; // Starting player
let gameActive = true; // Track if the game is still active

// Winning combinations
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle click on a cell
function handleClick(cellIndex) {
  if (!board[cellIndex] && gameActive) {
    board[cellIndex] = currentPlayer;
    document.getElementById(`cell-${cellIndex}`).innerText = currentPlayer;
    if (checkWin()) {
      setTimeout(() => alert(`${currentPlayer} wins!`), 100);
      gameActive = false;
    } else if (board.every(cell => cell)) {
      setTimeout(() => alert("It's a tie!"), 100);
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch turns
    }
  }
}

// Check for a winning combination
function checkWin() {
  return winPatterns.some(pattern => 
    board[pattern[0]] &&
    board[pattern[0]] === board[pattern[1]] &&
    board[pattern[0]] === board[pattern[2]]
  );
}

// Reset the game
function resetGame() {
  board.fill(null);
  document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
  currentPlayer = 'X';
  gameActive = true;
}

// Attach event listeners to cells
document.querySelectorAll('.cell').forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(index));
});

// Reset button functionality
document.getElementById('resetButton').addEventListener('click', resetGame);
