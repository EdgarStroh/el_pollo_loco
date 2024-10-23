class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    cloudImages = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];
    static fixedXPositions = [10, 800, 1600, 2500]; // Feste Positionen

    constructor(index) {
        super();
        let randomImage = this.cloudImages[Math.floor(Math.random() * this.cloudImages.length)];
        this.loadImage(randomImage);
        
        // Setze die X-Position basierend auf dem übergebenen Index
        this.x = Cloud.fixedXPositions[index]; // Feste Position basierend auf dem Index
        
        this.animate();
        this.speed = Math.random() * 0.57;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 10);
    }
}

// Instanziierung der Wolken
let clouds = [];
for (let i = 0; i < Cloud.fixedXPositions.length; i++) {
    clouds.push(new Cloud(i)); // Wolken an festen Positionen erstellen
}
