import TileMap from './Sprites.js';

const tileSize = 38;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);
const player = tileMap.getPlayer(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;
const gameOverSound = new Audio("../GameSound/lose.mp3");
const gameWinSound = new Audio("../GameSound/win.mp3");

function gameLoop(){
tileMap.draw(ctx);-
player.draw(ctx, pause());
enemies.forEach(enemy=>enemy.draw(ctx, pause(), player));
checkGameOver();
checkGameWin();
}

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
  
  function isGameOver() {
    return enemies.some(
      (enemy) => !player.meatActive && enemy.collideWith(player)
    );
  }

function pause() {
    return !player.madeFirstMove || gameOver || gameWin;
  }
  

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);