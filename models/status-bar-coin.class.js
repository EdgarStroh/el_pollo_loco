class StatusBarCoin extends DrawableObject {
    IMAGECOIN = [
        'img/8_coin/coin_1.png',
    ];
    constructor() {
        super();
        this.loadImages(this.IMAGECOIN);
        this.x = 6;
        this.y = 74;
        this.width = 110;
        this.height = 110;
        this.img = this.imageCache[this.IMAGECOIN[0]];
    }
    coinAmount = 0;
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.fillText(this.coinAmount, this.x + this.width - 26.8, this.y + 59);
    }
}