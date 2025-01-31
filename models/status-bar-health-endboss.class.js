/**
 * Represents the health status bar for the Endboss, displaying its health percentage.
 * The health bar becomes visible only when the boss takes damage.
 * 
 * @extends StatusBarHealth
 */
class StatusBarHealthEndboss extends StatusBarHealth {
    /**
     * List of image paths representing different health states of the Endboss.
     * @type {string[]}
     * @private
     */
    IMAGESHEALTH = [
        '../img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];

    /**
     * Indicates whether the health bar is visible.
     * @type {boolean}
     * @private
     */
    isVisible = false;

    /**
     * Creates an instance of `StatusBarHealthEndboss`.
     * Initializes the position, size, and image of the Endboss health bar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGESHEALTH);
        this.x = 400;
        this.y = 8;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the health percentage and updates the corresponding health bar image.
     * The health bar becomes visible when the percentage is below 100.
     * 
     * @param {number} percentage - The health percentage to be set (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        if (percentage < 100) { 
            this.isVisible = true;
        }
        let path = this.IMAGESHEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image corresponding to the current health percentage.
     * 
     * @returns {number} The index of the image in the `IMAGESHEALTH` array.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 10) { 
            return 1;
        } else {
            return 0;  
        }
    }

    /**
     * Draws the health bar if it is visible.
     * 
     * @param {CanvasRenderingContext2D} ctx - The rendering context where the health bar is drawn.
     */
    draw(ctx) {
        if (this.isVisible) { 
            super.draw(ctx);
        }
    }
}
