/**
 * Represents a status bar that displays the health percentage of the player.
 * The health is displayed as an image that changes based on the percentage value.
 * 
 * @extends DrawableObject
 */
class StatusBarHealth extends DrawableObject {
    /**
     * @type {Array<string>}
     * An array containing the paths to the images representing different health percentages.
     */
    IMAGESHEALTH = [
        '/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        '/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        '/img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        '/img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        '/img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        '/img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];
    percentage = 100;

    /**
     * Creates an instance of the `StatusBarHealth` class.
     * Initializes the position, size, and image of the health status bar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGESHEALTH);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the health percentage and updates the health bar image accordingly.
     * 
     * @param {number} percentage - The health percentage to be set (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGESHEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current health percentage.
     * The image index corresponds to the health levels in the `IMAGESHEALTH` array.
     * 
     * @returns {number} The index of the image in the `IMAGESHEALTH` array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 20) {
            return 1;
        } else if (this.percentage == 0) {
            return 0;
        }
    }
}
