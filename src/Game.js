import TileMap from './Sprites.js';

// Map Size & Player Speed
const tileSize = 24;
const velocity = 1;

// Canvas, map, ctx to draw to canvas, and player
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);
const player = tileMap.getPlayer(velocity);
const enemies = tileMap.getEnemies(velocity);

// Win & Lose 
let gameOver = false;
let gameWin = false;
const gameOverSound = new Audio("./GameSound/lose.mp3");
const gameWinSound = new Audio("./GameSound/win.mp3");

// Main game loop, draws map, player, and enemies to screen
function gameLoop(){
tileMap.draw(ctx);-
drawGameEnd();
player.draw(ctx, pause(), enemies);
enemies.forEach(enemy=>enemy.draw(ctx, pause(), player));
checkGameOver();
checkGameWin();
}

// Checks for win/loss
function checkGameWin() {
    if (!gameWin) {
      gameWin = tileMap.didWin();
      if (gameWin) {
        gameWinSound.play();
      }
    }
  }
  
  function checkGameOver() {
    if (!gameOver) {
      gameOver = isGameOver();
      if (gameOver) {
        gameOverSound.play();
      }
    }
  }
  
  // Ends game if slimes collide w/ player
  function isGameOver() {
    return enemies.some(
      (enemy) => !player.meatActive && enemy.collideWith(player)
    );
  }

  // Stops game until player moves, or after win/loss
function pause() {
    return !player.madeFirstMove || gameOver || gameWin;
  }

  // Displays "You Win" or "You Lose"
  function drawGameEnd() {
    if (gameOver || gameWin) {
      let text = " You Win!";
      if (gameOver) {
        text = "Game Over!";
      }

      ctx.fillStyle = "black";
      ctx.fillRect(0, canvas.height / 2.5, canvas.width, 80);
  
      ctx.font = "60px sans-serif"
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(text, 260, canvas.height / 2);
      
    }
  }

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);
