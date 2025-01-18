class Fireball extends MovableObject {
    speedX = Math.random() * (7 - 5) + 4; // Zufällige Zahl zwischen 5 und 6
    speedY = Math.random() * (5 - 1) + 2.5; // Zufällige Zahl zwischen 1.5 und 4
    height = 60;
    width = 60;
    offsetWidth = 50;
    offsetHeight = 25; 
    offsetX = 15;
    offsetY = 0;
  
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
        this.lastTimestamp = null;
        this.totalPauseDuration = 0;
        this.pauseStart = null;
        this.isPaused = false;
    }

    move() {
        // Fireball bewegt sich kontinuierlich nach links
        this.x -= this.speedX;
        this.y += this.speedY;
    }

    animate(timestamp) {
        if (!this.totalPauseDuration) this.totalPauseDuration = 0; // Gesamte Pausendauer initialisieren
        if (!this.lastTimestamp) this.lastTimestamp = timestamp; // Startzeit setzen
        if (pausedGame) {
            if (!this.pauseStart) this.pauseStart = timestamp; // Start der Pause
            requestAnimationFrame(this.animate.bind(this));
            return;
        }

        if (this.pauseStart) {
            // Berechne die gesamte Pausendauer
            this.totalPauseDuration += timestamp - this.pauseStart;
            this.pauseStart = null;
        }

        const effectiveTimestamp = timestamp - this.totalPauseDuration;
        const deltaTime = (effectiveTimestamp - this.lastTimestamp) / 1000; // Zeit seit dem letzten Frame
        this.lastTimestamp = effectiveTimestamp;

        // Bewege den Fireball kontinuierlich
        this.move();

        // Animationslogik: Wechsel der Bilder
        this.i = this.i || 0; // Frame-Zähler initialisieren
        this.i += deltaTime * 1000;
        if (this.i >= 100) { // Alle 100 ms Bild wechseln
            this.i = 0;
            this.playAnimation(this.IMAGE_FIREBALL);
        }

        requestAnimationFrame(this.animate.bind(this));
    }

}
