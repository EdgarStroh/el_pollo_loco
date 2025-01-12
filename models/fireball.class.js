class Fireball extends MovableObject {

    IMAGE_FIREBALL = [
        'img/4_enemie_boss_chicken/endbossAttack/endbossAttack_01.png',
        'img/4_enemie_boss_chicken/endbossAttack/endbossAttack_02.png',
        'img/4_enemie_boss_chicken/endbossAttack/endbossAttack_03.png',
        'img/4_enemie_boss_chicken/endbossAttack/endbossAttack_04.png',
        'img/4_enemie_boss_chicken/endbossAttack/endbossAttack_05.png',
        'img/4_enemie_boss_chicken/endbossAttack/endbossAttack_06.png',
        'img/4_enemie_boss_chicken/endbossAttack/endbossAttack_07.png',
    ];
    constructor(x, y, otherDirection) {
        super().loadImage('img/4_enemie_boss_chicken/endbossAttack/endbossAttack_01.png');
        this.loadImages(this.IMAGE_FIREBALL);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        // this.direction = direction; // Richtung: 1 für rechts, -1 für links
        // this.width = 50;
        // this.height = 30;
    }

    launch() {
        this.animate();
    }
    render(ctx) {
        ctx.drawImage(this.image, this.x, this.y); // Zeichne den Feuerball
    }
    animate() {
        const moveInterval = setInterval(() => {
            this.x += this.speed;
            if (this.x < 0 || this.x > 3000) { // Wenn der Feuerball das Spiel verlässt, beende das Intervall
                clearInterval(moveInterval);
            }
        }, 30); // Alle 30ms bewegen sich die Feuerbälle
    }

}