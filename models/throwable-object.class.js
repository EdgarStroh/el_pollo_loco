class ThrowableObject extends MovableObject {
    offsetX = 10;
    offsetY = 20;
    offsetWidth = 25;
    offsetHeight = 25;
    // bottleSound;
    IMAGE_BOTTLE_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_BOTTLE_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;  // speichere die Richtung
        this.throw();
        this.hasResetAnimation = false; // Standardmäßig nicht zurückgesetzt
        // this.bottleSound = new Audio('audio/bottleThrow.mp3');  // path to your sound file

        // Start the sound for this specific bottle when thrown
        
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        // Intervall für die Bewegung speichern
        this.movementInterval = setInterval(() => {
            // Bewege die Flasche nach links oder rechts basierend auf otherDirection
            if (this.otherDirection) {
                this.throwLeft();
            } else {
                this.throwRight();
            }
        }, 55);
    }

    throwLeft() {
        this.playAnimation(this.IMAGE_BOTTLE_ROTATE);
        this.x -= 15; // nach links werfen
    }
    throwRight() {
        this.playAnimation(this.IMAGE_BOTTLE_ROTATE);
        this.x += 15; // nach rechts werfen
    }
    // stopThrowingSound() {
    //     if (this.bottleSound) {
    //         this.bottleSound.pause(); 
    //         this.bottleSound.currentTime = 0;
    //     }
    // }
    animateSplash() {
        this.stopMovement();
        if (!this.hasResetAnimation) {
            this.resetAnimation(); // Index zurücksetzen
            this.hasResetAnimation = true; // Markieren, dass die Animation zurückgesetzt wurde
        }
        this.playAnimation(this.IMAGES_SPLASH);
    }

    // animateSplashGround() {
    //     this.stopMovement();
    //     if (!this.hasResetAnimation) {
    //         this.resetAnimation(); // Index zurücksetzen
    //         this.hasResetAnimation = true; // Markieren, dass die Animation zurückgesetzt wurde
    //     }
    //     this.playAnimation(this.IMAGES_SPLASH);
    // }


    stopMovement() {
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null; // Intervall-Referenz zurücksetzen
        }
    }

}