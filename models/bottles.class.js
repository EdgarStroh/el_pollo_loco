/**
 * Represents a bottle object that can be moved and displayed in the game.
 * Inherits from the `MovableObject` class.
 * 
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    offsetX = 40;
    offsetY = 20;
    offsetWidth = 70;
    offsetHeight = 30;
    
    /** @type {string[]} List of image paths for the bottle's animation */
    IMAGE_BOTTLE = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * Creates an instance of the `Bottle` object.
     * Initializes the bottle's position, size, and image animations.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGE_BOTTLE);
        this.x = Math.random() * (3000 - 500) + 200;
        this.y = 25 + 300 * Math.random(); 
        this.width = 110;
        this.height = 110;
        this.img = this.imageCache[this.IMAGE_BOTTLE[0]]; 
        this.startImageChange();
        AnimationManager.register(this);
    }

    /**
     * Starts the image change interval for the bottle.
     * Changes the bottle's image periodically.
     */
    startImageChange() {
        let currentIndex = 0;
        const imageChangeInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % this.IMAGE_BOTTLE.length;
            this.img = this.imageCache[this.IMAGE_BOTTLE[currentIndex]];
        }, 500);
        AnimationManager.addInterval(imageChangeInterval); 
    }

    /**
     * Draws the bottle on the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Resumes the image change animation for the bottle.
     */
    resume() {
        this.startImageChange();
    }
}
