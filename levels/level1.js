
let gameStart = false;
inGameMusic_sound = AudioManager.inGameMusic_sound;
endbossFight_sound = AudioManager.endbossFight_sound;
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
function showStartscreen() {
    deleteLevel(); // Welt löschen
    resetLevel();  // Level zurücksetzen
    AnimationManager.reset();
    resetBossFightMusic();
    resetInGameMusic();
    const startscreen = document.getElementById('startscreen');
    const buttonsOverlay = document.getElementById('buttonsOverlay');
    const soundBtn = document.getElementById('sound-btn');
    const mainMenuBtn = document.getElementById('mainMenuBtn');

    startscreen.style.display = 'block';
    buttonsOverlay.style.display = 'flex';
    soundBtn.style.display = 'none';
    mainMenuBtn.classList.add('hidden');
//win Screen
    const youWonImage = document.getElementById('youwon');
    youWonImage.classList.add('hidden');
    //game over screen
    const gameOverImage = document.getElementById('gameover');
    gameOverImage.classList.add('hidden');

}

function deleteLevel() {
    world = null;
    // Canvas leeren
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function resetLevel() {
    if (level1) {
        level1.enemies = [];
        level1.coins = [];
        level1.bottles = [];
        level1.clouds = [];
        level1.backgroundObjects = [];
    }
}

function openHowToPlay() {
    document.getElementById('howToPlayOverlay').classList.remove('hidden');
}

function closeHowToPlay() {
    document.getElementById('howToPlayOverlay').classList.add('hidden');
}

function resetInGameMusic() {
    this.inGameMusic_sound.currentTime = 0;
    this.inGameMusic_sound.pause();
}

function resetBossFightMusic() {
    this.endbossFight_sound.currentTime = 0;
    this.endbossFight_sound.pause();
}

function startGame() {
    hideStartscreen();
    createLevel(); // Level wird hier erstellt
    init();
    this.gameStart = true;
}


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
        ],

    );
}