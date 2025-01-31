let canvas; // The canvas element for rendering the game.
let world; // The game world instance.
let keyboard = new Keyboard(); // An instance of the Keyboard class to track key presses.
pausedGame = false; // Flag indicating whether the game is paused.
select_sound = AudioManager.select_sound; // Select sound from the AudioManager.

/**
 * Plays the select sound.
 * Resets the current time of the select sound and plays it from the beginning.
 * @returns {void}
 */
function playSelectSound() {
    select_sound.currentTime = 0;
    select_sound.play();
}

/**
 * Initializes the game by setting up the canvas, world, and binding button events.
 * @returns {void}
 */
function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
    bindBtsPressEvents();
}

/**
 * Event listener for keydown events to track key presses and update the keyboard state.
 * Handles movement, actions like throwing bottles, and pausing the game.
 * @param {KeyboardEvent} event - The keydown event.
 * @returns {void}
 */
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
    if (event.key === 'p') {
        if (!world.gameOver) {
            world.gamePaused = !world.gamePaused;
            if (world.gamePaused) {
                pauseGame();
            } else {
                resumeGame();
            }
        }
    }
});

/**
 * Pauses the game by stopping animations and sounds.
 */
function pauseGame() {
    pausedGame = true;
    AnimationManager.pauseAll();
    world.endboss.endbossFight_sound.pause();
    world.inGameMusic_sound.pause();
}

/**
 * Resumes the game by restarting animations.
 */
function resumeGame() {
    pausedGame = false;
    AnimationManager.resumeAll();
}

/**
 * Binds touch events to mobile buttons for controlling the game.
 * The buttons control movement (left, right), jumping, and throwing bottles.
 * @returns {void}
 */
function bindBtsPressEvents() {
    mobileBtnLeftStart();
    mobileBtnLeftEnd();
    mobileBtnRightStart();
    mobileBtnRightEnd();
    mobileBtnThrowStart();
    mobileBtnThrowEnd();
    mobileBtnJumpStart();
    mobileBtnJumpEnd();
}

/**
 * Binds the touchstart event for the left movement button.
 */
function mobileBtnLeftStart() {
    document.getElementById('mobile-btn-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    }, { passive: false });
}

/**
 * Binds the touchend event for the left movement button.
 */
function mobileBtnLeftEnd() {
    document.getElementById('mobile-btn-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    }, { passive: false });
}

/**
 * Binds the touchstart event for the right movement button.
 */
function mobileBtnRightStart() {
    document.getElementById('mobile-btn-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    }, { passive: false });
}

/**
 * Binds the touchend event for the right movement button.
 */
function mobileBtnRightEnd() {
    document.getElementById('mobile-btn-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    }, { passive: false });
}

/**
 * Binds the touchstart event for the throw button.
 */
function mobileBtnThrowStart() {
    document.getElementById('mobile-btn-throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (!keyboard.B) {
            keyboard.B = true;
            world.throwBottle();
        }
    }, { passive: false });
}

/**
 * Binds the touchend event for the throw button.
 */
function mobileBtnThrowEnd() {
    document.getElementById('mobile-btn-throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.B = false;
    }, { passive: false });
}

/**
 * Binds the touchstart event for the jump button.
 */
function mobileBtnJumpStart() {
    document.getElementById('mobile-btn-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    }, { passive: false });
}

/**
 * Binds the touchend event for the jump button.
 */
function mobileBtnJumpEnd() {
    document.getElementById('mobile-btn-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    }, { passive: false });
}
/**
 * Event listener for keyup events to track key releases and update the keyboard state.
 * Resets the state for movement keys and other actions when the keys are released.
 * @param {KeyboardEvent} event - The keyup event.
 * @returns {void}
 */
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
    if (event.key == 'p') {
        keyboard.P = false;
    }
});
