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
    background: undefined,
    keys: {
        space: ' '
    },
    interval: undefined,
    interval2: undefined,
    difficulty: 5,
    homepage: undefined,
    letsBegin: false,
    gameover: undefined,
    isdead: false,
    onredbull: false,
    powers: [],
    intervalScore : 0,

    init(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d')
        this.setDimensions()
        document.onkeypress = e => {
            if (e.key === this.keys.space) {
                this.letsBegin = true
            }
        }
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
        !this.letsBegin ? this.homePage() : null
        this.generatePlatform()
        this.generatePlayer()
        this.interval = setInterval(() => {
            if (!this.letsBegin) {
                this.homepage.draw()
            }
            else {
                this.intervalScore++
                this.clearScreen()
                this.drawAll()
                this.scoreFloor % 20 === 0 ? this.generateRedbull() : null
                this.moveScreen()
                this.movePlatforms(this.platYchange)
                this.isCollision()
                this.playerFall() ? this.gameOver() : null
            }
        }, 30)
    },
    drawAll() {
        this.platforms.forEach(elm => {
            elm.draw()
        });
        this.powers.forEach(elm => {
            elm.draw()
        });
        this.player.draw()
        this.drawText()
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
    
    moveScreen() {
        if (this.player.playerPos.y < this.canvasSize.h / 2 + 100) {
            this.platYchange = 4.5
            this.player.playerVel.y += 0.25
            this.score++
            this.scoreFloor = (Math.floor(this.score / 10) * 10)
        } else {
            this.platYchange = 0
        }
    },
    movePlatforms(platYvel) {
        this.platforms.forEach(elm => {
            elm.posY += platYvel;
            if (elm.posY > this.canvasSize.h) {
                this.platforms.pop()
                let newPlatPosX = Math.floor(Math.random() * 350)
                let randomPlat = Math.floor(Math.random() * this.difficulty)
                if (randomPlat === 3 && this.scoreFloor > 150) {
                    let newPlat = new movingPlatform(this.ctx, newPlatPosX, 50, this.canvasSize.w)
                    this.platforms.unshift(newPlat)
                } else {
                    let newPlat = new Platform(this.ctx, newPlatPosX, 50)
                    this.platforms.unshift(newPlat)
                }
                if (randomPlat === 4 && this.scoreFloor > 300) {
                    
                    let newPlat = new Enemy(this.ctx, newPlatPosX, -25, this.canvasSize.w)
                    this.platforms.unshift(newPlat)
                }
                
            }
        })
    },
    generateRedbull() {
        if (!this.powers.length) {
            let newPower = new Powerup(this.ctx, this.canvasSize.w)
            this.powers.unshift(newPower)
        } else if (this.powers.length)
            this.powers.forEach(elm => {
                elm.posY += this.platYchange;
                if (elm.posY > this.canvasSize.h) {
                    this.powers.pop()
                }
            })    
    },
    generatePlayer() {
        let playerStartingX = this.platforms[this.platforms.length - 1].posX;
        let playerStartingY = this.platforms[this.platforms.length - 1].posY - 100;
        this.player = new Player(this.ctx, playerStartingX, playerStartingY, this.canvasSize.w, 'img/boiLeft.png', this.isdead)
    },
    isCollision() {
        this.platforms.forEach(elm => {
            if (!this.isdead && //saltando en las plataformas
                this.player.playerPos.x < elm.posX + elm.width &&
                this.player.playerPos.x + this.player.playerSize.w > elm.posX &&
                this.player.playerPos.y + this.player.playerSize.h < elm.posY + elm.height &&
                this.player.playerPos.y + this.player.playerSize.h > elm.posY &&
                this.player.playerVel.y > 0 && elm.good && !this.onredbull
            ) {
                this.player.playerVel.y = -10;
            } else if (( //golpeando enemigos
                this.player.playerPos.x < elm.posX + elm.width &&
                this.player.playerPos.x + this.player.playerSize.w > elm.posX &&
                this.player.playerPos.y + this.player.playerSize.h < elm.posY + elm.height &&
                this.player.playerPos.y + this.player.playerSize.h > elm.posY &&
                !elm.good && !this.isdead) ||
                (this.player.playerPos.x < elm.posX + elm.width &&
                    this.player.playerPos.x + this.player.playerSize.w > elm.posX &&
                    this.player.playerPos.y <= elm.posY + elm.height &&
                    this.player.playerPos.y >= elm.posY &&
                    !elm.good && !this.isdead && !this.onredbull)) {
                this.player.isdead = true
                this.isdead = true
                this.player.image.src = 'img/deadBoi.png'
            }
        })
        this.powers.forEach(elm => {
            if (( //pillando redbulls
                this.player.playerPos.x < elm.posX + elm.width &&
                this.player.playerPos.x + this.player.playerSize.w > elm.posX &&
                this.player.playerPos.y + this.player.playerSize.h < elm.posY + elm.height &&
                this.player.playerPos.y + this.player.playerSize.h > elm.posY &&
                elm.redbull && !this.isdead) ||
                (this.player.playerPos.x < elm.posX + elm.width &&
                    this.player.playerPos.x + this.player.playerSize.w > elm.posX &&
                    this.player.playerPos.y <= elm.posY + elm.height &&
                    this.player.playerPos.y >= elm.posY &&
                    elm.redbull && !this.isdead && !this.onredbull)) {
                this.onredbull = true
                this.redbullFly()
                console.log('redbull')
            }
        })
        
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    redbullFly() {
        let platformCounter = 0 
        while (platformCounter <= 200) {
            this.movePlatforms(2)
            platformCounter++
        }
        
        this.onredbull = false
        
        
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
        this.ctx.fillStyle = "aqua";
        this.ctx.fillText(`Score: ${this.scoreFloor}`, 20, 28)
        this.ctx.fillText(`Highscore: ${this.highScore}`, this.canvasSize.w-185, 28)
    },
    gameOver() {
        if (this.highScore < this.scoreFloor) {
            this.highScore = this.scoreFloor
        }
        this.gameOverScreen()
        
        document.onkeypress = e => {
            if (e.key === this.keys.space) {
                clearInterval(this.interval)
                this.clearScreen()
                this.start()
            } 
        }
    },
    homePage() {
        this.homepage = new titlePage(this.ctx, this.canvasSize.w, this.canvasSize.h)
        this.homepage.drawText()
    },
    
    restart() { 
        this.platforms = []
        this.enemies = []
        this.player = undefined
        this.score = 0
        this.scoreFloor = 0
        this.isdead = false
        this.onredbull = false
    },
    gameOverScreen() {
        this.gameover = new gameOverScreen(this.ctx, this.canvasSize.w, this.canvasSize.h, this.scoreFloor, this.highScore)
    },
}