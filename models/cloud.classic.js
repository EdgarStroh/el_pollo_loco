class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    world;
    cloudImages = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];
    static fixedXPositions = [10, 800, 1600, 2500]; // Feste Positionen

    constructor(index, world) {
        super();
        this.world = world; // Now world is set
        let randomImage = this.cloudImages[Math.floor(Math.random() * this.cloudImages.length)];
        this.loadImage(randomImage);

        // Setze die X-Position basierend auf dem übergebenen Index
        this.x = Cloud.fixedXPositions[index]; // Feste Position basierend auf dem Index

        this.animate();
        this.speed = 0.05 + Math.random() * 0.27;
    }

    animate() {
        let cloudInterval = setInterval(() => {
            this.moveLeft();
        }, 10);
        // console.log(this.world.pushIntervall);
        
        // clearAllIntervals();
        // this.world.pushIntervall(cloudInterval);// Use the passed `world` object here
    }
}

