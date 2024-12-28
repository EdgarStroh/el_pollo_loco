class World {
    character = new Character();
    level = level1;
    // playAnimationObject = new MovableObject();
    // loadImagesFromDO = new DrawableObject();
    // bottleToHit = new ThrowableObject();
    MO = new MovableObject();
    TO = new ThrowableObject();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    bottleToThrow = [];
    DamageWithBottle = -5;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    intervalIds = [];
    gamePaused = false;
    bottleEmpty_sound = AudioManager.bottleEmpty_sound;
    coin_sound = AudioManager.coin_sound;
    bottlePickUp_sound = AudioManager.bottlePickUp_sound;
    bottleThrow_sound = AudioManager.bottleThrow_sound;
    bottleBreak_sound = AudioManager.bottleBreak_sound;
    // bottleBreak2_sound = new Audio('audio/bottleBreak2.mp3');
    // bottleBreak3_sound = new Audio('audio/bottleBreak3.mp3');

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
        this.intervals = []; // Liste der aktiven Intervalle
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.hasDealtDamage = false; // Neues Flag
        this.bottleThrow_sound.loop = true; // Loop für den Flaschensound aktiviert

    }
    // setInterval(fn, time) {
    //     const intervalId = setInterval(fn, time);
    //     this.intervals.push(intervalId); // Speichere die ID
    //     console.log("Interval gestartet:", intervalId); // Logge die ID
    //     return intervalId;
    // }

    // clearAllIntervals() {
    //     console.log("Aktive Intervalle vor dem Stoppen:", this.intervals);

    //     // Stoppe alle allgemeinen Intervalle
    //     this.intervals.forEach(intervalId => clearInterval(intervalId));
    //     this.intervals = [];

    //     // Stoppe alle Cloud-Intervalle
    //     Cloud.cloudIntervals.forEach(intervalId => clearInterval(intervalId));
    //     Cloud.cloudIntervals = []; // Liste zurücksetzen
    //     console.log("Alle Intervalle gestoppt.");
    // }

    // resumeAllIntervals() {
    //     for (let id in this.intervals) {
    //         const { callback, interval } = this.intervals[id];
    //         const intervalId = setInterval(callback, interval);
    //         this.intervals[id].intervalId = intervalId; // Speichere die neue ID
    //     }
    // }
    // pushIntervall(interval) {
    //     this.intervalIds.push(interval);
    //     console.log('gepushte Intervale', this.intervalIds);
    // }

    // stoppAllInterval() {
    //     for (let i = 0; i < this.intervalIds.length; i++) {
    //         let id = this.intervalIds[i];
    //         console.log(id);

    //         clearInterval(id)
    //         console.log('gelöschte Intervale');
    //     }
    //     this.intervalIds.forEach(clearInterval);
    //     this.intervalIds = [];
    //     console.log('Anzahl nach dem löschen Intervale', this.intervalIds);
    // }
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }


    clearAllTimeouts() {
        for (let i = 1; i < 10000; i++) {
            clearTimeout(i);
        }
    }

    setWorld() {
        this.character.world = this;
    }

    applyDamageWithBottle(enemy) {
        if (enemy instanceof Endboss) {
            if (!enemy.isDead) {
                enemy.endbossHealth += this.DamageWithBottle;
                enemy.isWalking = false;
                enemy.isAlert = true;
                enemy.isHurt = true;
            }
            if (enemy.isHurt) {
                enemy.endbossHurt();
            }
            // console.log(`Endboss hit! Remaining health: ${enemy.endbossHealth}`);
            if (enemy.endbossHealth <= 0) {
                enemy.isDead = true;
                // enemy.endbossDead();
                // console.log('Endboss defeated!');
            }
        } else {
            enemy.chickenHealth += this.DamageWithBottle;
            // console.log(`Enemy hit! Remaining health: ${enemy.chickenHealth}`);
            if (enemy.chickenHealth <= 0) {
                enemy.die(); // <-- Hier rufen wir die `die()` Methode auf
                // console.log('Enemy defeated!');
            }
        }
    }

    run() {
        setInterval(() => {
            if (!this.gamePaused) {
                this.checkCollisions();
                this.checkCollisionsBottleOnEnemy();
                this.checkCoinCollisionsPickUp();
                this.checkBottleCollisionsPickUp();
            }
        }, 100);

    }

    pauseGame() {
        this.gamePaused = true;
        // this.clearAllIntervals(); // Stoppe alle Intervalle, einschließlich der Wolken
        // Cloud.stopAnimation(); // Stoppe Wolken-Animationen
        clearAllIntervals();
        console.log("Spiel pausiert.");
    }

    resumeGame() {
        this.gamePaused = false;
        console.log("Spiel wird fortgesetzt.");
        //  this.run(); // Starte die Haupt-Intervalle erneut

        // Starte die Wolkenanimationen erneut
        // Cloud.startAnimation();
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead && this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.myHealth);
            }
        });
    }

    checkCollisionsBottleOnEnemy() {
        this.bottleToThrow.forEach((bottle) => {
            let hasCollided = false;

            this.level.enemies.forEach((enemy) => {
                if (!hasCollided && bottle.isColliding(enemy)) {
                    bottle.speedX = 0;
                    bottle.speedY = 0;
                    bottle.animateSplash(); // Always start the splash animation

                    if (!bottle.hasPlayedBreakSound) {
                        let breakSound = AudioManager.bottleBreak_sound.cloneNode();
                        breakSound.volume = AudioManager.bottleBreak_sound.volume; // Lautstärke übernehmen
                        breakSound.muted = isMuted; // Mute-Status übernehmen
                        breakSound.play();
                        bottle.hasPlayedBreakSound = true;
                    }

                    if (!bottle.hasDealtDamage) {
                        this.applyDamageWithBottle(enemy);
                        bottle.hasDealtDamage = true;
                        if (bottle.sound) {
                            bottle.sound.pause();
                            bottle.sound.currentTime = 0;
                        }
                    }
                    hasCollided = true;

                    setTimeout(() => {
                        clearInterval(bottle.animationInterval);
                        bottle.isDestroyed = true;
                    }, 500);
                }
            });

            if (!hasCollided && bottle.theGround()) {
                bottle.speedX = 0;
                bottle.speedY = 0;

                if (bottle.sound) {
                    bottle.sound.pause();
                    bottle.sound.currentTime = 0;
                }

                bottle.animateSplash();

                if (!bottle.hasPlayedBreakSound) {
                    let breakSound = AudioManager.bottleBreak_sound.cloneNode();
                    breakSound.volume = AudioManager.bottleBreak_sound.volume; // Lautstärke übernehmen
                    breakSound.muted = isMuted; // Mute-Status übernehmen
                    breakSound.play();
                    bottle.hasPlayedBreakSound = true;
                }

                setTimeout(() => {
                    clearInterval(bottle.animationInterval);
                    bottle.isDestroyed = true;
                }, 500);
            }
        });

        this.bottleToThrow = this.bottleToThrow.filter(bottle => !bottle.isDestroyed);
    }

    checkCoinCollisionsPickUp() {
        // this.coin_sound.volume = 0.03;
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                this.coin_sound.pause();
                this.coin_sound.currentTime = 0;
                this.coin_sound.play();
                this.statusBarCoin.coinAmount++;
                return false; // Entfernt den Coin aus dem Array
            }
            return true; // Behalte den Coin im Array, wenn keine Kollision
        });
    }

    checkBottleCollisionsPickUp() {
        // this.bottlePickUp_sound.volume = 0.03;

        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.playBottlePickUpSound();
                this.statusBarBottle.bottleAmount++;

                return false; // Entferne die Flasche aus dem Level
            }
            return true; // Flasche bleibt, wenn keine Kollision
        });
    }

    throwBottle() {
        if (this.gamePaused || this.character.noLife) {
            return; // Keine Aktion, wenn das Spiel pausiert ist oder der Charakter tot ist
        }

        if (this.statusBarBottle.bottleAmount > 0) {
            let startX = this.character.x + 45;
            let startY = this.character.y + 125;
            if (this.character.otherDirection) {
                startX = this.character.x - 45;
            }

            let bottle = new ThrowableObject(startX, startY, this.character.otherDirection);
            this.bottleToThrow.push(bottle);

            // Erstelle eine Kopie des Sounds
            let bottleThrow_sound = AudioManager.bottleThrow_sound.cloneNode();
            bottleThrow_sound.volume = AudioManager.bottleThrow_sound.volume; // Lautstärke übernehmen
            bottleThrow_sound.muted = isMuted; // Mute-Status übernehmen
            bottleThrow_sound.currentTime = 0;
            bottle.sound = bottleThrow_sound;

            bottleThrow_sound.play();
            this.statusBarBottle.bottleAmount--;
        } else {
            AudioManager.bottleEmpty_sound.play(); // Leere Flasche-Sound
        }
    }


    // pauseAllSounds() {
    //     this.bottleToThrow.forEach(bottle => {
    //         if (bottle.sound) {
    //             bottle.sound.pause();
    //         }
    //     });
    // }

    // // Methode zum Wiederaufnehmen aller pausierten Sounds
    // resumeAllSounds() {
    //     this.bottleToThrow.forEach(bottle => {
    //         if (bottle.sound) {
    //             bottle.sound.play();
    //         }
    //     });
    // }


    playBottlePickUpSound() {
        this.bottlePickUp_sound.pause(); // Sound stoppen
        this.bottlePickUp_sound.currentTime = 0; // Zurück zum Anfang des Sounds
        this.bottlePickUp_sound.play(); // Neu abspielen
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