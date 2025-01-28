/**
 * Represents the world in which the game is played, including characters, enemies, and interactions.
 */
class World {
    character = new Character();
    endboss = new Endboss();
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
    fireballs = [];
    gamePaused = false;
    gameOver = false;
    playInGameMusic_flag = false;
    gameover_flag = false;
    bottleEmpty_sound = AudioManager.bottleEmpty_sound;
    coin_sound = AudioManager.coin_sound;
    bottlePickUp_sound = AudioManager.bottlePickUp_sound;
    bottleThrow_sound = AudioManager.bottleThrow_sound;
    bottleBreak_sound = AudioManager.bottleBreak_sound;
    jumpOnEnemy_sound = AudioManager.jumpOnEnemy_sound;
    fireball_sound = AudioManager.fireball_sound;
    inGameMusic_sound = AudioManager.inGameMusic_sound;
    youWon_sound = AudioManager.youWon_sound;
    /**
    * Creates an instance of the World.
    * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
    * @param {Keyboard} keyboard - The keyboard handler for detecting user input.
    */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.runCheckCollisions();
        this.hasDealtDamage = false;
        this.playInGameMusic_flag = false;
    }
    /**
     * Starts the game loop, checking for various game conditions and performing actions at intervals.
     * @returns {void}
    */
    run() {
        setInterval(() => {
            if (!this.gamePaused) {
                this.playInGameMusic();
                this.checkCollisionsBottleOnEnemy();
                this.checkCoinCollisionsPickUp();
                this.checkBottleCollisionsPickUp();
                this.checkCollsionFireballOnCharacter();
                this.fireballs.forEach(fireball => this.checkGroundCollisionFireball(fireball));
            }
        }, 100);
    }

    /**
     * Clears all intervals that were previously set using `setInterval`.
     * @returns {void}
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
     * Clears all timeouts that were previously set using `setTimeout`.
     * @returns {void}
     */
    clearAllTimeouts() {
        for (let i = 1; i < 10000; i++) {
            clearTimeout(i);
        }
    }

    /**
     * Sets the world for the character, initializing the reference to the world.
     * @returns {void}
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Checks if the character is colliding with any enemy while jumping.
     * If a collision is detected, damage is applied to the enemy.
     * @returns {void}
     */
    checkCollisionJumpOnEnemy() {
        if (!this.character.isJumping) { return; }
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead) {
                if (this.character.isColliding(enemy)) {
                    if (this.character.y + this.character.height <= enemy.y) {
                        this.applyDamageOnEnemy(enemy);
                    }
                }
            }
        });
    }

    /**
     * Applies damage to an enemy when hit by a bottle.
     * Determines if the enemy is an Endboss or a Chicken and applies appropriate damage.
     * @param {Enemy} enemy - The enemy instance to apply damage to.
     * @returns {void}
     */
    applyDamageWithBottle(enemy) {
        if (enemy instanceof Endboss) {
            this.applyDamageToEndboss(enemy);
        } else {
            this.applyDamageToChicken(enemy);
        }
    }

    /**
     * Applies damage to the Endboss and handles its response.
     * @param {Endboss} endboss - The Endboss instance to apply damage to.
     * @returns {void}
     */
    applyDamageToEndboss(endboss) {
        if (endboss.isDead) return;
        this.updateEndbossHealth(endboss);
        this.handleEndbossHurt(endboss);
        this.checkEndbossDeath(endboss);
    }

    /**
     * Updates the health of the Endboss when damaged.
     * @param {Endboss} endboss - The Endboss instance to update health for.
     * @returns {void}
     */
    updateEndbossHealth(endboss) {
        endboss.endbossHealth += this.damage;
        endboss.isWalking = false;
        endboss.isAlert = true;
        endboss.isHurt = true;
    }

    /**
     * Checks if the Endboss is dead, and if so, triggers the end of the game.
     * @param {Endboss} endboss - The Endboss instance to check for death.
     * @returns {void}
     */
    checkEndbossDeath(endboss) {
        if (endboss.endbossHealth <= 0) {
            endboss.isDead = true;
            this.youWon_sound.play();
            this.showYouWonScreen();
        }
    }

    /**
     * Handles the Endboss being hurt, plays sound effects and music as needed.
     * @param {Endboss} endboss - The Endboss instance to handle as hurt.
     * @returns {void}
     */
    handleEndbossHurt(endboss) {
        if (endboss.isHurt) {
            endboss.endbossHurt();
            this.playInGameMusic_flag = true;
            this.inGameMusic_sound.pause();
        }
    }

    /**
     * Applies damage to a Chicken enemy and handles its death if health drops below 0.
     * @param {Chicken} chicken - The Chicken instance to apply damage to.
     * @returns {void}
     */
    applyDamageToChicken(chicken) {
        chicken.chickenHealth += this.damage;
        if (chicken.chickenHealth <= 0) {
            chicken.die();
        }
    }

    /**
     * Displays the "You Won" screen and pauses the game.
     * @returns {void}
     */
    showYouWonScreen() {
        const youWonImage = document.getElementById('youwon');
        const mainMenuBtn = document.getElementById('mainMenuBtn');
        youWonImage.classList.remove('hidden');
        setTimeout(() => {
            this.clearAllIntervals();
            this.gameOver = true;
            this.gamePaused = true;
            mainMenuBtn.classList.remove('hidden');
        }, 4000);
    }

    /**
     * Starts checking for collisions at a constant interval.
     * @returns {void}
     */
    runCheckCollisions() {
        setInterval(() => {
            if (!this.gamePaused) {
                this.checkCollisions();
            }
        }, 1000 / 60);
    }

    /**
     * Plays the background in-game music if it isn't already playing.
     * @returns {void}
     */
    playInGameMusic() {
        if (!this.playInGameMusic_flag) {
            this.inGameMusic_sound.play();
            this.inGameMusic_sound.addEventListener('ended', () => {
                this.playInGameMusic();
            });
        }
    }

    /**
     * Handles collision between the character and an enemy during a jump.
     * The enemy is damaged if the character is jumping and collides from below.
     * 
     * @param {Object} enemy The enemy object that the character might collide with.
     * @returns {boolean} Returns `true` if the character collided with the enemy, otherwise `false`.
     */
    handleJumpingCollisionWithEnemy(enemy) {
        if (this.character.isJumping && this.isCollisionBelowCharacter(enemy)) {
            this.jumpOnEnemy_sound.play();
            enemy.chickenHealth += this.damage;
            if (enemy.chickenHealth <= 0) {
                enemy.die();
            }
            return true;
        }
        return false;
    }

    /**
     * Checks for collisions between the character and enemies.
     * If the character collides with an enemy, it either handles the jumping collision or applies damage.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead && this.character.isColliding(enemy)) {
                if (this.handleJumpingCollisionWithEnemy(enemy)) { return; }
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.myHealth);
            }
        });
    }

    /**
     * Checks for collisions between the character and fireballs.
     * If the character collides with a fireball, it receives damage.
     */
    checkCollsionFireballOnCharacter() {
        this.fireballs.forEach((fireball) => {
            if (this.character.isColliding(fireball)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.myHealth);
            }
        });
    }

    /**
     * Checks if the character is colliding with the enemy from below.
     * 
     * @param {Object} enemy The enemy object to check the collision with.
     * @returns {boolean} Returns `true` if the collision is below the character, otherwise `false`.
     */
    isCollisionBelowCharacter(enemy) {
        const characterBottom = this.character.y + this.character.height - this.character.offsetHeight;
        const enemyTop = enemy.y + enemy.offsetY;
        return characterBottom <= enemyTop;
    }

    /**
     * Checks for collisions between thrown bottles and enemies or the ground.
     * If a collision occurs, the bottle is handled accordingly.
     */
    checkCollisionsBottleOnEnemy() {
        this.bottleToThrow.forEach((bottle) => {
            let hasCollided = false;
            this.level.enemies.forEach((enemy) => {
                if (!hasCollided && bottle.isColliding(enemy)) {
                    this.handleBottleCollisionWithEnemy(bottle, enemy);
                    hasCollided = true;
                }
            });
            if (!hasCollided && bottle.theGround()) {
                this.handleBottleCollisionWithGround(bottle);
            }
        });
        this.bottleToThrow = this.bottleToThrow.filter(bottle => !bottle.isDestroyed);
    }

    /**
     * Handles the collision between a bottle and an enemy.
     * Stops the bottle, plays the splash animation, and applies damage to the enemy.
     * 
     * @param {Object} bottle The bottle object that collided with the enemy.
     * @param {Object} enemy The enemy object that the bottle collided with.
     */
    handleBottleCollisionWithEnemy(bottle, enemy) {
        bottle.speedX = 0;
        bottle.speedY = 0;
        bottle.animateSplash();
        if (!bottle.hasPlayedBreakSound) {
            this.playBreakSound();
            bottle.hasPlayedBreakSound = true;
        }
        if (!bottle.hasDealtDamage) {
            this.applyDamageWithBottle(enemy);
            bottle.hasDealtDamage = true;
            this.stopBottleSound(bottle);
        }
        this.destroyBottleAfterDelay(bottle);
    }

    /**
     * Handles the collision between a bottle and the ground.
     * Stops the bottle, plays the splash animation, and destroys the bottle after a delay.
     * 
     * @param {Object} bottle The bottle object that collided with the ground.
     */
    handleBottleCollisionWithGround(bottle) {
        bottle.speedX = 0;
        bottle.speedY = 0;
        this.stopBottleSound(bottle);
        bottle.animateSplash();
        if (!bottle.hasPlayedBreakSound) {
            this.playBreakSound();
            bottle.hasPlayedBreakSound = true;
        }
        this.destroyBottleAfterDelay(bottle);
    }

    /**
     * Plays the break sound for a bottle when it collides.
     */
    playBreakSound() {
        let breakSound = AudioManager.bottleBreak_sound.cloneNode();
        breakSound.volume = AudioManager.bottleBreak_sound.volume;
        breakSound.muted = isMuted;
        breakSound.play();
    }

    /**
     * Stops the sound of a bottle after a collision.
     * 
     * @param {Object} bottle The bottle object whose sound should be stopped.
     */
    stopBottleSound(bottle) {
        if (bottle.sound) {
            bottle.sound.pause();
            bottle.sound.currentTime = 0;
        }
    }

    /**
     * Destroys the bottle after a delay.
     * 
     * @param {Object} bottle The bottle object that should be destroyed.
     */
    destroyBottleAfterDelay(bottle) {
        setTimeout(() => {
            bottle.isDestroyed = true;
        }, 500);
    }

    /**
     * Checks for collisions between the character and coins.
     * If a collision occurs, the character picks up the coin and the coin is removed.
     */
    checkCoinCollisionsPickUp() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                this.coin_sound.pause();
                this.coin_sound.currentTime = 0;
                this.coin_sound.play();
                this.statusBarCoin.coinAmount++;
                return false;
            }
            return true;
        });
    }

    /**
     * Checks for collisions between the character and bottles.
     * If a collision occurs, the character picks up the bottle and the bottle is removed.
     */
    checkBottleCollisionsPickUp() {
        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.playBottlePickUpSound();
                this.statusBarBottle.bottleAmount++;
                return false;
            }
            return true;
        });
    }

    /**
     * Throws a bottle if the game is not paused and the character has at least one bottle.
     * The bottle's start position is calculated and the throw sound is played.
     */
    throwBottle() {
        if (this.gamePaused || this.character.noLife) {
            return;
        }
        if (this.statusBarBottle.bottleAmount > 0) {
            const { startX, startY } = this.calculateStartPosition();
            let bottle = this.createThrowableBottle(startX, startY);
            this.playThrowSound(bottle);
            this.statusBarBottle.bottleAmount--;
        } else {
            this.playEmptyBottleSound();
        }
    }

    /**
     * Calculates the starting position for throwing a bottle.
     * 
     * @returns {Object} The calculated starting X and Y position for the bottle.
     */
    calculateStartPosition() {
        let startX = this.character.x + 45;
        let startY = this.character.y + 125;
        if (this.character.otherDirection) {
            startX = this.character.x - 45;
        }
        return { startX, startY };
    }

    /**
     * Creates a throwable bottle and adds it to the `bottleToThrow` array.
     * 
     * @param {number} startX The starting X position of the bottle.
     * @param {number} startY The starting Y position of the bottle.
     * @returns {Object} The created throwable bottle.
     */
    createThrowableBottle(startX, startY) {
        let bottle = new ThrowableObject(startX, startY, this.character.otherDirection);
        this.bottleToThrow.push(bottle);
        return bottle;
    }

    /**
     * Plays the throw sound when a bottle is thrown.
     * 
     * @param {Object} bottle The bottle object that is thrown.
     */
    playThrowSound(bottle) {
        let throwSound = AudioManager.bottleThrow_sound.cloneNode();
        throwSound.volume = AudioManager.bottleThrow_sound.volume;
        throwSound.muted = isMuted;
        throwSound.currentTime = 0;
        bottle.sound = throwSound;
        throwSound.play();
    }

    /**
     * Plays the empty bottle sound when the character tries to throw a bottle but has none left.
     */
    playEmptyBottleSound() {
        AudioManager.bottleEmpty_sound.play();
    }

    /**
     * Fires a fireball from the endboss if the game is not paused.
     */
    fireFireball() {
        if (this.gamePaused) {
            return;
        }
        let startX = this.endboss.x - 30;
        let startY = this.endboss.y + 120;
        let fireball = new Fireball(startX, startY);
        this.fireballs.push(fireball);
        this.fireball_sound.play();
        this.checkGroundCollisionFireball(fireball);
    }

    /**
     * Checks for ground collision with a fireball.
     * Removes the fireball from the game once it hits the ground.
     * 
     * @param {Object} fireball The fireball object to check for ground collision.
     */
    checkGroundCollisionFireball(fireball) {
        let checkGroundInterval = setInterval(() => {
            if (fireball.y >= 360) {
                this.fireballs = this.fireballs.filter(fb => fb !== fireball);
                clearInterval(checkGroundInterval);
            }
        }, 1000 / 40);
    }

    /**
     * Plays the sound when the character picks up a bottle.
     */
    playBottlePickUpSound() {
        this.bottlePickUp_sound.pause();
        this.bottlePickUp_sound.currentTime = 0;
        this.bottlePickUp_sound.play();
    }
    /**
     * Clears the canvas and draws all game objects on the map. 
     * Updates the status bars and schedules the next frame for animation.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.bottleToThrow);
        this.addObjectsToMap(this.fireballs);
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds a collection of objects to the map by iterating through each object and drawing it.
     * @param {Array} objects - The array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }

    /**
     * Adds a single map object to the map, drawing and flipping it if necessary based on direction.
     * @param {Object} mo - The map object to be drawn, with properties like `otherDirection`, `x`, `y`, etc.
     */
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

    /**
     * Flips the image horizontally by scaling it and adjusting its x position.
     * @param {Object} mo - The map object to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Reverts the image flip by restoring the x position and scaling back to normal.
     * @param {Object} mo - The map object whose flip is to be reversed.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}