let canvas;
let world;
// world = null;
let keyboard = new Keyboard();
// MO = new MovableObject();
pausedGame = false;

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
        if (!world.gamePaused) {
            world.gamePaused = true;
            world.clearAllIntervals();
            world.pauseBottleSounds();
        } else {
            world.resumeGame();
        }
    }
    if (event.key == 'l') {
        keyboard.L = true;
    }
    if (event.key === 'p') {
        world.gamePaused = !world.gamePaused;

        if (world.gamePaused) {
            pausedGame = true;
            // world.pauseBottleSounds();
            // console.log("Game paused");
            AnimationManager.pauseAll(); // Alle Animationen pausieren
        } else {
            pausedGame = false;
            // console.log(pausedGame);
            // console.log("Game resumed");
            AnimationManager.resumeAll(); // Alle Animationen fortsetzen
        }
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
        keyboard.ESC = false;
    }
    if (event.key == 'l') {
        keyboard.L = false;
    }
    if (event.key == 'p') { // Taste P losgelassen
        keyboard.P = false;
    }
});
