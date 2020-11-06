class movingPlatform {
    constructor(ctx, posX, posY, canvasWidth) {
        this.ctx = ctx;

        this.width = 110;
        this.height = 25;

        this.posX = posX;
        this.posY = posY;
        this.vel = 3
        this.canvasWidth = canvasWidth
        this.image = new Image();
        this.image.src = 'img/neonplat.png';
    }
    draw() {
        this.move()
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        
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