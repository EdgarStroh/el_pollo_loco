class Cloud extends MovableObject {
    static cloudIntervals = []; // Liste aller Cloud-Intervalle
    y = 20;
    width = 500;
    height = 250;
    cloudImages = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];
    static fixedXPositions = [10, 800, 1600, 2500];

    constructor(index) {
        super();
        let randomImage = this.cloudImages[Math.floor(Math.random() * this.cloudImages.length)];
        this.loadImage(randomImage);

        this.x = Cloud.fixedXPositions[index];
        this.speed = 0.05 + Math.random() * 0.27;

        this.animate();
    }

    animate() {
        let cloudInterval = setInterval(() => {
            this.moveLeft();
        }, 10);
        Cloud.cloudIntervals.push(cloudInterval); // Speichere das Intervall
    }
}
