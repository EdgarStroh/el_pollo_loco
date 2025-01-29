/**
 * Represents a throwable object (e.g., a bottle) that moves, rotates, and plays splash animations when thrown.
 * It is affected by gravity, and its position and rotation are updated each frame.
 * 
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    offsetX = 10;
    offsetY = 20;
    offsetWidth = 25;
    offsetHeight = 25;
    speedX = 400;
    speedY = -650;
    gravity = 1350;
    lastTimestamp = 0;
    pauseStart = null;
    totalPauseDuration = 0;
    i = 0;
    imageChangeInterval = 52;
    isAnimatingSplash = false;
    hasResetAnimation = false;

    /**
     * @type {Array<string>}
     * An array containing the paths to images for the bottle's rotation animation.
     */
    IMAGE_BOTTLE_ROTATE = [
        '/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * @type {Array<string>}
     * An array containing the paths to images for the bottle's splash animation.
     */
    IMAGES_SPLASH = [
        '/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Creates an instance of `ThrowableObject`.
     * 
     * @param {number} x - The initial horizontal position of the object.
     * @param {number} y - The initial vertical position of the object.
     * @param {boolean} otherDirection - A flag indicating if the object should be thrown in the opposite direction.
     */
    constructor(x, y, otherDirection) {
        super().loadImage('/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_BOTTLE_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.throw();
    }

    /**
     * Initiates the throw animation of the object.
     */
    throw() {
        this.animateThrow(0);
    }

    /**
     * Animates the object's throw by updating its position, applying gravity,
     * and updating its rotation and splash animations.
     * 
     * @param {number} timestamp - The timestamp of the current animation frame.
     */
    animateThrow(timestamp) {
        if (pausedGame) {
            this.handlePauseStart(timestamp);
            return;
        }
        this.updatePauseDuration(timestamp);
        const deltaTime = this.calculateDeltaTime(timestamp);
        if (!this.isAnimatingSplash) {
            this.performThrowAnimation(deltaTime);
        }
        requestAnimationFrame(this.animateThrow.bind(this));
    }

    /**
     * Handles the pause functionality when the game is paused.
     * 
     * @param {number} timestamp - The timestamp of the current animation frame.
     */
    handlePauseStart(timestamp) {
        if (!this.pauseStart) {
            this.pauseStart = timestamp;
        }
        requestAnimationFrame(this.animateThrow.bind(this));
    }

    /**
     * Updates the total pause duration based on the current timestamp.
     * 
     * @param {number} timestamp - The timestamp of the current animation frame.
     */
    updatePauseDuration(timestamp) {
        if (this.pauseStart) {
            this.totalPauseDuration += timestamp - this.pauseStart;
            this.pauseStart = null;
        }
    }

    /**
     * Calculates the time difference (deltaTime) between the current and last animation frames.
     * 
     * @param {number} timestamp - The timestamp of the current animation frame.
     * @returns {number} The delta time in seconds.
     */
    calculateDeltaTime(timestamp) {
        if (!this.lastTimestamp) {
            this.lastTimestamp = timestamp;
        }
        const effectiveTimestamp = timestamp - this.totalPauseDuration;
        const deltaTime = (effectiveTimestamp - this.lastTimestamp) / 1000;
        this.lastTimestamp = effectiveTimestamp;
        return deltaTime;
    }

    /**
     * Performs the throw animation by applying gravity, updating the position, and rotating the object.
     * 
     * @param {number} deltaTime - The time difference between the current and previous frames.
     */
    performThrowAnimation(deltaTime) {
        this.applyGravity(deltaTime);
        this.updatePosition(deltaTime);
        this.updateRotationAnimation(deltaTime);
    }

    /**
     * Updates the rotation animation of the object.
     * 
     * @param {number} deltaTime - The time difference between the current and previous frames.
     */
    updateRotationAnimation(deltaTime) {
        this.i += deltaTime * 1000;
        if (this.i >= this.imageChangeInterval) {
            this.i = 0;
            this.playAnimation(this.IMAGE_BOTTLE_ROTATE);
        }
    }

    /**
     * Applies gravity to the vertical speed of the object.
     * 
     * @param {number} deltaTime - The time difference between the current and previous frames.
     */
    applyGravity(deltaTime) {
        this.speedY += this.gravity * deltaTime;
    }

    /**
     * Updates the position of the object based on its current speed and direction.
     * 
     * @param {number} deltaTime - The time difference between the current and previous frames.
     */
    updatePosition(deltaTime) {
        this.x += (this.otherDirection ? -1 : 1) * this.speedX * deltaTime;
        this.y += this.speedY * deltaTime;
    }

    /**
     * Starts the splash animation when the object collides with an object or surface.
     */
    animateSplash() {
        if (!this.isAnimatingSplash) {
            this.resetAnimation();
            this.isAnimatingSplash = true;
        }
        this.playAnimation(this.IMAGES_SPLASH);
    }
}
