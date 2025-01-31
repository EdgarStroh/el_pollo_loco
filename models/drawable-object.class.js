/**
 * Represents an object that can be drawn on the canvas with an image.
 * Provides methods to load and draw images, as well as manage image frames.
 * 
 * @class
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 330;
    height = 100;
    width = 100;
    offsetX = 0;
    offsetY = 0;
    offsetWidth = 0;
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
