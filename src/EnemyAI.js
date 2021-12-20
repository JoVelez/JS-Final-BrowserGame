import TileMap from "./Sprites.js";
import MovingDirection from "./MovementControls.js";

// enemy class
export default class Enemy {
 constructor(x,y,tileSize,velocity,tileMap){
     this.x = x;
     this.y = y;
     this.tileSize = tileSize;
     this.velocity = velocity;
     this.tileMap = tileMap;

    // loads enemy images
     this.#loadImages();

     // randomizes enemy movement
     this.movingDirection = Math.floor(
       Math.random() * Object.keys(MovingDirection).length
     );
 
     this.directionTimerDefault = this.#random(1, 3);
     this.directionTimer = this.directionTimerDefault;

     // power-up timer
     this.meatAboutToExpireTimerDefault = 10;
     this.meatAboutToExpireTimer = this.meatAboutToExpireTimerDefault;
 }

draw(ctx, pause, player){ 

  // Stops enemy from moving when paused
  if(!pause){
    this.#move();
    this.#changeDirection();
  }
    this.#setImage(ctx,player);
}

// Checks if enemy touches player
collideWith(player) {
  const size = this.tileSize / 2;
  if 
  ( this.x < player.x + size &&
    this.x + size > player.x &&
    this.y < player.y + size &&
    this.y + size > player.y ) 
  {
    return true;
  } else {
    return false;
  }
}
    
// sets image when power-up is active
#setImage(ctx, player){
  if (player.meatActive) {
  this.#setImageWhenMeatActive(player);
  } else {
  this.image = this.slime;
}
  ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
};

#setImageWhenMeatActive(player){
  this.image = this.purpleslime;
    if(player.meatAboutToExpire){
  this.meatAboutToExpireTimer--;
    if(this.meatAboutToExpireTimer === 0 ) {
  this.meatAboutToExpireTimer = this.meatAboutToExpireTimerDefault;
    }
  }
}

// Changes enemy direction
#changeDirection() {
  this.directionTimer--;
  let newMoveDirection = null;
if (this.directionTimer == 0) {
  this.directionTimer = this.directionTimerDefault;
  newMoveDirection = Math.floor( Math.random() * Object.keys(MovingDirection).length);
}
    
if (newMoveDirection != null && this.movingDirection != newMoveDirection) {
  if (
    Number.isInteger(this.x / this.tileSize) &&
    Number.isInteger(this.y / this.tileSize)
    ) { if (
          !this.tileMap.didCollideWithEnvironment(
           this.x,
           this.y,
           newMoveDirection
            )
          ) {
              this.movingDirection = newMoveDirection;
            }
    }
  }
}
    
// enemy movement
#move() {
  if (
      !this.tileMap.didCollideWithEnvironment(
      this.x,
      this.y,
      this.movingDirection
      )
    ) {
        switch (this.movingDirection) {
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

//  Randomizes movement
#random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemy images
#loadImages(){

  this.slime = new Image();
  this.slime.src = '../Images/Enemy/slime1.png';

  this.purpleslime = new Image();
  this.purpleslime.src = '../Images/Enemy/purpleslime1.png';

  this.image = this.slime;

  }
}