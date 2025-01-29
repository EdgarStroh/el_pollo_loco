/**
 * Represents a cloud in the background of the game, which moves horizontally from right to left.
 * Extends the MovableObject class to inherit movement functionality.
 * 
 * @class
 */
class Cloud extends MovableObject {
    /** 
     * @type {number[]}
     * @default [10, 1800, 2600, 3700, 4800]
     * @static
     */
    static fixedXPositions = [10, 1800, 2600, 3700, 4800];

    /** 
     * @type {number}
     * @default 20
     */
    y = 20;

    /** 
     * @type {number}
     * @default 500
     */
    width = 500;

    /** 
     * @type {number}
     * @default 250
     */
    height = 250;

    /** 
     * @type {string[]}
     */
    cloudImages = [
        '/img/5_background/layers/4_clouds/1.png',
        '/img/5_background/layers/4_clouds/2.png'
    ];

    /**
     * Creates a new Cloud object, randomly selects a cloud image, and sets its initial position and speed.
     * The cloud is then animated to move from right to left.
     * 
     * @constructor
     * @param {number} index - The index from which to select the starting X position for the cloud.
     * @returns {void}
     */
    constructor(index) {
        super();
        let randomImage = this.cloudImages[Math.floor(Math.random() * this.cloudImages.length)];
        this.loadImage(randomImage);
        this.x = Cloud.fixedXPositions[index];
        this.speed = 0.05 + Math.random() * 0.27;
        this.animate();
        AnimationManager.register(this);
    }

    /**
     * Animates the cloud's movement to the left at a constant interval.
     * The cloud moves at the specified speed, creating a continuous leftward motion.
     * 
     * @function
     * @returns {void}
     */
    animate() {
        const cloudInterval = setInterval(() => {
            this.moveLeft();
        }, 10);
        AnimationManager.addInterval(cloudInterval);
    }

    /**
     * Resumes the cloud's animation after being paused.
     * 
     * @function
     * @returns {void}
     */
    resume() {
        this.animate(); 
    }
}
