class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 330;
    height = 100;
    width = 100;
    offsetX = 0;
    offsetY = 0;
    offsetWidth = 0;
    offsetHeight = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        // if (this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof Coin || this instanceof ThrowableObject || this instanceof Endboss) {
        //     ctx.beginPath();
        //     ctx.lineWidth = "5";
        //     ctx.strokeStyle = "blue";
        //     ctx.rect(
        //         this.x + this.offsetX,
        //         this.y + this.offsetY,
        //         this.width - this.offsetWidth,
        //         this.height - this.offsetHeight
        //     );
        //     ctx.stroke();
        // }
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}