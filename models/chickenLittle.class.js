/**
 * Represents a ChickenLittle enemy in the game, which is a smaller version of a chicken that can walk, die, and be removed from the level.
 * Extends the MovableObject class to inherit movement functionality.
 * 
 * @class
 */
class ChickenLittle extends MovableObject {
    height = 50;
    width = 50;
    y = 370;
    offsetX = 18;
    offsetY = 20;
    offsetWidth = 53;
    offsetHeight = 0;
    chickenHealth = 5;
    isDead = false;

    /** 
     * @type {string[]}
     */
    IMAGE_WALKING = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /** 
     * @type {string[]}
     * @default ['img/3_enemies_chicken/chicken_small/2_dead/dead.png']
     */
    IMAGE_DEAD = [
        '../img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Loads all images for the ChickenLittle, including walking and dead images.
     * 
     * @function
     * @returns {void}
     */
    loadAllImages() {
        this.loadImages(this.IMAGE_WALKING);
        this.loadImages(this.IMAGE_DEAD);
    }

    /**
     * Creates a new ChickenLittle object with random starting position, speed, and initial image.
     * It starts the animation and loads all images for the ChickenLittle.
     * 
     * @constructor
     * @returns {void}
     */
    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.x = 280 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.loadAllImages();
        AnimationManager.register(this);
    }

    /**
     * Starts the movement and animation for the ChickenLittle.
     * The ChickenLittle moves left continuously and plays the walking animation.
     * 
     * @function
     * @returns {void}
     */
    animate() {
        const moveInterval = setInterval(() => {
            if (this.isDead) return;
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 40);
        AnimationManager.addInterval(moveInterval);

        const animationInterval = setInterval(() => {
            if (this.isDead) return;
            this.playAnimation(this.IMAGE_WALKING);
        }, 220);
        AnimationManager.addInterval(animationInterval);
    }

    /**
     * Resumes the ChickenLittle's animation after being paused.
     * 
     * @function
     * @returns {void}
     */
    resume() {
        this.animate();
    }

    /**
     * Handles the death of the ChickenLittle.
     * The ChickenLittle becomes dead, plays the dead animation, and removes itself after a brief delay.
     * 
     * @function
     * @returns {void}
     */
    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.playAnimation(this.IMAGE_DEAD);
        setTimeout(() => this.removeChicken(), 500);
    }

    /**
     * Removes the ChickenLittle from the level's enemy array.
     * 
     * @function
     * @returns {void}
     */
    removeChicken() {
        const index = level1.enemies.indexOf(this);
        if (index > -1) {
            level1.enemies.splice(index, 1);
        }
    }
}
