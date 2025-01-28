/**
 * Endboss class representing a boss enemy character in the game.
 * This class extends the MovableObject class and handles all behaviors related to the Endboss, including movement, attack, animations, and interactions with the player.
 */
class Endboss extends MovableObject {
    speed = 7;
    height = 450;
    width = 300;
    y = 10;
    x = 4300;
    offsetX = 20;
    offsetY = 80;
    offsetWidth = 70;
    offsetHeight = 100;
    endbossHealth = 100;
    isWalking = true;
    isAlert = false;
    isAttack = false;
    isHurt = false;
    isDead = false;
    reallyDead = false;
    hasPlayedDeathSound = false;
    hasResetAnimation = false;
    endbossHurt_sound = AudioManager.endbossHurt_sound;
    endbossDead_sound = AudioManager.endbossDead_sound;
    endbossFight_sound = AudioManager.endbossFight_sound;
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
    IMAGE_ATTACK_STANCE = [
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
        this.loadImages(this.IMAGE_ATTACK_STANCE);
        this.loadImages(this.IMAGE_HURT);
        this.loadImages(this.IMAGE_DEAD);
    }

   /**
     * Creates an instance of the Endboss class.
     */
   constructor() {
    super().loadImage(this.IMAGE_ALERT[0]);
    this.loadAllImages();
    this.animate();
    AnimationManager.register(this);
}

       /**
     * Loads all images for the Endboss in different states.
     * @returns {void}
     */
       loadAllImages() {
        this.loadImages(this.IMAGE_ALERT);
        this.loadImages(this.IMAGE_WALKING);
        this.loadImages(this.IMAGE_ATTACK_STANCE);
        this.loadImages(this.IMAGE_HURT);
        this.loadImages(this.IMAGE_DEAD);
    }

    /**
     * Initiates the Endboss's animations, including walking, attacking, and hurt animations.
     * Sets up intervals for movement and attack behaviors.
     * @returns {void}
     */
    animate() {
        this.setupWalkingInterval();
        this.setupAttackInterval();
        this.setupEndbossAnimation();
    }

    /**
     * Sets up an interval to handle the Endboss's walking animation and movement.
     * @returns {void}
     */
    setupWalkingInterval() {
        const walkingInterval = setInterval(() => {
            if (this.isWalking) {
                this.randomMovement();
                this.playAnimation(this.IMAGE_WALKING);
            } else if (!this.isDead) {
                this.endbossFight_sound.play();
                this.randomMovementWhileAttacking();
                this.playAnimation(this.IMAGE_WALKING);
            }
        }, 500);
        AnimationManager.addInterval(walkingInterval);
    }

    /**
     * Sets up an interval for handling the Endboss's attack behavior.
     * The Endboss attacks randomly at intervals.
     * @returns {void}
     */
    setupAttackInterval() {
        const attackInterval = () => {
            const delay = Math.random() * (2000 - 1000) + 1000;
            setTimeout(() => {
                if (this.isAlert && !this.isDead) {
                    this.randomAttack();
                    world.fireFireball();
                    world.fireFireball();
                }
                attackInterval();
            }, delay);
        };
        attackInterval();
    }

    /**
     * Sets up an interval to handle the Endboss's various animation states (hurt, attack, alert, and dead).
     * @returns {void}
     */
    setupEndbossAnimation() {
        const endbossAnimationInterval = setInterval(() => {
            if (this.isDead) return this.endbossDead();
            if (this.isHurt) { this.endbossHurt(); }
            else if (this.isAttack) {
                this.playAnimation(this.IMAGE_ATTACK_STANCE);
            } else if (this.isAlert) {
                this.playAnimation(this.IMAGE_ALERT);
            }
        }, 200);
        AnimationManager.addInterval(endbossAnimationInterval);
    }

    /**
     * Handles random movement of the Endboss.
     * Moves the Endboss left or right based on random direction.
     * @returns {void}
     */
    randomMovement() {
        const randomDirection = Math.random() < 0.5 ? -1 : 1;
        this.speed = randomDirection * 2;
        const newX = this.x + this.speed;
        if (newX >= 4000 && newX <= 4600) this.x = newX;
        this.otherDirection = randomDirection === 1;
    }

    /**
     * Handles movement of the Endboss while in attack mode.
     * Moves the Endboss left or right with higher speed during attack.
     * @returns {void}
     */
    randomMovementWhileAttacking() {
        const randomSpeed = Math.random() < 0.5 ? -1 : 1;
        this.speed = randomSpeed * 6;
        const newX = this.x + this.speed;
        if (newX >= 4100 && newX <= 4500) this.x = newX;
        this.otherDirection = false;
    }

    /**
     * Initiates a random attack behavior for the Endboss.
     * Sets the Endboss in attack mode for a short period.
     * @returns {void}
     */
    randomAttack() {
        this.isAlert = false;
        this.isAttack = true;
        setTimeout(() => {
            this.isAttack = false;
            this.isAlert = true;
        }, 5000);
    }

    /**
     * Plays the Endboss's hurt animation and sound.
     * The Endboss plays a hurt animation and sound when taking damage.
     * @returns {void}
     */
    endbossHurt() {
        if (!this.isDead) {
            this.isAlert = false;
            this.endbossHurt_sound.play();
            this.playAnimation(this.IMAGE_HURT);
            setTimeout(() => {
                this.isHurt = false;
                this.isAlert = true;
            }, 400);
        }
    }

    /**
     * Handles the Endboss's death animation and behavior.
     * Plays the death sound and switches to the dead animation.
     * @returns {void}
     */
    endbossDead() {
        this.resetStates();
        if (!this.hasResetAnimation) {
            this.resetAnimationOnce();
        }
        this.playDeathSoundOnce();
        if (!this.reallyDead) {
            this.endbossFight_sound.pause();
            this.playAnimation(this.IMAGE_DEAD);
            setTimeout(() => {
                this.reallyDead = true;
            }, this.IMAGE_DEAD.length * 160);
        }
    }

    /**
     * Resets the Endboss's states to their default values (walking, alert, attack, hurt).
     * @returns {void}
     */
    resetStates() {
        this.isWalking = false;
        this.isAlert = false;
        this.isAttack = false;
        this.isHurt = false;
    }

    /**
     * Resets the Endboss's animation once when it dies.
     * @returns {void}
     */
    resetAnimationOnce() {
        this.resetAnimation();
        this.hasResetAnimation = true;
    }

    /**
     * Plays the Endboss's death sound once.
     * @returns {void}
     */
    playDeathSoundOnce() {
        if (!this.hasPlayedDeathSound) {
            this.endbossDead_sound.play();
            this.hasPlayedDeathSound = true;
        }
    }
}