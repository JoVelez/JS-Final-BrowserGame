// where sprites and scources are defined
export default class TileMap{
    constructor(tileSize){
        this.tileSize = tileSize;

        this.coin = new Image()
        this.coin.src = "../Images/Collect/coin.png"

        this.floortile1 = new Image()
        this.floortile1.src = "../Images/DungeonTile/floortile1.png"
    }
    
    // draws sprites to canvas
    map = [
        [1,1,1]
        [1,0,1]
        [1,1,1]
];
    
    draw(ctx) {}
}