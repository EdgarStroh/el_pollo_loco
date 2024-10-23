class StatusBarBottle extends DrawableObject {
    IMAGEBOTTLE = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];
    bottleAmount = 95;
    constructor() {
        super();
        this.loadImages(this.IMAGEBOTTLE);
        this.x = 34;
        this.y = 55;
        this.width = 55;
        this.height = 55;
        this.img = this.imageCache[this.IMAGEBOTTLE[0]];
    }
 
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.fillText(this.bottleAmount, this.x + this.width + 0, this.y + 35);
    }
   
}
