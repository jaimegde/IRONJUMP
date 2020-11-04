class titlePage {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx;

        this.width = 300;
        this.height = 100;

        this.posX = 100;
        this.posY = 100;
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.image = new Image();
        this.image.src = 'img/ironjump.png';
        this.imageVirus = new Image();
        this.imageVirus.src = 'img/viru1s.png'
        this.imageArrowLeft = new Image();
        this.imageArrowLeft.src = 'img/arrowkeyLeft.jpg'
        this.imageArrowRight = new Image();
        this.imageArrowRight.src = 'img/arrowkeyRight.jpg'
        this.imageSpace = new Image();
        this.imageSpace.src = 'img/neonplat.png'
        this.imageSpaceText = new Image();
        this.imageSpaceText.src = 'img/spaceText.png'
    }
    draw() {
        this.ctx.drawImage(this.image, this.posX, 200, this.width, this.height);
        this.ctx.drawImage(this.imageSpace, this.posX+60, 455, 200, 50);
        this.ctx.drawImage(this.imageSpaceText, this.posX+60,455, 200, 50);
        this.ctx.drawImage(this.imageVirus, this.posX - 50, this.posY * 7, this.width / 4, this.height / 1.5);
        this.ctx.drawImage(this.imageArrowLeft, this.posX-25, this.posY * 6, this.width / 6, this.height / 3);
        this.ctx.drawImage(this.imageArrowRight, this.posX+285 , this.posY * 6, this.width / 6, this.height / 3);
        


        
    }
    drawText() {
        this.ctx.fillStyle = "aqua";
        this.ctx.font = "30px Sans-serif";
        this.ctx.fillText('To start press', 100+65, 420);
        this.ctx.font = "72px Sans-serif";
        this.ctx.fillText('🏆', this.posX -60, this.posY * 8.5 + 20);
        this.ctx.font = "26px Sans-serif";
        this.ctx.fillText('Your goal is to score ', this.posX + this.width / 4, this.posY * 8.5 - 20);
        this.ctx.fillText('the MAXIMUM points! ', this.posX + this.width / 4, this.posY * 8.5 + 20);
        this.ctx.fillText('BEWARE of the VIRUS!', this.posX + this.width / 4, this.posY * 7 + 20);
        this.ctx.fillText('AVOID at ALL COSTS', this.posX + this.width / 4, this.posY * 7 + 65);
        this.ctx.fillText('MOVE with the', this.posX + this.width / 4, this.posY * 6 + 20);
        this.ctx.fillText('ARROW KEYS', this.posX + this.width / 4, this.posY * 6 + 55);
    }
        
}