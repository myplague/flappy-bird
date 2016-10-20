function Bird(x, y) {
    this.x = x;
    this.y = y;
    this.velY = 0;
    this.gravity = 1;
    this.sprites = [document.getElementById("bird1"), document.getElementById("bird2"), document.getElementById("bird3")];
    this.currentSprite = 0;
    this.updates = 0;
    this.angle = 0;
    this.spriteWidth = 90;
    this.spriteHeight = 64;
    this.initControls();
}



Bird.prototype.update = function() {
    this.updates++;
    this.angle = this.velY*Math.PI/100
    if (this.updates % 18 === 0)
        this.currentSprite = (this.currentSprite + 1) % this.sprites.length;
    this.velY += this.gravity;
    this.y += this.velY;
};
Bird.prototype.render = function(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.sprites[this.currentSprite],
    -this.spriteWidth/2, -this.spriteHeight/2, this.spriteWidth, this.spriteHeight);
    ctx.restore();

}
Bird.prototype.initControls = function() {
    window.addEventListener("keydown", (e) => {
        // console.log(e.keyCode);
        if (e.keyCode === 32) {
            this.velY = -17;
        }
    });
    window.addEventListener("touchstart", e => {
        this.velY = -17;
    })
}

Bird.prototype.detectCollision = function(pipes){
  pipes.forEach((pipe,index)=>{
    let  collisionDetected = false;
    if (pipe.y < 10){
      let a = this.x + this.spriteWidth/2;
      let b = this.y + this.spriteHeight/2;
      let x0 = pipe.x;
      let y0 = pipe.y + pipe.height;
      let x1 = pipe.x + pipe.width;
      if(a>x0&&a<x1&&b<y0) collisionDetected = true
    }
    else {
      let a = this.x + this.spriteWidth/2;
      let b = this.y + this.spriteHeight/2;
      let x0 = pipe.x;
      let x1 = pipe.x + pipe.width;
      let y1 = pipe.y;
      if(a>x0&&a<x1&&b>y1) collisionDetected = true
    }
    if (collisionDetected){
      this.dead = true;
    }
  });
}


export default Bird;
