endbossFight_sound = AudioManager.endbossFight_sound;
inGameMusic_sound = AudioManager.inGameMusic_sound;
/**
 * Hides the start screen, buttons overlay, and sound button.
 * @returns {void}
 */
function hideStartscreen() {
    const startscreen = document.getElementById('startscreen');
    const buttonsOverlay = document.getElementById('buttonsOverlay');
    const soundBtn = document.getElementById('sound-btn');
    if (startscreen && buttonsOverlay && soundBtn) {
        startscreen.style.display = 'none';
        buttonsOverlay.style.display = 'none';
        soundBtn.style.display = 'flex';
    }
}

/**
 * Shows the start screen, resets the game environment, and displays start screen elements.
 * @returns {void}
 */
function showStartscreen() {
    resetGameEnvironment();
    displayStartscreenElements();
    hideEndGameScreens();
}
/**
 * Restartet das Spiel, indem das Spielfeld zurückgesetzt und das Level neu erstellt wird.
 * Diese Funktion setzt das Spielumfeld zurück, zeigt die Startbildschirm-Elemente an und versteckt
 * die Endspiel-Bildschirme. Danach wird das Level erneut erstellt und das Spiel gestartet.
 * 
 * @function
 * @returns {void} Diese Funktion gibt keinen Wert zurück.
 */
function restartGame() {
    resetGameEnvironment();
    displayStartscreenElements();
    hideEndGameScreens();
    hideStartscreen();
    createLevel(); 
    init();
    this.gameStart = true;
}

/**
 * Starts the game by hiding the start screen, creating the level, and initializing the game environment.
 * @returns {void}
 */
function startGame() {
    hideStartscreen();
    createLevel(); // Level wird hier erstellt
    init();
    this.gameStart = true;
}

/**
 * Resets the game environment, deleting the current level, resetting the level data,
 * and resetting any music or animations.
 * @returns {void}
 */
function resetGameEnvironment() {
    deleteLevel();
    resetLevel();
    AnimationManager.reset();
    resetBossFightMusic();
    resetInGameMusic();
}

/**
 * Displays the elements on the start screen such as the start screen, buttons overlay, and sound button.
 * @returns {void}
 */
function displayStartscreenElements() {
    setElementDisplay('startscreen', 'block');
    setElementDisplay('buttonsOverlay', 'flex');
    setElementDisplay('sound-btn', 'none');
    addClassToElement('mainMenuBtn', 'hidden');
}

/**
 * Hides the "You Won" and "Game Over" screens.
 * @returns {void}
 */
function hideEndGameScreens() {
    addClassToElement('youwon', 'hidden'); // Hide "You Won" screen
    addClassToElement('gameover', 'hidden'); // Hide "Game Over" screen
}

/**
 * Sets the display style of an element based on its ID.
 * @param {string} elementId - The ID of the element to modify.
 * @param {string} displayValue - The display value (e.g., 'block', 'none', etc.).
 * @returns {void}
 */
function setElementDisplay(elementId, displayValue) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = displayValue;
    }
}

/**
 * Adds a specified class to an element based on its ID.
 * @param {string} elementId - The ID of the element to modify.
 * @param {string} className - The class to add to the element.
 * @returns {void}
 */
function addClassToElement(elementId, className) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add(className);
    }
}

/**
 * Deletes the current game level by nullifying the world object and clearing the canvas.
 * @returns {void}
 */
function deleteLevel() {
    world = null;
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

/**
 * Resets the current level by clearing enemies, coins, bottles, clouds, and background objects.
 * @returns {void}
 */
function resetLevel() {
    if (level1) {
        level1.enemies = [];
        level1.coins = [];
        level1.bottles = [];
        level1.clouds = [];
        level1.backgroundObjects = [];
    }
}

/**
 * Opens the "How To Play" overlay.
 * @returns {void}
 */
function openHowToPlay() {
    document.getElementById('howToPlayOverlay').classList.remove('hidden');
}

/**
 * Closes the "How To Play" overlay.
 * @returns {void}
 */
function closeHowToPlay() {
    document.getElementById('howToPlayOverlay').classList.add('hidden');
}

/**
 * Resets the in-game music by pausing and setting the current time to 0.
 * @returns {void}
 */
function resetInGameMusic() {
    this.inGameMusic_sound.currentTime = 0;
    this.inGameMusic_sound.pause();
}

/**
 * Resets the boss fight music by pausing and setting the current time to 0.
 * @returns {void}
 */
function resetBossFightMusic() {
    this.endbossFight_sound.currentTime = 0;
    this.endbossFight_sound.pause();
}

/**
 * Creates the game level, including enemies, coins, bottles, clouds, and background objects.
 * @returns {void}
 */
function createLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new ChickenLittle(),
            new ChickenLittle(),
            new Endboss()
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
        ],
        [
            new Cloud(0),
            new Cloud(1),
            new Cloud(2),
            new Cloud(3),
            new Cloud(4),
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719,),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719,),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7),
        ]
    );
}
