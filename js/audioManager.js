// AudioManager als globales Objekt definieren
window.AudioManager = {
    endbossHurt_sound: new Audio('audio/endbossHurt.mp3'),
    endbossDead_sound: new Audio('audio/endbossDead.mp3'),
    endbossFight_sound: new Audio('audio/BossMusic.mp3'),
    pepeSnoring_sound: new Audio('audio/snoringPepe.mp3'),
    walking_sound: new Audio('audio/walk.mp3'),
    jump_sound: new Audio('audio/jump.mp3'),
    pepeDead_sound: new Audio('audio/dead.mp3'),
    hurt_sound: new Audio('audio/hurt.mp3'),
    bottleEmpty_sound: new Audio('audio/error.mp3'),
    coin_sound: new Audio('audio/coin.mp3'),
    bottlePickUp_sound: new Audio('audio/pickUpBottle.mp3'),
    bottleThrow_sound: new Audio('audio/bottleThrow.mp3'),
    bottleBreak_sound: new Audio('audio/bottleBreak.mp3'),
    jumpOnEnemy_sound: new Audio('audio/jumpOnEnemy.mp3'),
    fireball_sound: new Audio('audio/fireball.mp3'),
    inGameMusic_sound: new Audio('audio/InGameMusic.mp3'),
    lobbyMusic_sound: new Audio('audio/lobbyMusic.mp3'),
    gameOver_sound: new Audio('audio/gameOver.mp3'),
    youWon_sound: new Audio('audio/youWon.mp3'),

    init() {
        this.endbossHurt_sound.volume = 0.15;
        this.endbossDead_sound.volume = 0.15;
        this.endbossFight_sound.volume = 0.10;
        this.pepeSnoring_sound.volume = 0.0;      // 0.1
        this.walking_sound.volume = 0.05;
        this.jump_sound.volume = 0.05;
        this.pepeDead_sound.volume = 0.1;
        this.hurt_sound.volume = 0.05;
        this.bottleEmpty_sound.volume = 0.09;
        this.coin_sound.volume = 0.06;
        this.bottlePickUp_sound.volume = 0.06;
        this.bottleThrow_sound.volume = 0.03;
        this.bottleBreak_sound.volume = 0.25;
        this.jumpOnEnemy_sound.volume = 0.25;
        this.fireball_sound.volume = 0.05;
        this.inGameMusic_sound.volume = 0.05;
        this.lobbyMusic_sound.volume = 0.05;
        this.gameOver_sound.volume = 0.05;
        this.youWon_sound.volume = 0.05;
    },
};
let isMuted = false; // Zustand, ob die Sounds stummgeschaltet sind oder nicht

function toggleSounds() {
    // Wechsle zwischen gemutet und ungemutet
    isMuted = !isMuted;

    // Setze den mute-Status für alle Audio-Objekte in AudioManager
    muteOrUnmuteAudio(isMuted);

    // Ändere das Bild im Button je nach Zustand
    updateButtonImage(isMuted);
}

function muteOrUnmuteAudio(muteStatus) {
    for (let key in AudioManager) {
        if (AudioManager.hasOwnProperty(key) && AudioManager[key] instanceof Audio) {
            AudioManager[key].muted = muteStatus;
        }
    }

    // Sounds für geworfene Flaschen aktualisieren
    world.bottleToThrow.forEach(bottle => {
        if (bottle.sound) {
            bottle.sound.muted = muteStatus;
        }
    });


}

function updateButtonImage(muteStatus) {
    const buttonImage = muteStatus ? 'icons/mute.png' : 'icons/unmute.png';
    document.querySelector('.sound-btn img').src = buttonImage;
}

// Initialisierung direkt nach der Definition ausführen
AudioManager.init();
