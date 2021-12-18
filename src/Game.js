import TileMap from './Sprites.js';

const tileSize = 38;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);
const player = tileMap.getPlayer(velocity);
const enemies = tileMap.getEnemies(velocity);

function gameLoop(){
tileMap.draw(ctx);-
player.draw(ctx);
enemies.forEach(enemy=>enemy.draw(ctx, pause()));
}

function pause() {
    return !player.madeFirstMove;
  }

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);