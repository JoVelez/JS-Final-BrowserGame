import MovingDirection from "./MovementControls.js";

export default class Player {
constructor(x,y,tileSize,velocity,tileMap){
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;

    document.addEventListener("keydown", this.#keydown);

    this.#loadPlayer();
}

draw(ctx){
    this.#move();
    ctx.drawImage(
        this.PlayerWalk[this.playerWalkIndex],
        this.x,
        this.y,
        this.tileSize,
        this.tileSize
        );
}
// make this a gif, theres way too much here
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

 #keydown = (event) => {
    //up
    if (event.keyCode == 38) {
      if (this.currentMovingDirection == MovingDirection.down)
        this.currentMovingDirection = MovingDirection.up;
      this.requestedMovingDirection = MovingDirection.up;
     // this.madeFirstMove = true;
    }
    //down
    if (event.keyCode == 40) {
      if (this.currentMovingDirection == MovingDirection.up)
        this.currentMovingDirection = MovingDirection.down;
      this.requestedMovingDirection = MovingDirection.down;
    //  this.madeFirstMove = true;
    }
    //left
    if (event.keyCode == 37) {
      if (this.currentMovingDirection == MovingDirection.right)
        this.currentMovingDirection = MovingDirection.left;
      this.requestedMovingDirection = MovingDirection.left;
    //  this.madeFirstMove = true;
    }
    //right
    if (event.keyCode == 39) {
      if (this.currentMovingDirection == MovingDirection.left)
        this.currentMovingDirection = MovingDirection.right;
      this.requestedMovingDirection = MovingDirection.right;
    //  this.madeFirstMove = true;
    }
  };

  #move() {
    if (this.currentMovingDirection !== this.requestedMovingDirection) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) 
      {
          this.currentMovingDirection = this.requestedMovingDirection;
      }
    }
        switch (this.currentMovingDirection) {
            case MovingDirection.up:
              this.y -= this.velocity;
              break;
            case MovingDirection.down:
              this.y += this.velocity;
              break;
            case MovingDirection.left:
              this.x -= this.velocity;
              break;
            case MovingDirection.right:
              this.x += this.velocity;
              break;
     }
  }
}
