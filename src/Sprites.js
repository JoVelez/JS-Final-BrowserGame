import Player from './MainCharacter.js'

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
    }

// 0 - coins
// 1 - wall
// 2 - plain floors
// 3 - inner borders
// 4 - character start

    map = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,3,3,3,3,3,0,3,3,3,3,3,0,3,3,3,3,3,0,1],
        [1,0,0,0,3,0,0,0,0,0,3,0,0,0,0,0,3,0,0,0,1],
        [1,1,1,0,3,0,3,0,0,0,3,0,0,0,3,0,3,0,1,1,1],
        [1,1,1,0,0,0,3,0,3,0,3,0,3,0,3,0,0,0,1,1,1],
        [1,1,1,0,3,3,3,0,3,0,0,0,3,0,3,3,3,0,1,1,1],
        [1,1,1,0,3,3,3,0,3,3,3,3,3,0,3,3,3,0,1,1,1],
        [1,0,0,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,0,1],
        [1,0,3,3,3,0,3,0,1,1,2,1,1,0,3,0,3,3,3,0,1],
        [1,0,0,0,3,0,3,0,1,2,2,2,1,0,3,0,3,0,0,0,1],
        [1,1,1,0,3,0,0,0,1,2,2,2,1,0,0,0,3,0,1,1,1],
        [1,1,1,0,3,0,0,0,1,2,2,2,1,0,0,0,3,0,1,1,1],
        [1,1,1,0,3,0,3,0,1,1,1,1,1,0,3,0,3,0,1,1,1],
        [1,1,1,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,1,1,1],
        [1,1,1,0,3,3,3,3,3,0,3,0,3,3,3,3,3,0,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,3,3,3,0,3,0,3,3,3,0,3,0,3,3,3,0,1,1],
        [1,1,0,0,0,3,0,3,0,0,4,0,0,3,0,0,0,3,0,1,1],
        [1,1,0,3,0,3,0,3,0,3,3,3,0,3,0,3,0,3,0,1,1],
        [1,1,0,3,0,0,0,3,0,0,3,0,0,3,0,3,0,0,0,1,1],
        [1,1,0,3,3,3,0,3,3,0,3,0,3,3,0,3,3,3,0,1,1],
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
      }
     }
    }

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

      getPlayer(velocity){
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++){
              let tile = this.map[row][column];
              if(tile === 4){
                this.map[row][column] = 0;
                return new Player(column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize, velocity,this);
            }
           }
          }
         }

    setCanvasSize(canvas) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }
}