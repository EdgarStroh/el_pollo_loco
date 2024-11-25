class Endboss extends MovableObject {
    height = 450;
    width = 300;
    y = 10;
    x = 2400;
    offsetX = 20;
    offsetY = 80;
    offsetWidth =70;
    offsetHeight = 100;
    // energy = 10;

    IMAGE_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor() {
        super().loadImage(this.IMAGE_WALKING[0]);
        this.loadImages(this.IMAGE_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGE_WALKING);
        }, 200);
    }
    // hit() {
    //     if (!this.getDamage) {  // Schaden nur anwenden, wenn getDamage false ist
    //         this.energy -= 40;
    //         console.log("soviel energy hast du noch, " + this.energy);
            
    //         this.getDamage = true;
    //         this.lastHit = new Date().getTime();
    //         //   console.log("bekomme Schaden " + this.getDamage);
            
    //         if (this.energy < 0) {
    //             this.energy = 0;
    //         }
    //     }
    // }
}