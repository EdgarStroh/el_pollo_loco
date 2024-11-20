class World {
    character = new Character();
    // playAnimationObject = new MovableObject();
    // loadImagesFromDO = new DrawableObject();
    // bottleToHit = new ThrowableObject();
    mo = new MovableObject();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    bottleEmptySound = new Audio('audio/error.mp3');
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottleToThrow = [];
    // IMAGE_BOTTLE_SPLASH = [
    //     'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    //     'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    //     'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    //     'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    //     'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    //     'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    // ];
    // splashImages = [];
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        // this.loadImagesFromDO.loadImages(this.IMAGE_BOTTLE_SPLASH);
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            //Check collision
            this.checkCollisions();
            this.checkCollisionsBottleOnEnemy();
            this.checkCoinCollisionsPickUp();
            this.checkBottleCollisionsPickUp();
        }, 100);
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

    checkCollisionsBottleOnEnemy() {
        this.bottleToThrow.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                // this.mo.resetAnimation();
                if (bottle.isColliding(enemy)) {
                    bottle.speedX = 1;  // Stoppe die Bewegung
                    bottle.speedY = 1;  // Stoppe die Bewegung nach untenn
                    bottle.animateSplash();
                    setInterval(() => {
                        bottle.isDestroyed = true;
                    }, 500);
                }
            });
        });
        // Entferne zerstörte Flaschen aus dem Array
        this.bottleToThrow = this.bottleToThrow.filter(bottle => !bottle.isDestroyed);
    }


    checkCoinCollisionsPickUp() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                this.statusBarCoin.coinAmount++;
                return false; // Entfernt den Coin aus dem Array
            }
            return true; // Behalte den Coin im Array, wenn keine Kollision
        });
    }
    checkBottleCollisionsPickUp() {
        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.statusBarBottle.bottleAmount++; // Increase the bottle amount
                return false; // Remove the bottle from the level
            }
            return true; // Keep the bottle if no collision
        });
    }

    throwBottle() {
        this.bottleEmptySound.volume = 0.15;
        if (this.statusBarBottle.bottleAmount > 0 && !this.character.noLife) {
            let startX = this.character.x + 45; // Standard für Rechtswurf
            let startY = this.character.y + 125; // Y bleibt gleich

            if (this.character.otherDirection) {
                startX = this.character.x - 45; // Für Linkswurf X-Position anpassen
            }
            let bottle = new ThrowableObject(startX, startY, this.character.otherDirection);
            this.bottleToThrow.push(bottle);
            this.statusBarBottle.bottleAmount--;  // Flaschenanzahl um 1 reduzieren
        } else if (this.statusBarBottle.bottleAmount === 0) {
            //error sound abspielen
            this.bottleEmptySound.play();
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        // Draw background objects (like clouds) first
        this.addObjectsToMap(this.level.backgroundObjects);

        // Draw the character, coins, enemies, and throwable objects next
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.bottleToThrow);
        // this.addObjectsToMap(this.playAnimationObject);
        // this.addObjectsToMap(this.splashImages);

        this.ctx.translate(-this.camera_x, 0); // Reset the translation for fixed objects

        // Draw the status bars last to ensure they appear above everything else
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);


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