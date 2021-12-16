import TileMap from './Sprites.js';

const tileSize = 40;
const velocity = 1;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);
const player = tileMap.getPlayer(velocity);

function gameLoop(){
tileMap.draw(ctx);
player.draw(ctx);
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);