class gameOverScreen {
    constructor(ctx, canvasWidth, canvasHeight, score, highScore) {
        this.ctx = ctx;

        this.width = 300;
        this.height = 100;

        this.posX = 100;
        this.posY = 100;
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.score = score
        this.highScore = highScore
        this.image = new Image();
        this.image.src = 'img/gameover.png';
        this.imageSpace = new Image();
        this.imageSpace.src = 'img/neonplat.png'
        this.imageSpaceText = new Image();
        this.imageSpaceText.src = 'img/spaceText.png'
        this.init()
    }
    init(){
        this.draw()
        this.drawText()
        this.clearText()
    }
    draw() {
        this.ctx.drawImage(this.image, this.posX, 200, this.width, this.height);
        this.ctx.drawImage(this.imageSpace, this.posX+60, 655, 200, 50);
        this.ctx.drawImage(this.imageSpaceText, this.posX+60,655, 200, 50);
        

    }
    drawText() {
        this.ctx.fillStyle = "aqua";
        this.ctx.font = "30px Sans-serif";
        this.ctx.fillText(`Score: ${this.score}`, 100 + 30 , 420);
        this.ctx.fillText(`High score: ${this.highScore}`, 100 + 30 , 480);       
        this.ctx.fillText('To play again press', 100 + 30 , 620);
    }
    clearText() {
        this.ctx.clearRect(0,0,this.canvasWidth, 75)
    }
        
}