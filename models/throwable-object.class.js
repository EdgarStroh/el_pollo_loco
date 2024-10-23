class ThrowableObject extends MovableObject {
    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 90;
        this.otherDirection = otherDirection;  // speichere die Richtung
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            // Bewege die Flasche nach links oder rechts basierend auf otherDirection
            if (this.otherDirection) {
                this.x -= 10; // nach links werfen
            } else {
                this.x += 10; // nach rechts werfen
            }
        }, 25);
    }
}