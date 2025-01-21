class MovableObject extends DrawableObject {
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    myHealth = 100;
    enemyHealth = 0;
    lastHit = 0;
    getDamage = false;
    intervals = [];
    // AnimationManager.register(this);
    hurt_sound = AudioManager.hurt_sound;

    // sayHello() {
    //     console.log('Hallo');

    // }

    applyGravity() {
        // const gravityInterval = 
        setInterval(() => {
            // console.log(World.gamePaused);

            if (pausedGame) return;
            // console.log(World.gamePaused);
            if (this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25);
        //  AnimationManager.addInterval(gravityInterval); // Intervall im Manager registrieren
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {

            return this.y < 130;
        }

    }

    theGround() {
        return this.y > 310;
    }

    isColliding(obj) {
        // Anpassung der Hitbox bei Blickrichtung
        const offsetX = this.otherDirection ? this.offsetX - 20 : this.offsetX;
        const width = this.otherDirection ? this.width + 25 : this.width;

        // Kollisionserkennung
        return (
            this.x + offsetX + width - this.offsetWidth >= obj.x + obj.offsetX && // Rechte Kante von this
            this.x + offsetX <= obj.x + obj.offsetX + obj.width - obj.offsetWidth && // Linke Kante von this
            this.y + this.offsetY + this.height - this.offsetHeight >= obj.y + obj.offsetY && // Unterkante von this
            this.y + this.offsetY <= obj.y + obj.offsetY + obj.height - obj.offsetHeight // Oberkante von this
        );

        //     // return (
        //     //     this.x + this.width >this.mo.x &&
        //     //     this.y + this,height > this.mo.y &&
        //     //     this.x < this.mo.x + this.mo.width &&
        //     //     this.y < this.mo.y + this.mo.height
        //     // )

        //     return (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) &&
        //         (this.Y + this.offsetY + this.height) >= obj.Y &&
        //         (this.Y + this.offsetY) <= (obj.Y + obj.height)
        // }

        // isColliding(obj){
        // return  this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
        //         this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
        //         this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
        //         this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    }

    hit() {
        // this.hurt_sound.volume = 0.05;
        if (!this.getDamage && this.myHealth > 0) {
            this.myHealth -= 20;
            this.getDamage = true;
            this.hurt_sound.play();
            this.lastHit = new Date().getTime();


        }
        if (this.myHealth <= 0) {
            this.myHealth = 0;
            // this.hurt_sound.pause();
            // this.playDeathSound();  // Play the death sound when health reaches 0
        }
    }

    // playDeathSound() {
    //     this.pepeDead_sound.volume = 0.08;
    //     this.pepeDead_sound.play(); // Play the death sound
    // }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        if (timepassed >= 1.0) {
            this.getDamage = false;
            // console.log("kein dmg" + this.getDamage);     
        }
        return timepassed < 1.0;
    }

    isDead() {
        // this.showGameOverScreen();
        return this.myHealth == 0;
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
        if (window.gameStart) {
            this.x -= this.speed;
            // this.otherDirection = true;
        }
    }

    moveStop() {
        this.speed = 0;
    }


}