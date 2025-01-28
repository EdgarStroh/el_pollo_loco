/**
 * Represents a background object that is movable within the game.
 * Inherits from the `MovableObject` class.
 * 
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {

    /** @type {number} Width of the background object */
    width = 720;

    /** @type {number} Height of the background object */
    height = 480;

    /**
     * Creates an instance of the `BackgroundObject`.
     * 
     * @param {string} imagePath - The path to the image representing the background object.
     * @param {number} x - The initial x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
