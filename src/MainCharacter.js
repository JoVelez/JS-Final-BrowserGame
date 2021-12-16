import TileMap from "./Sprites.js";

export default class Player {
constructor(x,y,tileSize,velocity,tileMap){
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;
    this.#loadPlayer();
}
draw(ctx){
    ctx.drawImage(this.PlayerWalk[this.playerWalkIndex],this.x,this.y,this.tileSize,this.tileSize)
}

    #loadPlayer(){
        const playerWalk1 = new Image();
        playerWalk1.src = "../Images/Player/walk1.png"

        const playerWalk2 = new Image();
        playerWalk2.src = "../Images/Player/walk2.png"

        const playerWalk3 = new Image();
        playerWalk3.src = "../Images/Player/walk3.png"

        const playerWalk4 = new Image();
        playerWalk4.src = "../Images/Player/walk4.png"

        const playerWalk5 = new Image();
        playerWalk5.src = "../Images/Player/walk1.png"

        this.PlayerWalk = [
            playerWalk1,
            playerWalk2,
            playerWalk3,
            playerWalk4,
            playerWalk5,
        ];

        this.playerWalkIndex = 0;
 }

}
