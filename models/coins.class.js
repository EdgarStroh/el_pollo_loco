class Coin extends DrawableObject {
    IMAGECOIN = [
        'img/8_coin/coin_1.png',
    ];
    constructor() {
        super();
        this.loadImages(this.IMAGECOIN);
        this.x = 16;
        this.y = 174;
        this.width = 110;
        this.height = 110;
        this.img = this.imageCache[this.IMAGECOIN[0]];
    }
}