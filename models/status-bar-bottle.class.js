/**
 * Represents a status bar that displays the current number of bottles.
 * The status bar is drawn on the canvas at a specific position, showing the bottle image and amount.
 * 
 * @extends DrawableObject
 */
class StatusBarBottle extends DrawableObject {
    /**
     * @type {Array<string>}
     * An array containing the path to the image of the bottle.
     * @default ['img/6_salsa_bottle/salsa_bottle.png']
     */
    IMAGEBOTTLE = [
        '/img/6_salsa_bottle/salsa_bottle.png'
    ];

    /**
     * @type {number}
     * The amount of bottles to be displayed in the status bar.
     */
    bottleAmount = 35;

    /**
     * Creates an instance of the `StatusBarBottle` class.
     * This initializes the image, position, and size of the bottle icon.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGEBOTTLE);
        this.x = 34;
        this.y = 55;
        this.width = 55;
        this.height = 55;
        this.img = this.imageCache[this.IMAGEBOTTLE[0]];
    }

    /**
     * Draws the status bar bottle image and the current bottle amount onto the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The 2D drawing context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);      
        ctx.fillText(this.bottleAmount, this.x + this.width + 0, this.y + 35);
    }
}
