class Token {
    constructor(ctx, canvasWidth) {
        this.ctx = ctx;

        this.width = 35;
        this.height = 35;
        this.canvasWidth = canvasWidth
        this.posX = Math.floor(Math.random()*this.canvasWidth);
        this.posY = 0;
        this.image = new Image();
        this.image.src = 'img/ironhackLogo.png';
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }


    
}