class StatusBarBottle extends DrawableObject {
    IMAGEBOTTLE = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];
    constructor() {
        super();
        this.loadImages(this.IMAGEBOTTLE);
        this.x = 140;
        this.y = 10;
        this.width = 200;
        this.height = 260;
      
    }
}