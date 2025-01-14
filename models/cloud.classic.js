class Cloud extends MovableObject {
    static fixedXPositions = [10, 1800, 2600, 3700, 4800];

    y = 20;
    width = 500;
    height = 250;
    cloudImages = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];
    intervals = []; // Speicher für Cloud-Intervalle

    constructor(index) {
        super();
        let randomImage = this.cloudImages[Math.floor(Math.random() * this.cloudImages.length)];
        this.loadImage(randomImage);

        this.x = Cloud.fixedXPositions[index];
        this.speed = 0.05 + Math.random() * 0.27;

        this.animate();

        // Registrierung im AnimationManager
        AnimationManager.register(this);
    }

    animate() {
        const cloudInterval = setInterval(() => {
            this.moveLeft();
        }, 10);
        // Speichere den Timer im Manager
        AnimationManager.addInterval(cloudInterval);
    }

    // pause() {
    //     this.intervals.forEach(clearInterval); // Stoppe alle Intervalle
    //     this.intervals = [];
    // }

    resume() {
        this.animate(); // Starte die Animationen neu
    }
}
