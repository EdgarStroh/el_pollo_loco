class MovableObject {
    x = 120;
    y = 330;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.1;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    playAnimation(images){
        let i = this.currentImage % this.IMAGE_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        console.log('Moving right');
    }
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            //chicken walk
            // this.walking_sound.play();
            // this.walking_sound.volume = 0.001;
        }, 1000 / 60);
    }
}