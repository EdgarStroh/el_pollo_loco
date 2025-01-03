class Bottle extends MovableObject {
    offsetX = 40;
    offsetY = 20;
    offsetWidth = 70;
    offsetHeight = 30;
    IMAGEBOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    // intervals = [];
    constructor() {
        super();
        this.loadImages(this.IMAGEBOTTLE);
        this.x = Math.random() * (3000 - 500) + 200; // Adjust this range as needed
        this.y = 25 + 300  * Math.random(); // Adjust height
        this.width = 110;
        this.height = 110;
        this.img = this.imageCache[this.IMAGEBOTTLE[0]]; // Set initial image
        this.startImageChange();

        AnimationManager.register(this);
    }

    startImageChange() {
        let currentIndex = 0;
        const imageChangeInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % this.IMAGEBOTTLE.length;
            this.img = this.imageCache[this.IMAGEBOTTLE[currentIndex]];
        }, 500);
    
        AnimationManager.addInterval(imageChangeInterval); // Intervall im Manager registrieren
    }
    

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // pause() {
    //     this.intervals.forEach(clearInterval);
    //     this.intervals = [];
    // }

    resume() {
        this.startImageChange();
    }
}
