class Chicken extends MovableObject {
    height = 80;
    y = 345;
    
    IMAGE_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    walking_sound = new Audio('audio/chicken.mp3');

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGE_WALKING);

        this.x = 280 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);

        // this.walking_sound.volume = 0.001;
        // this.walking_sound.play();
        setInterval(() => {
            this.playAnimation(this.IMAGE_WALKING);
            
        }, 220);
    }
}