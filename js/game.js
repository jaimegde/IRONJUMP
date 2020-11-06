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
    gameOverSoundCounter: 0,
    interval: undefined,
    interval2: undefined,
    difficulty: 6,
    homepage: undefined,
    letsBegin: false,
    gameover: undefined,
    isdead: false,
    onredbull: false,
    powers: [],
    coins: [],
    enemies:[],
    intervalScore: 0,
    sounds: {
        oof: undefined,
        rbalas: undefined,
        boing: undefined,
        background: undefined,
        salsota: undefined,
        party: undefined,
        fuegote: undefined,
        allright: undefined
    },

    init(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d')
        this.setDimensions()
        this.loadMusic()
        this.start()  
    },
    setDimensions() {
        this.canvasSize.w = 500
        this.canvasSize.h = 937
        this.canvas.setAttribute('width', this.canvasSize.w)
        this.canvas.setAttribute('height', this.canvasSize.h)
    },
    loadMusic() {
        this.sounds.oof = new Audio("sounds/oof.mp3")
        this.sounds.rbalas = new Audio("sounds/rbalas.mp3")
        this.sounds.boing = new Audio("sounds/boing.mp3")
        this.sounds.background = new Audio("sounds/tronlong.mp3")
        this.sounds.salsota = new Audio("sounds/salsota.mp3")
        this.sounds.party = new Audio("sounds/party.mp3")
        this.sounds.fuegote = new Audio("sounds/fuegote.mp3")
        this.sounds.allright = new Audio("sounds/allright.mp3")
    },
    start() {
         document.onkeypress = e => {
             if (e.key === this.keys.space) {
                document.getElementById("start").style.display = "none";
                document.getElementById("canvas").style.display = "block";
                if (!this.letsBegin) {
                    this.letsBegin = true
                    this.sounds.party.play()
                }
            }
         }
        this.generatePlatform()
        this.generatePlayer()
        this.sounds.party.play()
        this.interval = setInterval(() => {
                if (this.onredbull && this.intervalScore<=2) {
                    this.intervalScore += (this.intervalScore + 1) / 100
                    this.moveScreenOnRedbull()
                    this.moveElements()
                } else { 
                    this.onredbull = false
                    this.intervalScore = 0
                    this.moveScreen()
                    this.moveElements()
                }
                this.sounds.background.play()
                this.clearScreen()
                this.drawAll()
                if (this.scoreFloor > 300 && Math.floor(Math.random() * 7) === 3) {
                    this.generateEnemies()
                }
                if (this.scoreFloor%450 === 0 && this.scoreFloor && Math.floor(Math.random() * 2) === 1) {
                    this.generateRedbull()
                }
                if (this.scoreFloor%125 === 0 && this.scoreFloor && Math.floor(Math.random() * 2) === 0) {
                    this.generateToken()
                }
                this.isCollision()
                this.playerFall() ? this.gameOver() : null
        }, 30)
    },
    drawAll() {
        this.platforms.forEach(elm => {
            elm.draw()
        });
        this.coins.forEach(elm => {
            elm.draw()
        });
        this.powers.forEach(elm => {
            elm.draw()
        });
        this.enemies.forEach(elm => {
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
            this.platYchange = 4.85
            this.player.playerVel.y += 0.25
            this.score++
            this.scoreFloor = (Math.floor(this.score / 10) * 10)
        } else {
            this.platYchange = 0
        }
    },
    moveScreenOnRedbull() { 
            this.platYchange = 9
        if (this.player.playerVel.y < 0) {
            this.player.playerVel.y -= 0.11
        }
            else {
            this.player.playerVel.y -= 3
            //this.player.playerVel.y -= 0.075
            }
            this.score +=3 
            this.scoreFloor = (Math.floor(this.score / 10) * 10)
         
    },
    moveElements() {
        this.platforms.forEach(elm => {
            elm.posY += this.platYchange;
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
            }
        })
        this.coins.forEach(elm => {
            elm.posY += this.platYchange;
            if (elm.posY > this.canvasSize.h) {
                this.coins.pop()
            }
        })
        this.enemies.forEach(elm => {
            elm.posY += this.platYchange;
            if (elm.posY > this.canvasSize.h) {
                this.enemies.pop()
            }
        })
        this.powers.forEach(elm => {
            elm.posY += this.platYchange;
            if (elm.posY > this.canvasSize.h) {
                this.powers.pop()
            }
        }) 
    },
    generateEnemies() {
        let randomX = Math.floor((Math.random() * this.canvasSize.w/1.5))
        if (!this.enemies.length) {
            let newenemy = new Enemy(this.ctx, randomX+51, 0,this.canvasSize.w)
            this.enemies.unshift(newenemy)
        } 
    },
    generateRedbull() {
        if (!this.powers.length) {
            let newPower = new Powerup(this.ctx, this.canvasSize.w-40)
            this.powers.unshift(newPower)
        }   
    },
    generateToken() {
        if (!this.coins.length) {
            let newToken = new Token(this.ctx, this.canvasSize.w-40)
            this.coins.unshift(newToken)
        } else if (this.coins.length)
            this.coins.forEach(elm => {
                elm.posY += this.platYchange;
                if (elm.posY > this.canvasSize.h) {
                    this.coins.pop()
                }
            })
    },
    generatePlayer() {
        let playerStartingX = this.platforms[this.platforms.length - 1].posX;
        let playerStartingY = this.platforms[this.platforms.length - 1].posY - 100;
        this.player = new Player(this.ctx, playerStartingX, playerStartingY, this.canvasSize.w, this.isdead)
    },
    isCollision() {
        this.platforms.forEach(elm => {
            if (!this.isdead && //saltando en las plataformas
                this.player.playerPos.x < elm.posX + elm.width &&
                this.player.playerPos.x + this.player.playerSize.w > elm.posX &&
                this.player.playerPos.y + this.player.playerSize.h < elm.posY + elm.height &&
                this.player.playerPos.y + this.player.playerSize.h > elm.posY &&
                this.player.playerVel.y > 0 && !this.onredbull
            ) {
                //this.sounds.boing.play()
                this.player.playerVel.y = -10;
                }
            })
            this.enemies.forEach(elm => {
                if (( //golpeando enemigos
                    this.player.playerPos.x < elm.posX + elm.width &&
                    this.player.playerPos.x + this.player.playerSize.w > elm.posX &&
                    this.player.playerPos.y + this.player.playerSize.h < elm.posY + elm.height &&
                    this.player.playerPos.y + this.player.playerSize.h > elm.posY &&
                    !this.isdead && !this.onredbull) ||
                    (this.player.playerPos.x < elm.posX + elm.width &&
                        this.player.playerPos.x + this.player.playerSize.w > elm.posX &&
                        this.player.playerPos.y <= elm.posY + elm.height &&
                        this.player.playerPos.y >= elm.posY &&
                         !this.isdead && !this.onredbull))
                {
                    this.sounds.oof.play()
                    this.player.isdead = true
                    this.isdead = true
                    this.player.playerImageInstance.src = 'img/deadBoi.png'
                    this.player.playerVel.y += 10
                }
            })
            
            this.powers.forEach(elm => {
                if (( //pillando redbulls
                    this.player.playerPos.x < elm.posX + elm.width &&
                    this.player.playerPos.x + this.player.playerSize.w > elm.posX &&
                    this.player.playerPos.y + this.player.playerSize.h < elm.posY + elm.height &&
                    this.player.playerPos.y + this.player.playerSize.h > elm.posY &&
                    elm.redbull && !this.isdead && !this.onredbull) ||
                    (this.player.playerPos.x < elm.posX + elm.width &&
                        this.player.playerPos.x + this.player.playerSize.w > elm.posX &&
                        this.player.playerPos.y <= elm.posY + elm.height &&
                        this.player.playerPos.y >= elm.posY &&
                        elm.redbull && !this.isdead && !this.onredbull)) {
                    this.sounds.rbalas.play()
                    this.onredbull = true
                    this.powers.pop()
                
                }
            })
            this.coins.forEach(elm => {
                if (( //pillando monedas
                    this.player.playerPos.x < elm.posX + elm.width &&
                    this.player.playerPos.x + this.player.playerSize.w > elm.posX &&
                    this.player.playerPos.y + this.player.playerSize.h < elm.posY + elm.height &&
                    this.player.playerPos.y + this.player.playerSize.h > elm.posY &&
                    !this.isdead) ||
                    (this.player.playerPos.x < elm.posX + elm.width &&
                        this.player.playerPos.x + this.player.playerSize.w > elm.posX &&
                        this.player.playerPos.y <= elm.posY + elm.height &&
                        this.player.playerPos.y >= elm.posY &&
                        !this.isdead)) {
                    this.sounds.salsota.play()
                    this.coins.pop()
                    this.score += 50
                
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
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Score: ${this.scoreFloor}`, 20, 28)
        this.ctx.fillText(`Highscore: ${this.highScore}`, this.canvasSize.w-185, 28)
    },
    gameOver() {
        
        document.querySelector(".score span").innerText = this.scoreFloor
        if (this.highScore < this.scoreFloor) {
            this.highScore = this.scoreFloor
            document.querySelector(".highscore span").innerText = this.highScore
            if (this.gameOverSoundCounter === 0) {
                this.sounds.fuegote.play()
                this.gameOverSoundCounter++
            }
        }
        if (this.gameOverSoundCounter === 0) {
                this.sounds.allright.play()
                this.gameOverSoundCounter++
        }
        this.gameOverScreen()
        this.letsBegin = false
        document.onkeypress = e => {
            if (e.key === this.keys.space) {
                this.restart()
                clearInterval(this.interval)
                this.clearScreen()
                this.letsBegin = true
                this.start()
            } 
        }
    },
    restart() { 
        this.platforms = []
        this.enemies = []
        this.coins = []
        this.powers = []
        this.player = undefined
        this.score = 0
        this.scoreFloor = 0
        this.isdead = false
        this.onredbull = false
        this.gameOverSoundCounter = 0
        document.getElementById("gameover").style.display = "none";
        document.getElementById("canvas").style.display = "block";
    },
    gameOverScreen() {
        
        document.getElementById("gameover").style.display = "block";
        document.getElementById("canvas").style.display = "none";

    },
}