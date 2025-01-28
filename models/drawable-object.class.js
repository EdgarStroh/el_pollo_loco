/**
 * Represents an object that can be drawn on the canvas with an image.
 * Provides methods to load and draw images, as well as manage image frames.
 * 
 * @class
 */
class DrawableObject {
    /** 
     * The current image being used by the object.
     * @type {HTMLImageElement}
     */
    img;

    /** 
     * Cache of loaded images.
     * @type {Object<string, HTMLImageElement>}
     */
    imageCache = {};

    /** 
     * The index of the current image in the animation sequence.
     * @type {number}
     * @default 0
     */
    currentImage = 0;

    /** 
     * The X coordinate of the object.
     * @type {number}
     * @default 120
     */
    x = 120;

    /** 
     * The Y coordinate of the object.
     * @type {number}
     * @default 330
     */
    y = 330;

    /** 
     * The height of the object.
     * @type {number}
     * @default 100
     */
    height = 100;

    /** 
     * The width of the object.
     * @type {number}
     * @default 100
     */
    width = 100;

    /** 
     * The X offset used when drawing the object.
     * @type {number}
     * @default 0
     */
    offsetX = 0;

    /** 
     * The Y offset used when drawing the object.
     * @type {number}
     * @default 0
     */
    offsetY = 0;

    /** 
     * The width offset used when drawing the object.
     * @type {number}
     * @default 0
     */
    offsetWidth = 0;

    /** 
     * The height offset used when drawing the object.
     * @type {number}
     * @default 0
     */
    offsetHeight = 0;

    /**
     * Loads an image from the given path and sets it as the object's current image.
     * 
     * @param {string} path - The path to the image file.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the given canvas context at its current position and size.
     * 
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws the object's frame (bounding box) on the canvas, used for debugging purposes.
     * The code for drawing the frame is commented out, but can be enabled by uncommenting the relevant lines.
     * 
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
     * @returns {void}
     */
    drawFrame(ctx) {
        // if (this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof Coin || this instanceof ThrowableObject || this instanceof Endboss) 
        //   if(this instanceof Fireball || this instanceof Chicken  || this instanceof Character)  
        //     {
        //     ctx.beginPath();
        //     ctx.lineWidth = "2";
        //     ctx.strokeStyle = "blue";
        //     ctx.rect(
        //         this.x + this.offsetX,
        //         this.y + this.offsetY,
        //         this.width - this.offsetWidth,
        //         this.height - this.offsetHeight
        //     );
        //     ctx.stroke();
        // }
    }

    /**
     * Loads an array of images into the image cache.
     * 
     * @param {string[]} arr - An array of image file paths to load.
     * @returns {void}
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
