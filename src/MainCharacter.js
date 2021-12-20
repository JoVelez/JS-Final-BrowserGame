import MovingDirection from "./MovementControls.js";

export default class Player {
constructor( x, y, tileSize, velocity, tileMap ){
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;

    this.playerAnimationTimerDefault = 10;
    this.playerAnimationTimer = null;

  this.coinEffect = new Audio("../GameSound/coin.wav")
  this.meatEffect = new Audio("../GameSound/powerup.wav")
  this.slimeDeath = new Audio("../GameSound/slimedefeat.ogg")

  this.timers = [];
    this.madeFirstMove = false;

    document.addEventListener("keydown", this.#keydown);

    

    this.#loadPlayerImage();
}

draw(ctx, pause, enemies){
  if (!pause){
    this.#move();
    this.#animate();
  }
    this.#grabCoin();
    this.#eatMeat();
    this.#slaySlime(enemies);

    ctx.drawImage(
        this.playerWalk[this.playerImageIndex],
        this.x,
        this.y,
        this.tileSize,
        this.tileSize
        );
}

#loadPlayerImage(){
  const playerWalk1 = new Image();
  playerWalk1.src = "../Images/Player/walk1.png"

  const playerWalk2 = new Image();
  playerWalk2.src = "../Images/Player/walk2.png"

  const playerWalk3 = new Image();
  playerWalk3.src = "../Images/Player/walk3.png"

  const playerWalk4 = new Image();
  playerWalk4.src = "../Images/Player/walk4.png"


  this.playerWalk = [
    playerWalk1,
    playerWalk2,
    playerWalk3,
    playerWalk4,
    ];

  this.playerImageIndex = 0;

 }

 #keydown = (event) => {
    //up
    if (event.keyCode == 38) {
      if (this.currentMovingDirection == MovingDirection.down)
        this.currentMovingDirection = MovingDirection.up;
        this.requestedMovingDirection = MovingDirection.up;
     this.madeFirstMove = true;
    }
    //down
    if (event.keyCode == 40) {
      if (this.currentMovingDirection == MovingDirection.up)
        this.currentMovingDirection = MovingDirection.down;
        this.requestedMovingDirection = MovingDirection.down;
    this.madeFirstMove = true;
    }
    //left
    if (event.keyCode == 37) {
      if (this.currentMovingDirection == MovingDirection.right)
        this.currentMovingDirection = MovingDirection.left;
        this.requestedMovingDirection = MovingDirection.left;
    this.madeFirstMove = true;
    }
    //right
    if (event.keyCode == 39) {
      if (this.currentMovingDirection == MovingDirection.left)
        this.currentMovingDirection = MovingDirection.right;
        this.requestedMovingDirection = MovingDirection.right;
    this.madeFirstMove = true;
    }
  };

#move() {
  if (this.currentMovingDirection !== this.requestedMovingDirection) {
    if (
      Number.isInteger(this.x / this.tileSize) &&
      Number.isInteger(this.y / this.tileSize)
      ) {
      if (
        !this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.requestedMovingDirection
        )
      )
        this.currentMovingDirection = this.requestedMovingDirection;
  }
}

if(
  this.tileMap.didCollideWithEnvironment( 
  this.x,
  this.y,
  this.currentMovingDirection
  )
) 
{
  return;
}
  else if(this.currentMovingDirection != null && this.playerAnimationTimer == null){
  this.playerAnimationTimer = this.playerAnimationTimerDefault;
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

#animate() {
  if (this.playerAnimationTimer == null) {
    return;
  }
  this.playerAnimationTimer--;
  if (this.playerAnimationTimer == 0) {
      this.playerAnimationTimer = this.playernimationTimerDefault;
      this.playerImageIndex++;
  if (this.playerImageIndex == this.playerWalk.length)
      this.playerImageIndex = 0;
  }
}
  
#grabCoin() {
  if (this.tileMap.grabCoin(this.x, this.y) && this.madeFirstMove) {
      this.coinEffect.play();
  }
}

#eatMeat(){
  if (this.tileMap.eatMeat(this.x, this.y)) {
      this.meatEffect.play();
      this.meatActive = true;
      this.meatAboutToExpire = false;
      this.timers.forEach((timer) => clearTimeout(timer));
      this.timers = [];

  let meatTimer = setTimeout(() => {
      this.meatActive = false;
      this.meatAboutToExpire = false;
    }, 1000 * 6);

      this.timers.push(meatTimer);

  let meatAboutToExpireTimer = setTimeout(() => {
      this.meatAboutToExpire = true;
    }, 1000 * 3);

      this.timers.push(meatAboutToExpireTimer);
  }
}

#slaySlime(enemies) {
  if (this.meatActive) {
    const collideEnemies = enemies.filter((enemy) => enemy.collideWith(this));
    collideEnemies.forEach((enemy) => {
    enemies.splice(enemies.indexOf(enemy), 1);
    this.slimeDeath.play();
    });
  }
 }
}

