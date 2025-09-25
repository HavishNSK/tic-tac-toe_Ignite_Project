// Simple tic-tac-toe game - no over-engineering here
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let scores = { X: 0, O: 0 };

// Cache DOM elements - no need to query them repeatedly
const cells = document.querySelectorAll('.cell');
const playerDisplay = document.getElementById('current-player');
const messageEl = document.getElementById('message');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');

// Winning patterns - just the facts
const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols  
    [0,4,8], [2,4,6]            // diagonals
];

function makeMove(index) {
    if (board[index] || gameOver) return;
    
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());
    
    if (checkWin()) {
        gameOver = true;
        scores[currentPlayer]++;
        updateScore();
        showWin();
    } else if (board.every(cell => cell)) {
        gameOver = true;
        showTie();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updatePlayerDisplay();
    }
}

function checkWin() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // Highlight the winning line
            pattern.forEach(i => cells[i].classList.add('winning'));
            return true;
        }
    }
    return false;
}

function showWin() {
    messageEl.textContent = `Player ${currentPlayer} wins! 🎉`;
    messageEl.className = 'message win';
}

function showTie() {
    messageEl.textContent = "It's a tie! 🤝";
    messageEl.className = 'message tie';
}

function updatePlayerDisplay() {
    playerDisplay.textContent = currentPlayer;
    playerDisplay.style.color = currentPlayer === 'X' ? '#e53e3e' : '#3182ce';
}

function updateScore() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
    
    updatePlayerDisplay();
    messageEl.className = 'message hidden';
}

function newGame() {
    scores = { X: 0, O: 0 };
    updateScore();
    resetBoard();
}

// Event listeners - keep it simple
cells.forEach((cell, i) => {
    cell.addEventListener('click', () => makeMove(i));
});

document.getElementById('reset-btn').addEventListener('click', resetBoard);
document.getElementById('new-game-btn').addEventListener('click', newGame);

// Initialize
updatePlayerDisplay();
