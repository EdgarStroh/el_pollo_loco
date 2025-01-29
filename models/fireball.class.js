/**
 * Represents a fireball in the game.
 * The fireball moves in a specific trajectory and animates while it travels.
 * @extends MovableObject
 */
class Fireball extends MovableObject {
    speedX = Math.random() * (7 - 5) + 4;
    speedY = Math.random() * (5 - 1) + 2.5;
    height = 60;
    width = 60;
    offsetWidth = 50;
    offsetHeight = 25;
    offsetX = 15;
    offsetY = 0;

    IMAGE_FIREBALL = [
        '../img/4_enemie_boss_chicken/endbossAttack/endbossAttack_01.png',
        '../img/4_enemie_boss_chicken/endbossAttack/endbossAttack_02.png',
        '../img/4_enemie_boss_chicken/endbossAttack/endbossAttack_03.png',
        '../img/4_enemie_boss_chicken/endbossAttack/endbossAttack_04.png',
        '../img/4_enemie_boss_chicken/endbossAttack/endbossAttack_05.png',
        '../img/4_enemie_boss_chicken/endbossAttack/endbossAttack_06.png',
        '../img/4_enemie_boss_chicken/endbossAttack/endbossAttack_07.png',
    ];
/**
     * Creates an instance of the Fireball class.
     * @param {number} x - The starting X-coordinate of the fireball.
     * @param {number} y - The starting Y-coordinate of the fireball.
     */
constructor(x, y) {
    super().loadImage(this.IMAGE_FIREBALL[0]);
    this.loadImages(this.IMAGE_FIREBALL);
    this.x = x;
    this.y = y;
    this.animate();
    this.lastTimestamp = null;
    this.totalPauseDuration = 0;
    this.pauseStart = null;
    this.isPaused = false;
}

/**
 * Moves the fireball based on its speed in the X and Y directions.
 * @memberof Fireball
 */
move() {
    this.x -= this.speedX;
    this.y += this.speedY;
}

/**
 * Animates the fireball and handles movement and frame updates.
 * This function recursively calls itself using `requestAnimationFrame`.
 * @param {number} timestamp - The current time in milliseconds when the animation frame is requested.
 * @memberof Fireball
 */
animate(timestamp) {
    this.initializeAnimationProperties(timestamp);

    if (pausedGame) {
        this.handlePause(timestamp);
        return;
    }

    this.updatePauseDuration(timestamp);

    const deltaTime = this.calculateDeltaTime(timestamp);
    this.move();
    this.updateAnimationFrame(deltaTime);

    requestAnimationFrame(this.animate.bind(this));
}

/**
 * Initializes the properties related to the animation frame timing.
 * @param {number} timestamp - The current time in milliseconds when the animation frame is requested.
 * @memberof Fireball
 */
initializeAnimationProperties(timestamp) {
    if (!this.totalPauseDuration) this.totalPauseDuration = 0;
    if (!this.lastTimestamp) this.lastTimestamp = timestamp;
}

/**
 * Handles the pause state of the game by tracking when the game is paused.
 * @param {number} timestamp - The current time in milliseconds when the animation frame is requested.
 * @memberof Fireball
 */
handlePause(timestamp) {
    if (!this.pauseStart) this.pauseStart = timestamp;
    requestAnimationFrame(this.animate.bind(this));
}

/**
 * Updates the total duration of the pause, used to adjust the animation timing.
 * @param {number} timestamp - The current time in milliseconds when the animation frame is requested.
 * @memberof Fireball
 */
updatePauseDuration(timestamp) {
    if (this.pauseStart) {
        this.totalPauseDuration += timestamp - this.pauseStart;
        this.pauseStart = null;
    }
}

/**
 * Calculates the time difference between the current timestamp and the last one to maintain smooth animation.
 * @param {number} timestamp - The current time in milliseconds when the animation frame is requested.
 * @returns {number} The delta time in seconds.
 * @memberof Fireball
 */
calculateDeltaTime(timestamp) {
    const effectiveTimestamp = timestamp - this.totalPauseDuration;
    const deltaTime = (effectiveTimestamp - this.lastTimestamp) / 1000;
    this.lastTimestamp = effectiveTimestamp;
    return deltaTime;
}

/**
 * Updates the animation frame by incrementing the frame counter and playing the fireball animation.
 * @param {number} deltaTime - The time difference between the current and last frame.
 * @memberof Fireball
 */
updateAnimationFrame(deltaTime) {
    this.frameCounter = this.frameCounter || 0;
    this.frameCounter += deltaTime * 1000;

    if (this.frameCounter >= 100) {
        this.frameCounter = 0;
        this.playAnimation(this.IMAGE_FIREBALL);
    }
}
}