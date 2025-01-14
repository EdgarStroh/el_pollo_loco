class ChickenLittle extends MovableObject {
    height = 50;
    width = 50;
    y = 370;
    offsetX = 8;
    offsetY = -7;
    offsetWidth = 40;
    offsetHeight = 0;
    chickenHealth = 5;
    isDead = false;
    // walking_sound = new Audio('audio/chicken.mp3');
    // world = new World;

    IMAGE_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    loadAllImages() {
        this.loadImages(this.IMAGE_WALKING);
        this.loadImages(this.IMAGE_DEAD);
    }
    // intervals = []; // Speicher für Animations-Intervalle
   

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.x = 280 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.loadAllImages();

        // AnimationManager registrieren
        AnimationManager.register(this);
    }

    animate() {
        const moveInterval = setInterval(() => {
            if (this.isDead) return; // Animation stoppen, wenn das Objekt "tot" ist
            this.moveLeft();
         
            this.otherDirection = false;
        }, 1000 / 40);
        AnimationManager.addInterval(moveInterval); // Timer im Manager registrieren
    
        const animationInterval = setInterval(() => {
            if (this.isDead) return; // Animation stoppen, wenn das Objekt "tot" ist
            this.playAnimation(this.IMAGE_WALKING);
        }, 220);
        AnimationManager.addInterval(animationInterval); // Timer im Manager registrieren
    }
   

    // pause() {
    //     this.intervals.forEach(clearInterval); // Stoppt alle Intervalle
    //     this.intervals = [];
    // }

    resume() {
        this.animate(); // Startet die Animationen neu
    }

    die() {
        if (this.isDead) return;
        this.isDead = true;
        // this.pause(); // Stoppt die Bewegung
        this.playAnimation(this.IMAGE_DEAD);
        setTimeout(() => this.removeChicken(), 500);
    }

    removeChicken() {
        const index = level1.enemies.indexOf(this);
        if (index > -1) {
            level1.enemies.splice(index, 1);
        }
    }
}
