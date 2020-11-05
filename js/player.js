class Player {
  constructor(ctx, posX, posY, canvasWidth, isdead) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.playerSize = {
      w: 50,
      h: 75,
    };
    this.playerPos = {
      x: posX,
      y: posY,
    };
    this.playerVel = {
      x: 3,
      y: 0.6,
    };
    this.playerImageInstance = undefined;
    this.keys = {
      left: "ArrowLeft",
      right: "ArrowRight",
    };
    this.keyState = {
      keyLeft: false,
      keyRight: false,
    };
    this.isdead = isdead
    this.init();
  }
  init() {
    this.playerImageInstance = new Image();
    this.playerImageInstance.src = "img/boiRight.png";
  }
    draw() {
    this.move();
    this.movePlayer();
      this.ctx.drawImage(
      this.playerImageInstance,
      this.playerPos.x,
      this.playerPos.y,
      this.playerSize.w,
      this.playerSize.h
    );
  }
  move() {
    document.addEventListener("keydown", (e) => {
        if (!this.isdead) {
            switch (e.key) {
                case this.keys.left:
                    this.keyState.keyLeft = true;
                    this.playerImageInstance.src = "img/boiRight.png";
                    break;
                case this.keys.right:
                    this.keyState.keyRight = true;
                    this.playerImageInstance.src = "img/boiLeft.png";
                    break;
            }
        }
    });
    document.addEventListener("keyup", (e) => {
      switch (e.key) {
          case this.keys.left:
              this.keyState.keyLeft = false;
          break;
          case this.keys.right:
              this.keyState.keyRight = false;
          break;
      }
    });
    if (this.playerPos.x < -this.playerSize.w) {
      this.playerPos.x = this.canvasWidth;
    } else if (this.playerPos.x > this.canvasWidth) {
      this.playerPos.x = -this.playerSize.w;
    }
  }
    movePlayer() {
          this.playerVel.y += 0.25;
          this.playerPos.y += this.playerVel.y;
        if (this.keyState.keyLeft ) {
            this.playerPos.x -= this.playerVel.x;
        }
        if (this.keyState.keyRight ) {
            this.playerPos.x += this.playerVel.x;
        }
    }
}