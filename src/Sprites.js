import Player from './MainCharacter.js'
import MovingDirection from "./MovementControls.js";
import Enemy from "./EnemyAI.js"

//exports to be used elsewhere
export default class TileMap{
    constructor(tileSize){
        this.tileSize = tileSize;

        this.coin = new Image();
        this.coin.src = '../Images/Collect/tilewithcoin.png';

        this.wall = new Image();
        this.wall.src = '../Images/DungeonTile/walltile1.png';

        this.innerBorder = new Image();
        this.innerBorder.src = '../Images/DungeonTile/plainborder.png';

        this.floor = new Image();
        this.floor.src = '../Images/DungeonTile/floortile2.png';

        this.meat = new Image();
        this.meat.src = '../Images/Collect/tilewithmeat.png';
    }

// 0 - coins
// 1 - wall
// 2 - plain floors
// 3 - inner borders
// 4 - character start
// 5 - slimes
// 6 - potion

    map = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,6,3,3,3,3,3,0,3,3,3,3,3,0,3,3,3,3,3,6,1],
        [1,0,0,0,3,0,0,0,0,0,3,0,0,0,0,0,3,0,0,0,1],
        [1,1,1,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,1,1,1],
        [1,1,1,0,0,0,3,0,3,0,3,0,3,0,3,0,0,0,1,1,1],
        [1,1,1,0,3,3,3,0,3,0,0,0,3,0,3,3,3,0,1,1,1],
        [1,1,1,0,3,3,3,0,3,3,3,3,3,0,3,3,3,0,1,1,1],
        [1,0,0,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,0,1],
        [1,0,3,3,3,0,3,0,1,1,1,1,1,0,3,0,3,3,3,0,1],
        [1,0,0,0,3,0,3,0,2,5,2,5,2,0,3,0,3,0,0,0,1],
        [1,1,1,0,3,0,0,0,1,2,2,2,1,0,0,0,3,0,1,1,1],
        [1,1,1,0,3,0,3,0,2,5,2,5,2,0,3,0,3,0,1,1,1],
        [1,1,1,0,3,0,3,0,1,1,1,1,1,0,3,0,3,0,1,1,1],
        [1,1,1,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,1,1,1],
        [1,1,1,0,3,3,3,3,3,0,3,0,3,3,3,3,3,0,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,3,3,3,0,3,0,3,3,3,0,3,0,3,3,3,0,1,1],
        [1,1,0,0,0,3,0,3,0,0,4,0,0,3,0,0,0,3,0,1,1],
        [1,1,0,3,0,3,0,3,0,3,3,3,0,3,0,3,0,3,0,1,1],
        [1,1,0,3,0,0,0,3,0,0,3,0,0,3,0,3,0,0,0,1,1],
        [1,1,6,3,3,3,0,3,3,0,3,0,3,3,0,3,3,3,6,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        
 ];

 draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if(tile === 1){
           this.#drawWall(ctx, column, row, this.tileSize);
        }  else if (tile === 0) {
            this.#drawCoin(ctx, column, row, this.tileSize);
        }
        else if (tile === 2) {
            this.#drawfloor(ctx, column, row, this.tileSize);
       }
            else if (tile === 3) {
            this.#drawinnerBorder(ctx, column, row, this.tileSize);
       }
       else if (tile === 6) {
        this.#drawmeat(ctx, column, row, this.tileSize);
   }
      }
     }
    }
// make a function?
    #drawWall(ctx, column, row, size) {
        ctx.drawImage(
          this.wall,
          column * this.tileSize,
          row * this.tileSize,
          size,
          size
        );
      }

      #drawCoin(ctx, column, row, size) {
        ctx.drawImage(
          this.coin,
          column * this.tileSize,
          row * this.tileSize,
          size,
          size
        );
      }

      #drawinnerBorder(ctx, column, row, size) {
        ctx.drawImage(
          this.innerBorder,
          column * this.tileSize,
          row * this.tileSize,
          size,
          size
        );
      }

      #drawfloor(ctx, column, row, size) {
        ctx.drawImage(
          this.floor,
          column * this.tileSize,
          row * this.tileSize,
          size,
          size
        );
      }

      #drawmeat(ctx, column, row, size) {
        ctx.drawImage(
          this.meat,
          column * this.tileSize,
          row * this.tileSize,
          size,
          size
        );
      }

      getPlayer(velocity) {
        for (let row = 0; row < this.map.length; row++) {
          for (let column = 0; column < this.map[row].length; column++) {
            let tile = this.map[row][column];
            if (tile === 4) {
              this.map[row][column] = 0;
              return new Player(
                column * this.tileSize,
                row * this.tileSize,
                this.tileSize,
                velocity,
                this
              );
            }
           }
          }
         }

         getEnemies(velocity){
          const enemies = [];

          for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
              let tile = this.map[row][column];
              if (tile === 5) {
                this.map[row][column] = 2;
                enemies.push(new Enemy(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this))
              }
            }
          }
          return enemies;
       }

    setCanvasSize(canvas) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }

    didCollideWithEnvironment(x,y,direction){

    if (
      Number.isInteger(x / this.tileSize) &&
      Number.isInteger(y / this.tileSize)
      ) {
        let column = 0;
        let row = 0;
        let nextColumn = 0;
        let nextRow = 0;
  
        switch (direction) {
          case MovingDirection.right:
            nextColumn = x + this.tileSize;
            column = nextColumn / this.tileSize;
            row = y / this.tileSize;
            break;
          case MovingDirection.left:
            nextColumn = x - this.tileSize;
            column = nextColumn / this.tileSize;
            row = y / this.tileSize;
            break;
          case MovingDirection.up:
            nextRow = y - this.tileSize;
            row = nextRow / this.tileSize;
            column = x / this.tileSize;
            break;
          case MovingDirection.down:
            nextRow = y + this.tileSize;
            row = nextRow / this.tileSize;
            column = x / this.tileSize;
            break;
        }
        const tile = this.map[row][column];
      if ((tile === 1 ) || (tile === 3 )) {
        return true;
      }
    }
    return false;
  }

  grabCoin(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      if (this.map[row][column] === 0) {
        this.map[row][column] = 2;
        return true;
      }
    }
    return false;
  }

  eatMeat(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      const tile = this.map[row][column];
      if (tile === 6) {
        this.map[row][column] = 2;
        return true;
      }
    }
    return false;
  }
}