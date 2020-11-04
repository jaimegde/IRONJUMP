class Player{
    constructor(ctx, posX, posY, canvasWidth, imageSrc, isdead) {
        this.ctx = ctx
        this.canvasWidth = canvasWidth
        this.playerSize = {
            w: 50,
            h: 75
        }
        this.playerPos = {
            x: posX,
            y: posY
        }
        this.playerVel = {
            x: 0.1,
            y: 2
        }
        this.image = new Image()
        this.image.src = imageSrc
        this.keys = {
            left: 'ArrowLeft',
            right: 'ArrowRight'
        }
        this.isdead = isdead
        
        //this.init()
    }

    /*init() {
        this.playerImageInstance = 
        this.playerImageInstance.src = imageSrc
    }*/
    draw() {
        this.move()
        this.ctx.drawImage(this.image, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
    }

    move() {

        this.playerVel.y += 0.25;
        this.playerPos.y += this.playerVel.y;
            document.addEventListener("keydown", e => {
                switch (e.key) {
                    case this.keys.left:
                        if (!this.isdead) {
                            this.playerPos.x -= this.playerVel.x
                            this.image.src = 'img/boiRight.png'
                        }
                        break;
                    case this.keys.right:
                        if (!this.isdead) {
                            this.playerPos.x += this.playerVel.x
                            this.image.src = 'img/boiLeft.png'
                        }
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