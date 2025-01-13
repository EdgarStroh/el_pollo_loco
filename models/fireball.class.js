class Fireball extends MovableObject {
    speedX = 6;
    speedY = 3;
    // offsetWidth = 25;
    // offsetHeight = 25;
    height = 60;
    width = 60;
    IMAGE_FIREBALL = [
        'img/4_enemie_boss_chicken/endbossAttack/endbossAttack_01.png',
        'img/4_enemie_boss_chicken/endbossAttack/endbossAttack_02.png',
        'img/4_enemie_boss_chicken/endbossAttack/endbossAttack_03.png',
        'img/4_enemie_boss_chicken/endbossAttack/endbossAttack_04.png',
        'img/4_enemie_boss_chicken/endbossAttack/endbossAttack_05.png',
        'img/4_enemie_boss_chicken/endbossAttack/endbossAttack_06.png',
        'img/4_enemie_boss_chicken/endbossAttack/endbossAttack_07.png',
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGE_FIREBALL[0]); // Initiales Bild
        this.loadImages(this.IMAGE_FIREBALL);
        this.x = x;
        this.y = y;
        // this.speedX = 5; // Geschwindigkeit des Fireballs nach links
        this.animate(); // Startet die Animation des Fireballs
    }

    move() {
        // Fireball bewegt sich kontinuierlich nach links
        this.x -= this.speedX;
        this.y += this.speedY;
    }

    animate() {
        const fireballMoveAnimation   = setInterval(() => {
            this.move(); // Bewegung des Fireballs
        }, 1000 / 60); // 60 FPS für flüssige Bewegung
        AnimationManager.addInterval(fireballMoveAnimation); 

        const fireballAnimation  = setInterval(() => {
            this.playAnimation(this.IMAGE_FIREBALL); // Spielt die Animation ab
        }, 100); // Bildwechsel alle 100ms
        AnimationManager.addInterval(fireballAnimation); 
    }
}
