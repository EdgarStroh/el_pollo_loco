class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObject = [];
    bottleThrown = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            //Check collision
            this.checkCollisions();
            // this.checkThrowObjects();
        }, 200);
    }
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                // console.log('characker energy=', this.character.energy);
            }
        });
    }
    // checkThrowObjects() {
    //     if (this.keyboard.B && !this.bottleThrown) {
    //         // Werfe eine Flasche, wenn B gedrückt wurde und noch keine Flasche geworfen wurde
    //         let bottle = new ThrowableObject(this.character.x + 45, this.character.y + 125);
    //         this.throwableObject.push(bottle);
    //         this.bottleThrown = true;  // Setze das Flag auf "Flasche wurde geworfen"
    //     }
    //     if (!this.keyboard.B) {
    //         this.bottleThrown = false;
    //     }
    // }

    throwBottle() {
        let bottle = new ThrowableObject(this.character.x + 45, this.character.y + 125);
        this.throwableObject.push(bottle);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);// Back
        //--------Space for fixed Object-----
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0); // Forwards

        this.addToMap(this.character)
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);


        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}