class Platform {
    constructor(ctx, posX, posY) {
        this.ctx = ctx;

        this.width = 80;
        this.height = 20;

        this.posX = posX;
        this.posY = posY;
        this.good = true
        
    }
    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }


}