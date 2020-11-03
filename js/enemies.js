class Enemy {
    constructor(ctx, posX, posY, canvasWidth) {
        this.ctx = ctx;

        this.width = 45;
        this.height = 35;

        this.posX = posX;
        this.posY = posY;
        this.vel = 5
        this.canvasWidth = canvasWidth
        this.good = false
        this.image = new Image();
        this.image.src = 'img/Obj_cube-creature.png';
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