class Chicken extends MovableObject {
    height = 80;
    y = 345;
    offsetX = 0;
    offsetY = 0;
    offsetWidth = 0;
    offsetHeight = 0;
    chickenHealth = 5;
    isDead = false;
    IMAGE_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    loadAllImages() {
        this.loadImages(this.IMAGE_WALKING);
        this.loadImages(this.IMAGE_DEAD);
    }

    walking_sound = new Audio('audio/chicken.mp3');

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.x = 280 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.loadAllImages();
    }

    animate() {
        setInterval(() => {
            if (this.isDead) return; // Wenn das Huhn tot ist, nichts mehr tun
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead) return; // Wenn das Huhn tot ist, nichts mehr tun
            this.playAnimation(this.IMAGE_WALKING);
        }, 220);
    }

    /**
     * Markiert das Huhn als "tot" und entfernt es nach 5 Sekunden.
     */
    die() {
        if (this.isDead) return; // Stelle sicher, dass die Methode nur einmal aufgerufen wird
        this.isDead = true;
        this.moveStop(); // Stoppt die Bewegung
        this.playAnimation(this.IMAGE_DEAD); // Spielt die Dead-Animation ab
        setTimeout(() => this.removeChicken(), 500); // Entfernt das Huhn nach 5 Sekunden
    }

    /**
     * Entfernt das Huhn aus der Level-Array-Liste.
     */
    removeChicken() {
        const index = level1.enemies.indexOf(this); // Sucht das Huhn im Array der Gegner
        if (index > -1) {
            level1.enemies.splice(index, 1); // Entfernt das Huhn aus der Gegnerliste
            console.log('Chicken removed from the game');
        }
    }
}
