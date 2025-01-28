/**
 * Represents a coin object in the game that can be collected by the player.
 * Extends the MovableObject class to inherit movement functionality.
 * 
 * @class
 */
class Coin extends MovableObject {
    /** 
     * @type {number}
     * @default 40
     */
    offsetX = 40;

    /** 
     * @type {number}
     * @default 40
     */
    offsetY = 40;

    /** 
     * @type {number}
     * @default 80
     */
    offsetWidth = 80;

    /** 
     * @type {number}
     * @default 80
     */
    offsetHeight = 80;

    /** 
     * @type {string[]}
     * @default ['img/8_coin/coin_1.png']
     */
    IMAGECOIN = [
        'img/8_coin/coin_1.png',
    ];

    /**
     * Creates a new Coin object, randomly placing it on the screen within specific bounds
     * and loading its image.
     * 
     * @constructor
     * @returns {void}
     */
    constructor() {
        super();
        this.loadImages(this.IMAGECOIN);
        this.x = Math.random() * (3000 - 500) + 1100; // Random X position
        this.y = 80 + 250 * Math.random(); // Random Y position
        this.width = 110;
        this.height = 110;
        this.img = this.imageCache[this.IMAGECOIN[0]]; // Load coin image from cache
    }

    /**
     * Draws the coin on the canvas at its current position.
     * 
     * @function
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
