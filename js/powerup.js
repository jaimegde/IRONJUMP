class Powerup {
    constructor(ctx, canvasWidth) {
        this.ctx = ctx;

        this.width = 20;
        this.height = 35;
        this.canvasWidth = canvasWidth
        this.posX = Math.floor(Math.random()*this.canvasWidth);
        this.posY = 0;
        this.vel = 5.25
        this.redbull = true
        this.image = new Image();
        this.image.src = 'img/redbull.png';
    }

    draw() {
        this.move()
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        
    }

    move() {
        this.posY += this.vel
    }

    
}