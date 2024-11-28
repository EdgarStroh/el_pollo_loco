class Endboss extends MovableObject {
    height = 450;
    width = 300;
    y = 10;
    x = 2400;
    offsetX = 20;
    offsetY = 80;
    offsetWidth =70;
    enemyHealth = 25;
    offsetHeight = 100;
    endbossHealth = 40;

    IMAGE_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGE_WALKING =[
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGE_ATTACK =[
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGE_HURT =[
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGE_DEAD =[
        'img/4_enemie_boss_chicken/4_hurt/G24.png',
        'img/4_enemie_boss_chicken/4_hurt/G25.png',
        'img/4_enemie_boss_chicken/4_hurt/G26.png',
    ];

    loadAllImages() {
        this.loadImages(this.IMAGE_ALERT);
        this.loadImages(this.IMAGE_WALKING);
        this.loadImages(this.IMAGE_ATTACK);
        this.loadImages(this.IMAGE_HURT);
        this.loadImages(this.IMAGE_DEAD);
    }

    constructor() {
        super().loadImage(this.IMAGE_ALERT[0]);
        this.loadAllImages();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGE_ALERT);
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