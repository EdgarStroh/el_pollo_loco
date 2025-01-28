/**
 * Represents a movable object in the game, extending from `DrawableObject`.
 * This class contains methods and properties to manage movement, gravity, collision detection, health, and animations.
 */
class MovableObject extends DrawableObject {
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    myHealth = 100;
    enemyHealth = 0;
    lastHit = 0;
    getDamage = false;
    intervals = [];
    hurt_sound = AudioManager.hurt_sound;

    /**
     * Applies gravity to the object, adjusting its Y position over time.
     * The gravity effect is applied at a fixed interval.
     */
    applyGravity() {
        setInterval(() => {
            if (pausedGame) return;
            if (this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * For throwable objects, it always returns `true`, otherwise, it checks the object's Y position.
     * 
     * @returns {boolean} `true` if the object is above the ground, `false` otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 130;
        }
    }

    /**
     * Checks if the object has reached the ground.
     * 
     * @returns {boolean} `true` if the object has hit the ground, `false` otherwise.
     */
    theGround() {
        return this.y > 310;
    }

    /**
     * Checks if this object is colliding with another object.
     * 
     * @param {MovableObject} obj - The object to check for collision with.
     * @returns {boolean} `true` if the objects are colliding, `false` otherwise.
     */
    isColliding(obj) {
        const offsetX = this.otherDirection ? this.offsetX - 20 : this.offsetX;
        const width = this.otherDirection ? this.width + 25 : this.width;

        return (
            this.x + offsetX + width - this.offsetWidth >= obj.x + obj.offsetX &&
            this.x + offsetX <= obj.x + obj.offsetX + obj.width - obj.offsetWidth &&
            this.y + this.offsetY + this.height - this.offsetHeight >= obj.y + obj.offsetY &&
            this.y + this.offsetY <= obj.y + obj.offsetY + obj.height - obj.offsetHeight
        );
    }
        

    /**
     * Reduces the object's health by a certain amount and plays a hurt sound.
     * The object will not take damage if it is already in the process of being hurt.
     */
    hit() {
        if (!this.getDamage && this.myHealth > 0) {
            this.myHealth -= 20;
            this.getDamage = true;
            this.hurt_sound.play();
            this.lastHit = new Date().getTime();
        }
        if (this.myHealth <= 0) {
            this.myHealth = 0;
        }
    }

    /**
     * Checks if the object is currently in a hurt state (within 1 second of being hit).
     * 
     * @returns {boolean} `true` if the object is hurt (within 1 second of the last hit), `false` otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        if (timepassed >= 1.0) {
            this.getDamage = false;
        }
        return timepassed < 1.0;
    }

    /**
     * Checks if the object is dead (i.e., its health is 0).
     * 
     * @returns {boolean} `true` if the object is dead, `false` otherwise.
     */
    isDead() {
        return this.myHealth == 0;
    }

    /**
     * Resets the animation to the initial frame (frame 0).
     */
    resetAnimation() {
        this.currentImage = 0;
    }

    /**
     * Plays the next frame in the animation sequence, looping through the provided images.
     * 
     * @param {Array<string>} images - An array of image paths to use in the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by the object's speed value.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by the object's speed value.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Stops the object's movement by setting its speed to 0.
     */
    moveStop() {
        this.speed = 0;
    }
}
