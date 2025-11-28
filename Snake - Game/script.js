const board = document.querySelector(".board");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");

const blockSize = 50;

let rows = Math.floor(board.clientHeight / blockSize);
let cols = Math.floor(board.clientWidth / blockSize);

board.style.display = "grid";
board.style.gridTemplateColumns = `repeat(${cols}, ${blockSize}px)`;
board.style.gridTemplateRows = `repeat(${rows}, ${blockSize}px)`;

const blocks = {};
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
highScoreEl.textContent = highScore;

let gameLoop = null;
let gameStarted = false;

// Snake initial position
let snake = [
  { x: 5, y: 5 },
  { x: 5, y: 6 },
  { x: 5, y: 7 },
];

let direction = "left";
let food = null;

// Build grid
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${r}-${c}`] = block;
  }
}

// START BUTTON LOGIC
document.getElementById("startBtn").addEventListener("click", () => {
  if (gameStarted) return;

  gameStarted = true;
  document.getElementById("startBtn").style.display = "none";

  generateFood();
  render();

  gameLoop = setInterval(moveSnake, 200);
});

// Place food
function generateFood() {
  let x = Math.floor(Math.random() * rows);
  let y = Math.floor(Math.random() * cols);

  while (snake.some((p) => p.x === x && p.y === y)) {
    x = Math.floor(Math.random() * rows);
    y = Math.floor(Math.random() * cols);
  }

  food = { x, y };
  blocks[`${x}-${y}`].classList.add("food");
}

// Render snake & food
function render() {
  document.querySelectorAll(".fill").forEach((b) => b.classList.remove("fill"));
  document.querySelectorAll(".food").forEach((b) => b.classList.remove("food"));

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });

  blocks[`${food.x}-${food.y}`].classList.add("food");
}

// Move snake
function moveSnake() {
  let head = { ...snake[0] };

  if (direction === "left") head.y--;
  if (direction === "right") head.y++;
  if (direction === "up") head.x--;
  if (direction === "down") head.x++;

  // OUT OF BOUNDS
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    gameOver();
    return;
  }

  // SELF COLLISION
  if (snake.some((s) => s.x === head.x && s.y === head.y)) {
    gameOver();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score;
    generateFood();
  } else {
    snake.pop();
  }

  render();
}

// Game Over Screen
function gameOver() {
  clearInterval(gameLoop);

  if (score > highScore) {
    localStorage.setItem("snakeHighScore", score);
  }

  const over = document.createElement("div");
  over.className = "game-over";
  over.innerHTML = `
      <h1>Game Over</h1>
      <p>Your Score: ${score}</p>
      <button id="restartBtn">Restart</button>
  `;

  document.body.appendChild(over);

  document.getElementById("restartBtn").onclick = () => {
    window.location.reload();
  };
}

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (e.key === "ArrowRight" && direction !== "left") direction = "right";
  if (e.key === "ArrowUp" && direction !== "down") direction = "up";
  if (e.key === "ArrowDown" && direction !== "up") direction = "down";
});
