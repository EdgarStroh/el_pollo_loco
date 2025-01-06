class ThrowableObject extends MovableObject {
    offsetX = 10;
    offsetY = 20;
    offsetWidth = 25;
    offsetHeight = 25;
    speedX = 400;  // Horizontale Geschwindigkeit
    speedY = -650;  // Anfangsgeschwindigkeit nach oben (vertikal)
    gravity = 1350;  // Schwerkraft (Beschleunigung nach unten)
    // isMoving = true; // Status, ob die Flasche in Bewegung ist
    lastTimestamp = 0;
    pauseStart = null; // Zeitstempel, wann das Spiel pausiert wurde
    totalPauseDuration = 0; // Gesamtdauer aller Pausen
    i = 0;  // Zeit-Variable, die du nach Bedarf ändern kannst
    imageChangeInterval = 52;  // Intervall in Millisekunden, nach dem das Bild wechseln soll
    isAnimatingSplash = false; // Standardmäßig keine Splash-Animation
    hasResetAnimation = false; // Standardmäßig nicht zurückgesetzt
    IMAGE_BOTTLE_ANIMATION = [
    ];

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
    intervals = [];

    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_BOTTLE_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.throw(); // Wurf starten
    }

    throw() {
        // this.isMoving = true;
        this.animateThrow(0); // Starte die Animation
    }

    animateThrow(timestamp) {
        if (pausedGame) {
            if (!this.pauseStart) this.pauseStart = timestamp;
            requestAnimationFrame(this.animateThrow.bind(this));
            return;
        }

        if (this.pauseStart) {
            this.totalPauseDuration += timestamp - this.pauseStart;
            this.pauseStart = null;
        }

        if (!this.lastTimestamp) this.lastTimestamp = timestamp;
        const effectiveTimestamp = timestamp - this.totalPauseDuration;
        const deltaTime = (effectiveTimestamp - this.lastTimestamp) / 1000;
        this.lastTimestamp = effectiveTimestamp;

        if (!this.isAnimatingSplash) {
            // Nur Rotationsanimation ausführen, wenn keine Splash-Animation aktiv ist
            this.applyGravity(deltaTime);
            this.updatePosition(deltaTime);

            this.i += deltaTime * 1000;
            if (this.i >= this.imageChangeInterval) {
                this.i = 0;
                this.playAnimation(this.IMAGE_BOTTLE_ROTATE);
            }
        }

        requestAnimationFrame(this.animateThrow.bind(this));
    }



    applyGravity(deltaTime) {
        // Hier wird die Schwerkraft auf die vertikale Geschwindigkeit angewendet
        this.speedY += this.gravity * deltaTime;
    }

    updatePosition(deltaTime) {
        // Horizontale Bewegung (konstante Geschwindigkeit)
        this.x += (this.otherDirection ? -1 : 1) * this.speedX * deltaTime;

        // Vertikale Bewegung (durch Schwerkraft beeinflusst)
        this.y += this.speedY * deltaTime;

        // Wenn die Flasche den Boden erreicht, stoppen wir sie und zeigen die Splash-Animation
        // if (this.y >= this.groundLevel) {
        //     this.y = this.groundLevel;
        // this.isMoving = false;
        // this.animateSplash();
        // }
    }

    animateSplash() {
        if (!this.isAnimatingSplash) {
            this.resetAnimation(); // Index zurücksetzen
            this.isAnimatingSplash = true; // Markieren, dass die Animation zurückgesetzt wurde
        }
        this.playAnimation(this.IMAGES_SPLASH);
    }
    
}
