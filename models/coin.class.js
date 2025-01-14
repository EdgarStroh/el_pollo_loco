class Coin extends MovableObject {
    offsetX = 40;
    offsetY = 40;
    offsetWidth = 80;
    offsetHeight = 80;
    IMAGECOIN = [
        'img/8_coin/coin_1.png',
    ];
    constructor() {
        super();
        this.loadImages(this.IMAGECOIN);
        this.x = Math.random() * (3000 - 500) + 2100;
        this.y = 80 + 250  * Math.random();
        this.width = 110;
        this.height = 110;
        this.img = this.imageCache[this.IMAGECOIN[0]];
    }
    draw(ctx) {
        // console.log("Zeichne Coin bei x:", this.x, "y:", this.y);

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // console.log(this.y);
    }
}