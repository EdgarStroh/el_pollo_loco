/**
 * @namespace
 * @description Manages the sounds and music for the game.
 */
window.AudioManager = {
    endbossHurt_sound: new Audio('../audio/endbossHurt.mp3'),
    endbossDead_sound: new Audio('../audio/endbossDead.mp3'),
    endbossFight_sound: new Audio('../audio/BossMusic.mp3'),
    pepeSnoring_sound: new Audio('../audio/snoringPepe.mp3'),
    walking_sound: new Audio('../audio/walk.mp3'),
    jump_sound: new Audio('../audio/jump.mp3'),
    pepeDead_sound: new Audio('../audio/dead.mp3'),
    hurt_sound: new Audio('../audio/hurt.mp3'),
    bottleEmpty_sound: new Audio('../audio/error.mp3'),
    coin_sound: new Audio('../audio/coin.mp3'),
    bottlePickUp_sound: new Audio('../audio/pickUpBottle.mp3'),
    bottleThrow_sound: new Audio('../audio/bottleThrow.mp3'),
    bottleBreak_sound: new Audio('../audio/bottleBreak.mp3'),
    jumpOnEnemy_sound: new Audio('../audio/jumpOnEnemy.mp3'),
    fireball_sound: new Audio('../audio/fireball.mp3'),
    inGameMusic_sound: new Audio('../audio/InGameMusic.mp3'),
    gameOver_sound: new Audio('../audio/gameOver.mp3'),
    youWon_sound: new Audio('../audio/youWon.mp3'),
    select_sound: new Audio('../audio/select.mp3'),

    /**
     * Initializes the audio settings, such as volume levels, for all sounds.
     * @returns {void}
     */
    init() {
        this.endbossHurt_sound.volume = 0.15;
        this.endbossDead_sound.volume = 0.15;
        this.endbossFight_sound.volume = 0.10; //.10
        this.pepeSnoring_sound.volume = 0.08;
        this.walking_sound.volume = 0.05;
        this.jump_sound.volume = 0.05;
        this.pepeDead_sound.volume = 0.08;
        this.hurt_sound.volume = 0.05;
        this.bottleEmpty_sound.volume = 0.09;
        this.coin_sound.volume = 0.06;
        this.bottlePickUp_sound.volume = 0.06;
        this.bottleThrow_sound.volume = 0.03;
        this.bottleBreak_sound.volume = 0.25;
        this.jumpOnEnemy_sound.volume = 0.25;
        this.fireball_sound.volume = 0.05;
        this.inGameMusic_sound.volume = 0.05;//.05
        this.gameOver_sound.volume = 0.05;
        this.youWon_sound.volume = 0.05;
        this.select_sound.volume = 0.05;
    },
};

/**
 * Flag indicating whether sounds are muted or not.
 * @type {boolean}
 */
let isMuted = false;

/**
 * Toggles the sound mute status and updates the button image.
 * Mutes or unmutes all audio elements managed by the AudioManager.
 * @returns {void}
 */
function toggleSounds() {
    isMuted = !isMuted;
    muteOrUnmuteAudio(isMuted);
    updateButtonImage(isMuted);
}

/**
 * Mutes or unmutes all audio elements in the AudioManager based on the mute status.
 * @param {boolean} muteStatus - The status for muting (true to mute, false to unmute).
 * @returns {void}
 */
function muteOrUnmuteAudio(muteStatus) {
    for (let key in AudioManager) {
        if (AudioManager.hasOwnProperty(key) && AudioManager[key] instanceof Audio) {
            AudioManager[key].muted = muteStatus;
        }
    }
    world.bottleToThrow.forEach(bottle => {
        if (bottle.sound) {
            bottle.sound.muted = muteStatus;
        }
    });
}

/**
 * Updates the image of the sound toggle button based on the mute status.
 * @param {boolean} muteStatus - The mute status (true for muted, false for unmuted).
 * @returns {void}
 */
function updateButtonImage(muteStatus) {
    const buttonImage = muteStatus ? '../icons/mute.png' : '../icons/unmute.png';
    document.querySelector('.sound-btn img').src = buttonImage;
}
AudioManager.init();
