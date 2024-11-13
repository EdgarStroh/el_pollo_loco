class ThrowableObject extends MovableObject {
    IMAGE_BOTTLE_ROTATE= [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_BOTTLE_ROTATE);
        this.x = x;
        this.y = y;   
        this.otherDirection = otherDirection;  // speichere die Richtung
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            // Bewege die Flasche nach links oder rechts basierend auf otherDirection
            if (this.otherDirection) {
                this.playAnimation(this.IMAGE_BOTTLE_ROTATE);
                this.x -= 15; // nach links werfen
            } else {
                this.playAnimation(this.IMAGE_BOTTLE_ROTATE);
                this.x += 15; // nach rechts werfen
            }
        }, 55);
    }
}