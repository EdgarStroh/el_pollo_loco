class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableObject = [];
    errorSound = new Audio('audio/error.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            //Check collision
            this.checkCollisions();
            this.checkCoinCollisions();

        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
                // console.log('characker energy=', this.character.energy);

            }
        });
    }
    checkCoinCollisions() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                this.statusBarCoin.coinAmount++;
                return false; // Entfernt den Coin aus dem Array
            }
            return true; // Behalte den Coin im Array, wenn keine Kollision
        });
    }

    throwBottle() {
        this.errorSound.volume = 0.15;
        if (this.statusBarBottle.bottleAmount > 0) {
            let startX = this.character.x + 45; // Standard für Rechtswurf
            let startY = this.character.y + 125; // Y bleibt gleich
            
            if (this.character.otherDirection) {
                startX = this.character.x - 45; // Für Linkswurf X-Position anpassen
            }
    
            let bottle = new ThrowableObject(startX, startY, this.character.otherDirection);
            this.throwableObject.push(bottle);
            this.statusBarBottle.bottleAmount--;  // Flaschenanzahl um 1 reduzieren
        } else {
            //error sound abspielen
            this.errorSound.play();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);// Back
        //--------Space for fixed Object-----
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.ctx.translate(this.camera_x, 0); // Forwards

        this.addToMap(this.character)
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);


        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}