class Character extends MovableObject {
    height = 300;
    y = 130;
    speed = 10;
    isJumping = false;
    noLife = false;
    offsetX = 10;
    offsetY = 130;
    offsetWidth = 35;
    offsetHeight = 140;
    pepeSnoring_sound = AudioManager.pepeSnoring_sound;
    walking_sound = AudioManager.walking_sound;
    jump_sound= AudioManager.jump_sound;
    pepeDead_sound = AudioManager.pepeDead_sound;
    // intervals = [];
    timeoutIds = []; // Array zum Speichern von Timeout-IDs
    savedState = {}; // Speichert den Zustand für Pause/Resume
    IMAGE_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGE_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGE_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGE_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    IMAGE_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGE_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    // Neue Sprungphasen-Animationen
    IMAGE_JUMP_START_1 = ['img/2_character_pepe/3_jump/J-31.png'];
    IMAGE_JUMP_START_2 = ['img/2_character_pepe/3_jump/J-32.png'];
    IMAGE_JUMP_START_3 = ['img/2_character_pepe/3_jump/J-33.png'];
    IMAGE_JUMP_UP = ['img/2_character_pepe/3_jump/J-34.png'];
    IMAGE_JUMP_DOWN_1 = ['img/2_character_pepe/3_jump/J-35.png'];
    IMAGE_JUMP_DOWN_2 = ['img/2_character_pepe/3_jump/J-36.png'];
    IMAGE_LANDING_1 = ['img/2_character_pepe/3_jump/J-37.png'];
    IMAGE_LANDING_2 = ['img/2_character_pepe/3_jump/J-38.png'];
    IMAGE_LANDING_3 = ['img/2_character_pepe/3_jump/J-39.png'];

 
    // Neue Dead-Animationen
    IMAGE_DEAD_1 = ['img/2_character_pepe/5_dead/D-51.png'];
    IMAGE_DEAD_2 = ['img/2_character_pepe/5_dead/D-52.png'];
    IMAGE_DEAD_3 = ['img/2_character_pepe/5_dead/D-53.png'];
    IMAGE_DEAD_4 = ['img/2_character_pepe/5_dead/D-54.png'];
    IMAGE_DEAD_5 = ['img/2_character_pepe/5_dead/D-55.png'];
    IMAGE_DEAD_6 = ['img/2_character_pepe/5_dead/D-56.png'];
    IMAGE_DEAD_7 = ['img/2_character_pepe/5_dead/D-57.png'];

    loadAllImages() {
        setInterval(() => {
            this.loadImages(this.IMAGE_IDLE);
            this.loadImages(this.IMAGE_IDLE_LONG);
            this.loadImages(this.IMAGE_WALKING);
            this.loadImages(this.IMAGE_JUMPING);
            this.loadImages(this.IMAGE_JUMP_START_1);
            this.loadImages(this.IMAGE_JUMP_START_2);
            this.loadImages(this.IMAGE_JUMP_START_3);
            this.loadImages(this.IMAGE_JUMP_UP);
            this.loadImages(this.IMAGE_JUMP_DOWN_1);
            this.loadImages(this.IMAGE_JUMP_DOWN_2);
            this.loadImages(this.IMAGE_LANDING_1);
            this.loadImages(this.IMAGE_LANDING_2);
            this.loadImages(this.IMAGE_LANDING_3);
            this.loadImages(this.IMAGE_DEAD);
            this.loadImages(this.IMAGE_DEAD_1);
            this.loadImages(this.IMAGE_DEAD_2);
            this.loadImages(this.IMAGE_DEAD_3);
            this.loadImages(this.IMAGE_DEAD_4);
            this.loadImages(this.IMAGE_DEAD_5);
            this.loadImages(this.IMAGE_DEAD_6);
            this.loadImages(this.IMAGE_DEAD_7);
    
            this.loadImages(this.IMAGE_HURT);
        }, 100);
    }

    currentAnimationState = null;
    world;
  

    constructor(world) {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadAllImages();
        this.applyGravity();
        this.animate();
        // this.timeoutIds = [];
        this.world = world;
        AnimationManager.register(this);
    }

    animate() {
        this.idleDuration = 0; 
        this.idleSwitchThreshold = 10000;

        const moveInterval = setInterval(() => {
            this.walking_sound.pause();
          
    
            // Move right
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.noLife) {
                this.moveRight();
                this.otherDirection = false;
    
                // Nur abspielen, wenn der Charakter nicht springt und nicht über dem Boden ist
                if (!this.isAboveGround() && !this.isJumping) {
                    this.walking_sound.play();
                }
            }
    
            // Move left
            if (this.world.keyboard.LEFT && this.x > 0 && !this.noLife) {
                this.moveLeft();
                this.otherDirection = true;
    
                // Nur abspielen, wenn der Charakter nicht springt und nicht über dem Boden ist
                if (!this.isAboveGround() && !this.isJumping) {
                    this.walking_sound.play();
                }
            }

            
            if (this.isHurt()) {
                this.IMAGE_HURT;
            }
    
            // Jump
            if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround() && !this.isHurt() && !this.isJumping && !this.noLife) {
                this.jump();
                this.playJumpAnimation();
                this.jump_sound.play();
            }
    
          
    
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        AnimationManager.addInterval(moveInterval); // Timer im Manager registrieren
    
    
    
        const animationInterval = setInterval(() => {
            let newAnimationState;
    
            if (this.isDead()) {
                newAnimationState = this.playDeadAnimation();
                this.idleDuration = 0; 
                return;
            } 
            else if (this.isHurt()) {
                newAnimationState = this.IMAGE_HURT;
                this.idleDuration = 0; 
                this.pepeSnoring_sound.pause();
            } else if (this.isAboveGround()) {
                this.idleDuration = 0; 
                return;
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                newAnimationState = this.IMAGE_WALKING;
                this.idleDuration = 0; 
            } else if (this.world.keyboard.Q || this.world.keyboard.B) {
                newAnimationState = this.IMAGE_IDLE;
                this.idleDuration = 0; 
            } else {
                if (this.idleDuration >= this.idleSwitchThreshold) {
                    newAnimationState = this.IMAGE_IDLE_LONG;
                    this.pepeSnoring_sound.play();
                } else {
                    newAnimationState = this.IMAGE_IDLE; 
                    this.idleDuration += 155; 
                    this.pepeSnoring_sound.pause();
                }
            }
    
            if (newAnimationState !== this.currentAnimationState) {
                this.resetAnimation(); 
                this.currentAnimationState = newAnimationState; 
            }
    
            this.playAnimation(newAnimationState); 
        }, 155);
        AnimationManager.addInterval(animationInterval); // Timer im Manager registrieren
    }
    
   playJumpAnimation() {
    if (this.isJumping ) return; // Verhindert die erneute Ausführung, wenn der Sprung läuft oder das Spiel pausiert ist
    this.isJumping = true;

    const jumpSequence = [
        { animation: this.IMAGE_JUMP_START_1, delay: 0 },
        { animation: this.IMAGE_JUMP_START_2, delay: 3 },
        { animation: this.IMAGE_JUMP_START_3, delay: 8 },
        { animation: this.IMAGE_JUMP_UP, delay: 10 },
        { animation: this.IMAGE_JUMP_DOWN_1, delay: 240 },
        { animation: this.IMAGE_JUMP_DOWN_2, delay: 420 },
        { animation: this.IMAGE_LANDING_1, delay: 640 },
        { animation: this.IMAGE_LANDING_2, delay: 740 },
        { animation: this.IMAGE_LANDING_3, delay: 750 }
    ];

    jumpSequence.forEach((frame) => {
        const jumpSequenceTimeout = setTimeout(() => {
            if (!this.world.gamePaused && this.isJumping) {
                this.playAnimation(frame.animation);
            }
        }, frame.delay);

        // Registriere den Timeout bei AnimationManager
        AnimationManager.addTimeout(jumpSequenceTimeout);
    });

    // Setze den Sprungstatus zurück nach der Animation
     setTimeout(() => {
        this.isJumping = false;
    }, 800);
   
}

    resume() {
        this.animate();
    }

    // setManagedTimeout(callback, delay) {
    //     if (this.world.gamePaused) return; // Verhindert die Ausführung von Timeouts, wenn das Spiel pausiert ist

    //     const timeoutId = setTimeout(() => {
    //         callback();
    //         this.timeoutIds = this.timeoutIds.filter(id => id !== timeoutId);
    //     }, delay);
    //     this.timeoutIds.push(timeoutId);
    // }

    stopMovement() {
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null; // Intervall-Referenz zurücksetzen
        }
    }

    playDeadAnimation() {
        if (this.noLife) return; // Prevent re-execution
        this.noLife = true;
        this.pepeDead_sound.play();

        const deadSequence = [
            { animation: this.IMAGE_DEAD_1, delay: 0 },
            { animation: this.IMAGE_DEAD_2, delay: 3 },
            { animation: this.IMAGE_DEAD_3, delay: 8 },
            { animation: this.IMAGE_DEAD_4, delay: 10 },
            { animation: this.IMAGE_DEAD_5, delay: 240 },
            { animation: this.IMAGE_DEAD_6, delay: 420 },
            { animation: this.IMAGE_DEAD_7, delay: 640 }
        ];

        deadSequence.forEach((frame) => {
            setTimeout(() => {
                this.playAnimation(frame.animation);
            }, frame.delay);
        });

        // Reset state after all dead animations are played
        setTimeout(() => {
            // Can add further logic like resetting state or triggering a game over
        }, 1400);  // Adjust based on last animation delay
    }

    jump() {
        this.speedY = 25;
    }

    // pause() {
    //     this.intervals.forEach(clearInterval);
    //     this.intervals = [];
    //     this.timeoutIds.forEach(clearTimeout);
    //     this.timeoutIds = [];
    // }

    

    // clearAllTimeouts() {
    //     this.timeoutIds.forEach(clearTimeout);
    //     this.timeoutIds = [];
    // }

    // pauseTimeOut() {
    //     // Alle Timeouts stoppen
    //     this.timeoutIds.forEach(clearTimeout);
    //     this.timeoutIds = []; // Array zurücksetzen
    // }

    
}