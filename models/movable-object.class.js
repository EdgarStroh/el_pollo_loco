class MovableObject extends DrawableObject {
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    getDamage = false;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {

            return this.y < 130;
        }

    }

    isColliding(obj) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y + this.offsetY + this.height) >= obj.y &&
            (this.y + this.offsetY) <= (obj.y + obj.height);
    }

    hit() {
        if (!this.getDamage) {  // Schaden nur anwenden, wenn getDamage false ist
            this.energy -= 10;
            this.getDamage = true;
            this.lastHit = new Date().getTime();
            //  console.log("bekomme Schaden " + this.getDamage);
            
            if (this.energy < 0) {
                this.energy = 0;
            }
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        console.log(this.energy);

        if (timepassed >= 0.95) {
            this.getDamage = false;
            // console.log("kein dmg" + this.getDamage);     
        }

        return timepassed < 0.95;
    }

    isDead() {
        return this.energy == 0;
    }

    resetAnimation() {
        this.currentImage = 0; // Setzt die aktuelle Bildnummer auf 0 zurück
    }

    playAnimation(images) {
        // Stelle sicher, dass die Animation zurückgesetzt wird, bevor sie abgespielt wird
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;

        // this.walking_sound.play();
    }
    moveLeft() {
        this.x -= this.speed;
        // this.otherDirection = true;
    }


}