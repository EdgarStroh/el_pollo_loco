// AudioManager als globales Objekt definieren
window.AudioManager = {
    endbossHurt: new Audio('audio/endbossHurt.mp3'),
    endbossDead: new Audio('audio/endbossDead.mp3'),
    pepeSnoring_sound: new Audio('audio/snoringPepe.mp3'),
    walking_sound: new Audio('audio/walk.mp3'),
    jump_sound: new Audio('audio/jump.mp3'),
    pepeDead_sound: new Audio('audio/dead.mp3'),
    hurt_sound: new Audio('audio/hurt.mp3'),
    bottleEmpty_sound: new Audio('audio/error.mp3'),
    coin_sound: new Audio('audio/coin.mp3'),
    bottlePickUp_sound: new Audio('audio/pickUpBottle.mp3'),
    bottleThrow_sound: new Audio('audio/bottleThrow.mp3'),
    // bottleBreak_sound: new Audio('audio/bottleBreak.mp3'),

    init() {
        this.endbossHurt.volume = 0.15;
        this.endbossDead.volume = 0.15;
        this.pepeSnoring_sound.volume = 0.0;      // 0.1
        this.walking_sound.volume = 0.05;
        this.jump_sound.volume = 0.05;
        this.pepeDead_sound.volume = 0.1;
        this.hurt_sound.volume = 0.05;
        this.bottleEmpty_sound.volume = 0.09;
        this.coin_sound.volume = 0.06;
        this.bottlePickUp_sound.volume = 0.06;
        this.bottleThrow_sound.volume = 0.05;
        // this.bottleBreak_sound.volume = 0.1;
    },
};
let isMuted = false; // Zustand, ob die Sounds stummgeschaltet sind oder nicht

function toggleSounds() {
    // Wechsle zwischen gemutet und ungemutet
    isMuted = !isMuted;

    // Setze den mute-Status für jeden Audio-Sound
    for (let key in AudioManager) {
        if (AudioManager.hasOwnProperty(key) && AudioManager[key] instanceof Audio) {
            AudioManager[key].muted = isMuted;
        }
    }

    // Ändere das Bild im Button je nach Zustand
    const buttonImage = isMuted ? 'icons/mute.png' : 'icons/unmute.png';
    document.querySelector('.sound-btn img').src = buttonImage;
}

// Initialisierung direkt nach der Definition ausführen
AudioManager.init();
