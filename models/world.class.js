class World {
    character = new Character();
    MO = new MovableObject();
    TO = new ThrowableObject();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    level = level1;
    canvas;
    ctx;
    keyboard;
    damage = -5;
    camera_x = 0;
    bottleToThrow = [];
    intervalIds = [];
    gamePaused = false;
      // playAnimationObject = new MovableObject();
    // loadImagesFromDO = new DrawableObject();
    // bottleToHit = new ThrowableObject();
    bottleEmpty_sound = AudioManager.bottleEmpty_sound;
    coin_sound = AudioManager.coin_sound;
    bottlePickUp_sound = AudioManager.bottlePickUp_sound;
    bottleThrow_sound = AudioManager.bottleThrow_sound;
    bottleBreak_sound = AudioManager.bottleBreak_sound;
    jumpOnEnemy_sound = AudioManager.jumpOnEnemy_sound;
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
    setInterval(fn, time) {
        const intervalId = setInterval(fn, time);
        this.intervals.push(intervalId); // Speichere die ID
        console.log("Interval gestartet:", intervalId); // Logge die ID
        return intervalId;
    }

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

    resumeAllIntervals() {
        for (let id in this.intervals) {
            const { callback, interval } = this.intervals[id];
            const intervalId = setInterval(callback, interval);
            this.intervals[id].intervalId = intervalId; // Speichere die neue ID
        }
    }
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
    checkCollisionJumpOnEnemy() {
        // Überprüfe, ob der Charakter in der Luft ist
        if (!this.character.isJumping) {
            return; // Wenn der Charakter nicht springt, keine Kollision
        }

        // Durchlaufe alle Gegner im Level
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead) {
                // Überprüfe, ob der Charakter mit dem Gegner kollidiert
                if (this.character.isColliding(enemy)) {
                    // Prüfe, ob der Charakter von oben auf den Gegner springt
                    if (this.character.y + this.character.height <= enemy.y) {
                        // Der Charakter landet auf dem Gegner, Schaden anrichten
                        this.applyDamageOnEnemy(enemy);
                    }
                }
            }
        });
    }

    applyDamageWithBottle(enemy) {
        if (enemy instanceof Endboss) {
            if (!enemy.isDead) {
                enemy.endbossHealth += this.damage;
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
            enemy.chickenHealth += this.damage;
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
        console.log("Spiel pausiert.");
        this.gamePaused = true;
        // this.clearAllIntervals(); // Stoppe alle Intervalle, einschließlich der Wolken
        // Cloud.stopAnimation(); // Stoppe Wolken-Animationen
        clearAllIntervals();
     
    }

    resumeGame() {
        console.log("Spiel wird fortgesetzt.");
        this.gamePaused = false;
  
        //  this.run(); // Starte die Haupt-Intervalle erneut

        // Starte die Wolkenanimationen erneut
        // Cloud.startAnimation();
    }

    // Refaktorisierte Methode für die Springen- und Gegner-Kollisionslogik
handleJumpingCollisionWithEnemy(enemy) {
    // Wenn der Charakter springt und unter ihm mit einem Gegner kollidiert
    if (this.character.isJumping && this.isCollisionBelowCharacter(enemy)) {
        // Gegner bekommt Schaden
        this.jumpOnEnemy_sound.play();
        enemy.chickenHealth += this.damage;
        if (enemy.chickenHealth <= 0) {
            enemy.die();  // Gegner stirbt
        }
        return true; // Kollisions- und Schadenbehandlung abgeschlossen
    }
    return false; // Keine Kollision mit dem Gegner
}

// Refaktorisierte checkCollisions Methode
checkCollisions() {
    this.level.enemies.forEach((enemy) => {
        if (!enemy.isDead && this.character.isColliding(enemy)) {
            // Springt der Charakter und kollidiert mit einem Gegner?
            if (this.handleJumpingCollisionWithEnemy(enemy)) {
                return; // Kein Schaden am Charakter, wenn der Gegner getroffen wurde
            }

            // Andernfalls bekommt der Charakter Schaden
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.myHealth);
        }
    });
}

    // Überprüft, ob die Kollision unter dem Charakter stattfindet (z.B. beim Landen auf einem Gegner)
    isCollisionBelowCharacter(enemy) {
        const characterBottom = this.character.y + this.character.height - this.character.offsetHeight;
        const enemyTop = enemy.y + enemy.offsetY;
    
        // Wenn die untere Kante des Charakters über der oberen Kante des Gegners ist, bedeutet dies, dass der Charakter auf dem Gegner landet
        return characterBottom <= enemyTop;
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


    pauseBottleSounds() {
        this.bottleToThrow.forEach(bottle => {
            if (bottle.sound) {
                bottle.sound.pause();
            }
        });
    }

    // Methode zum Wiederaufnehmen aller pausierten Sounds
    resumeBottleSounds() {
        this.bottleToThrow.forEach(bottle => {
            if (bottle.sound) {
                bottle.sound.play();
            }
        });
    }


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