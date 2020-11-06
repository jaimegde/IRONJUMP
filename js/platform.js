class Platform {
    constructor(ctx, posX, posY) {
        this.ctx = ctx;

        this.width = 110;
        this.height = 25;

        this.posX = posX;
        this.posY = posY;
        this.image = new Image();
        this.image.src = 'img/neonplat.png';
    
        
    }
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        //this.ctx.fillStyle = 'aquamarine';
        //this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }


}