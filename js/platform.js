class Platform {
    constructor(ctx, posX, posY) {
        this.ctx = ctx;

        this.width = 80;
        this.height = 20;

        this.posX = posX;
        this.posY = posY;
        this.good = true
        this.image = new Image();
        this.image.src = 'img/PNG/Environment/ground_snow.png';
    
        
    }
    draw() {
       this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }


}