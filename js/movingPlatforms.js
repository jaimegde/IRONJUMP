class movingPlatform {
    constructor(ctx, posX, posY, canvasWidth) {
        this.ctx = ctx;

        this.width = 80;
        this.height = 20;

        this.posX = posX;
        this.posY = posY;
        this.vel = 3
        this.canvasWidth = canvasWidth
        this.good = true
    }
    draw() {
        this.move()
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        
    }
    move() {
        if (this.posX >= this.canvasWidth-this.width) {
            this.vel *= -1
        }
        if(this.posX <= 0) {
            this.vel *=-1
        }
        this.posX += this.vel
    }


}