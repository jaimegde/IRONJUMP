class Enemy {
    constructor(ctx, posX, posY, canvasWidth) {
        this.ctx = ctx;

        this.width = 50;
        this.height = 50;

        this.posX = posX;
        this.posY = posY;
        this.vel = 5
        this.canvasWidth = canvasWidth
        this.image = new Image();
        this.image.src = 'img/Viru1s.png';
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