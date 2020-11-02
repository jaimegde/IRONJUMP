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

    init(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d')
        this.setDimensions()
        this.generatePlatform()
        this.generatePlayer()
        
        this.start()
    },
    setDimensions() {
        this.canvasSize.w = 500
        this.canvasSize.h = window.innerHeight
        this.canvas.setAttribute('width', this.canvasSize.w)
        this.canvas.setAttribute('height', this.canvasSize.h)
    },

    start() {
        setInterval(() => {
            this.clearScreen()
            this.drawAll()
            this.moveScreen()
            this.movePlatforms()
            this.isCollision()
        }, 30)
    },

    drawAll() {
        this.platforms.forEach(elm => {
            elm.draw()
        });
        this.player.draw()
    },
    generatePlatform() {
            for (let i = 0; i < this.numOfPlatforms; i++) {
                let platGap = (this.canvasSize.h - 25) / this.numOfPlatforms;
                let newPlatPosY = (i + 1) * platGap;
                let newPlatPosX = Math.floor(Math.random() * 350)
                let plat = new Platform(this.ctx, newPlatPosX, newPlatPosY)
                this.platforms.push(plat)
            }
        
    },
    moveScreen() {
        if (this.player.playerPos.y < this.canvasSize.h /2) {
            this.platYchange = 3
            this.player.playerVel.y += 0.25
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
                let newPlat = new Platform(this.ctx, newPlatPosX, 25)
                this.platforms.unshift(newPlat)
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
}