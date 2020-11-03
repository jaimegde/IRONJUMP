class Player{
    constructor(ctx, posX, posY, canvasWidth) {
        this.ctx = ctx
        this.canvasWidth = canvasWidth
        this.playerSize = {
            w: 50,
            h: 50
        }
        this.playerPos = {
            x: posX,
            y: posY
        }
        this.playerVel = {
            x: 0.1,
            y: 0.1
        }
        this.playerImageInstance = undefined
        this.keys = {
            left: 'ArrowLeft',
            right: 'ArrowRight'
        }
        this.init()
    }

    init() {
        this.playerImageInstance = new Image()
        this.playerImageInstance.src = 'img/basketball.png'
    }
    draw() {
        this.move()
        this.ctx.drawImage(this.playerImageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
    }

    move() {

        this.playerVel.y += 0.2;
        this.playerPos.y += this.playerVel.y;
        document.addEventListener("keydown", e => {
            switch (e.key) {
                case this.keys.left:
                    this.playerPos.x -= this.playerVel.x
                   /* console.log(`La posición en X: ${this.playerPos.x}
                    La Velocidad en X: ${this.playerVel.x}
                    La Velocidad en Y: ${this.playerVel.y}`)*/
                    break;
                case this.keys.right:
                    this.playerPos.x += this.playerVel.x
                    /*console.log(`La posición en X: ${this.playerPos.x}
                    La Velocidad en X: ${this.playerVel.x}
                    La Velocidad en Y: ${this.playerVel.y}`)*/
                    break;
            }
        });
        if (this.playerPos.x < -this.playerSize.w) {
            this.playerPos.x = this.canvasWidth
        } else if (this.playerPos.x > this.canvasWidth) {
            this.playerPos.x = -this.playerSize.w
        }
    }

}