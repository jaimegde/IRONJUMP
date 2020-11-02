const Game = {
    canvas: undefined,
    ctx: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    numOfPlatforms: 6,
    platforms: [],
    platYchange: 0,
    score: 0,
    scoreFloor: 0,
    highScore: 0,
    keys: {
        space: ' '
    },
    interval: undefined,
    difficulty: 5,
    enemies: [],

    init(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d')
        this.setDimensions()
        
        
        this.start()
    },
    setDimensions() {
        this.canvasSize.w = 500
        this.canvasSize.h = window.innerHeight
        this.canvas.setAttribute('width', this.canvasSize.w)
        this.canvas.setAttribute('height', this.canvasSize.h)
    },
    
    start() {
        this.restart()
        this.generatePlatform()
        this.generateEnemy() 
        this.generatePlayer()
        this.interval = setInterval(() => {
            this.clearScreen()
            this.drawAll()
            this.moveScreen()
            this.movePlatforms()
            this.isCollision()
            this.playerFall() ? this.gameOver() : null
        }, 30)
    },
    drawAll() {
        this.platforms.forEach(elm => {
            elm.draw()
        });
        this.enemies.forEach(elm => {
            elm.draw()
        });
        this.player.draw()
        this.drawText()
    },
    gameOverPhase(){
        document.onkeypress = e => {
            if (e.key === this.keys.space) {
                return true
            } 
        }
        return false
    },
    generatePlatform() {
        for (let i = 0; i < this.numOfPlatforms; i++) {
                let newPlatPosX = Math.floor(Math.random() * 350)
                let platGap = (this.canvasSize.h - 25) / this.numOfPlatforms;
                let newPlatPosY = (i + 1) * platGap;
                let plat = new Platform(this.ctx, newPlatPosX, newPlatPosY)
                this.platforms.push(plat)
            }
    },
    generateEnemy() {
        let newPlatPosX = Math.floor(Math.random() * 350)
        let plat = new Enemy(this.ctx, newPlatPosX, 200, this.canvasSize.w)
        this.enemies.push(plat)
    },
    moveScreen() {
        if (this.player.playerPos.y < this.canvasSize.h /2 +50) {
            this.platYchange = 4
            this.player.playerVel.y += 0.25
            this.score++
            this.scoreFloor = (Math.floor(this.score / 10) * 10)
        } else {
            this.platYchange = 0
        }
    },
    movePlatforms() {
        this.platforms.forEach(elm => {
            elm.posY += this.platYchange;
            if (elm.posY > this.canvasSize.h) {
                this.platforms.pop()
                let newPlatPosX = Math.floor(Math.random() * 350)
                let randomWhitePlat = Math.floor(Math.random()*this.difficulty)
                if (randomWhitePlat === 3 && this.scoreFloor > 150) {
                    let newPlat = new movingPlatform(this.ctx, newPlatPosX, 25, this.canvasSize.w)
                    this.platforms.unshift(newPlat)
                }else {
                    let newPlat = new Platform(this.ctx, newPlatPosX, 25)
                    this.platforms.unshift(newPlat)
                }
            }
        })
        this.enemies.forEach(elm => {
            elm.posY += this.platYchange;
            if (elm.posY > this.canvasSize.h) {
                this.enemies.pop()
                let newPlatPosX = Math.floor(Math.random() * 350)
                let randomWhitePlat = Math.floor(Math.random()*this.difficulty)
                if (randomWhitePlat === 4 ) {
                    let newPlat = new Enemy(this.ctx, newPlatPosX, 40, this.canvasSize.w)
                    this.enemies.unshift(newPlat)
                }
                
            }
        })
    },
    generatePlayer() {
        let playerStartingX = this.platforms[this.platforms.length - 1].posX;
        let playerStartingY = this.platforms[this.platforms.length - 1].posY - 50;
        this.player = new Player(this.ctx, playerStartingX, playerStartingY, this.canvasSize.w)
    },
    isCollision() {
        this.platforms.forEach(elm => {
            if (
                this.player.playerPos.x < elm.posX + elm.width &&
                this.player.playerPos.x + this.player.playerSize.w > elm.posX &&
                this.player.playerPos.y + this.player.playerSize.w < elm.posY + elm.height &&
                this.player.playerPos.y + this.player.playerSize.w > elm.posY &&
                this.player.playerVel.y > 0
    ) {
      this.player.playerVel.y = -10;
    }
    })
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    playerFall() {
        if (this.player.playerPos.y > this.canvasSize.h) {
            return true
        } else {
            return false
        }

    },
    drawText() {
        this.ctx.font = "25px Sans-serif"  
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Score: ${this.scoreFloor}`, 20, 28)
        this.ctx.fillText(`Highscore: ${this.highScore}`, this.canvasSize.w-185, 28)
    },
    gameOver() {
        
        if (this.highScore < this.scoreFloor) {
            this.highScore = this.scoreFloor
        }
        clearInterval(this.interval)
        this.clearScreen()
        this.gameOverScreen()
        this.score = 0
        document.onkeypress = e => {
            if (e.key === this.keys.space) {
                this.start()
            } 
        }
    },
    restart() { 
        this.platforms = []
        this.enemies = []
        this.player = undefined
    },
    gameOverScreen() {
        this.ctx.font = "30px Sans-serif" 
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Score: ${this.scoreFloor}`, 100, 220)
        this.ctx.fillText(`Highscore: ${this.highScore}`, 100, 300)
        this.ctx.fillText('To start again press SPACE', 60, this.canvasSize.h / 2)
        this.ctx.font = "50px Sans-serif" 
        this.ctx.fillText('GAME OVER', 100, 100)
    },
}