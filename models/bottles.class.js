class Bottle extends MovableObject {
    IMAGEBOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGEBOTTLE);
        this.x = Math.random() * (3000 - 500) + 200; // Adjust this range as needed
        this.y = 250 * Math.random(); // Adjust height
        this.width = 110;
        this.height = 110;
        this.img = this.imageCache[this.IMAGEBOTTLE[0]]; // Set initial image
        this.startImageChange();
    }

    startImageChange() {
        let currentIndex = 0;
        setInterval(() => {
            currentIndex = (currentIndex + 1) % this.IMAGEBOTTLE.length;
            this.img = this.imageCache[this.IMAGEBOTTLE[currentIndex]];
        }, 500);
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
