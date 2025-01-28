/**
 * Represents a status bar that displays the current number of coins.
 * The status bar is drawn on the canvas at a specific position, showing the coin image and amount.
 * 
 * @extends DrawableObject
 */
class StatusBarCoin extends DrawableObject {
    /**
     * @type {Array<string>}
     * An array containing the path to the image of the coin.
     * @default ['img/8_coin/coin_1.png']
     */
    IMAGECOIN = [
        'img/8_coin/coin_1.png',
    ];

    /**
     * Creates an instance of the `StatusBarCoin` class.
     * This initializes the image, position, and size of the coin icon.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGECOIN);
        this.x = 6;
        this.y = 74;
        this.width = 110;
        this.height = 110;
        this.img = this.imageCache[this.IMAGECOIN[0]];
    }

    /**
     * @type {number}
     * The amount of coins to be displayed in the status bar.
     * @default 0
     */
    coinAmount = 0;

    /**
     * Draws the status bar coin image and the current coin amount onto the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The 2D drawing context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.fillText(this.coinAmount, this.x + this.width - 26.8, this.y + 59);
    }
}
