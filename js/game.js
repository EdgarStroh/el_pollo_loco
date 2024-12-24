let canvas;
let world;
// world = null;
let keyboard = new Keyboard();
MO = new MovableObject();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
    // console.log('My character is ', world.character);
}

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39 || event.key == 'd') {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37 || event.key == 'a') {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 40 || event.key == 's') {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 38 || event.key == 'w') {
        keyboard.UP = true;
    }
    if ((event.key == 'b' || event.key == 'q') && !keyboard.B) {
        keyboard.B = true;
        world.throwBottle();
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.key == 'Escape') {
        keyboard.ESC = true;
        if (event.key === "Escape") {
            if (!world.gamePaused) {
                // world.pauseGame(); // Spiel pausieren
                world.gamePaused = true;
                world.clearAllIntervals();
                world.pauseAllSounds();
            } else {
                // world.gamePaused = false;
                world.resumeGame(); // Spiel fortsetzen
            }
        }
    }

    if (event.key == 'l') { // Taste L gedrückt
        keyboard.L = true;

    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39 || event.key == 'd') {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37 || event.key == 'a') {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 40 || event.key == 's') {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 38 || event.key == 'w') {
        keyboard.UP = false;
    }
    if (event.key == 'b' || event.key == 'q') {
        keyboard.B = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.key == 'Escape') {
        keyboard.ESC = false; // Escape-Taste losgelassen
    }
    if (event.key == 'l') { // Taste L losgelassen
        keyboard.L = false;
    }
});
