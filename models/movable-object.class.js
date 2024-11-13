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
        return (
            (this.x + this.offsetX + this.width - this.offsetWidth) >= (obj.x + obj.offsetX) && // Rechtskante von this erreicht oder überschreitet linke Kante von obj
            (this.x + this.offsetX) <= (obj.x + obj.offsetX + obj.width - obj.offsetWidth) &&   // Linke Kante von this ist vor oder auf der rechten Kante von obj
            (this.y + this.offsetY + this.height - this.offsetHeight) >= (obj.y + obj.offsetY) && // Unterkante von this erreicht oder überschreitet obere Kante von obj
            (this.y + this.offsetY) <= (obj.y + obj.offsetY + obj.height - obj.offsetHeight)     // Oberkante von this ist vor oder auf der Unterkante von obj
        );
    }

    // isColliding(mo){
    // return  this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
    //         this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
    //         this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
    //         this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    // }

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
        if (timepassed >=  1.4) {
            this.getDamage = false;
            // console.log("kein dmg" + this.getDamage);     
        }
        return timepassed < 1.4;
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