class Endboss extends MovableObject {
    speed = 7;
    height = 450;
    width = 300;
    y = 10;
    x = 2400;
    offsetX = 20;
    offsetY = 80;
    offsetWidth = 70;
    // enemyHealth = 25;
    offsetHeight = 100;
    endbossHealth = 15;
    isWalking = true;
    isAlert = false;
    isAttack = false;
    isHurt = false;
    isDead = false;
    reallyDead = false;
    endbossHurt_sound = new Audio('audio/endbossHurt.mp3');
    endbossDead_sound = new Audio('audio/endbossDead.mp3');
    IMAGE_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGE_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGE_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGE_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGE_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    loadAllImages() {
        this.loadImages(this.IMAGE_ALERT);
        this.loadImages(this.IMAGE_WALKING);
        this.loadImages(this.IMAGE_ATTACK);
        this.loadImages(this.IMAGE_HURT);
        this.loadImages(this.IMAGE_DEAD);
    }

    constructor() {
        super().loadImage(this.IMAGE_ALERT[0]);
        this.loadAllImages();
        this.animate();
        this.endbossStatus();
    }

    animate() {
        this.endbossHurt_sound.volume = 0.3;
        setInterval(() => {
            if (this.isWalking) {
                this.randomMovement(); // Zufällige Richtung bestimmen
                this.playAnimation(this.IMAGE_WALKING);
            }
        }, 500); // Alle 1 Sekunde entscheidet der Endboss, wohin er geht



        setInterval(() => {
            if (this.isDead) {
                this.endbossDead();
                return;
            } else if (this.isAlert) {
                this.playAnimation(this.IMAGE_ALERT); // Alarm-Animation
                this.otherDirection = false; // Nach links

            } else if (this.isHurt) {
                this.endbossHurt();
                this.endbossHurt_sound.play();
            } else if (this.isAttack) {
                this.playAnimation(this.IMAGE_ATTACK); // Angriff-Animation
                this.otherDirection = false; // Nach links
            }
        }, 200);

    }


    endbossStatus() {

    }

    endbossHurt() {
        //HIER muss im allgeminen noch das timeout resetet werden falls endboss im hurt animation ist 
        if (!this.isDead) {
            this.otherDirection = false; // Nach links
            this.isAlert = false;
            this.playAnimation(this.IMAGE_HURT); // Spiele die "Hurt"-Animation
            setTimeout(() => {
                this.isHurt = false; // Setze isHurt nach 250ms auf false
                this.isAlert = true;
                // console.log(this.isHurt);
            }, 400);
        }
    }

    endbossDead() {
        this.endbossDead_sound.volume = 0.3;
        this.otherDirection = false;
        this.isWalking = false;
        this.isAlert = false;
        this.isAttack = false;
        this.isHurt = false;
    
        if (!this.hasResetAnimation) {
            this.resetAnimation(); 
            this.hasResetAnimation = true;
        }
    
        this.playAnimation(this.IMAGE_DEAD);
    
        if (!this.hasPlayedDeathSound) {
            this.endbossDead_sound.play();
            this.hasPlayedDeathSound = true; 
        }
    
        setTimeout(() => {
            this.reallyDead = true;
            this.currentImage = 2;
        }, this.IMAGE_DEAD.length * 80);
    }
    


    randomMovement() {
        const randomDirection = Math.random() < 0.5 ? -1 : 1; // Zufällig -1 (links) oder 1 (rechts)
        this.speed = randomDirection * 2; // Geschwindigkeit auf ±2 setzen

        // Bewegung innerhalb der Grenzen
        const newX = this.x + this.speed;
        if (newX >= 2200 && newX <= 2600) {
            this.x = newX; // Neue Position innerhalb der Grenzen
        }
        if (randomDirection === 1) {
            this.otherDirection = true; // Nach rechts
        } else {
            this.otherDirection = false; // Nach links
        }
    }
}