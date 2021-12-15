import TileMap from "./Sprites.js";

// sprite size
const tileSize = 16;
const canvas = document.getElementById("gameCanvas");
// returns a drawing context on the canvas
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);

// redraws screen every 'x' times 1 second
function game(){
tileMap.draw(ctx);

}

// the amount of times screen is redrawn per second
setInterval(game, 1000 / 75);