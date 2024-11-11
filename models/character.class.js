class Character extends MovableObject {
    height = 300;
    y = 130;
    offsetY = 0;
    speed = 10;
    isJumping = false;
    noLife = false;


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

    IMAGE_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    // Neue Dead-Animationen
    IMAGE_DEAD_1 = ['img/2_character_pepe/5_dead/D-51.png'];
    IMAGE_DEAD_2 = ['img/2_character_pepe/5_dead/D-52.png'];
    IMAGE_DEAD_3 = ['img/2_character_pepe/5_dead/D-53.png'];
    IMAGE_DEAD_4 = ['img/2_character_pepe/5_dead/D-54.png'];
    IMAGE_DEAD_5 = ['img/2_character_pepe/5_dead/D-55.png'];
    IMAGE_DEAD_6 = ['img/2_character_pepe/5_dead/D-56.png'];
    IMAGE_DEAD_7 = ['img/2_character_pepe/5_dead/D-57.png'];

    IMAGE_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    currentAnimationState = null;
    world;
    walking_sound = new Audio('audio/walk.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
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
        // Einzelne Arrays für jedes Bild in IMAGE_DEAD
        this.loadImages(this.IMAGE_DEAD_1);
        this.loadImages(this.IMAGE_DEAD_2);
        this.loadImages(this.IMAGE_DEAD_3);
        this.loadImages(this.IMAGE_DEAD_4);
        this.loadImages(this.IMAGE_DEAD_5);
        this.loadImages(this.IMAGE_DEAD_6);
        this.loadImages(this.IMAGE_DEAD_7);

        this.loadImages(this.IMAGE_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            this.walking_sound.volume = 0.05;

            // Move right
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.noLife === false) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            // Move left
            if (this.world.keyboard.LEFT && this.x > 0 && this.noLife === false) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            // Jump
            if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround() && !this.isJumping && this.noLife === false) {
                this.jump(); // Sprung nur auslösen, wenn der Charakter am Boden ist

            }

            if (this.noLife === true) {
                // this.playDeadAnimation();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        this.idleDuration = 0; // Zeit in Millisekunden
        this.idleSwitchThreshold = 3000; // Wechsel zu IMAGE_IDLE_LONG nach 3000ms (3 Sekunden)

        // In der setInterval Funktion
        setInterval(() => {
            let newAnimationState; // Neuer Animatio nszustand

            // Logik für verschiedene Animationszustände
            if (this.isDead()) {
                newAnimationState = this.playDeadAnimation();
                this.idleDuration = 0; // Zeit zurücksetzen
                return;
            } else if (this.isHurt()) {
                newAnimationState = this.IMAGE_HURT;
                this.idleDuration = 0; // Zeit zurücksetzen
                if(this.isHurt() && this.isJumping ===true){
               
                    
                }
            } else if (this.isAboveGround()) {
                newAnimationState = this.playJumpAnimation();
                this.idleDuration = 0; // Zeit zurücksetzen
                return;
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                newAnimationState = this.IMAGE_WALKING;
                this.idleDuration = 0; // Zeit zurücksetzen
            } else if (this.world.keyboard.Q || this.world.keyboard.B) {
                // Wenn Q oder B gedrückt wird, spiele die normale Idle-Animation
                newAnimationState = this.IMAGE_IDLE;
                this.idleDuration = 0; // Zeit zurücksetzen
            } else {
                // Wenn der Charakter nicht bewegt wird
                if (this.idleDuration >= this.idleSwitchThreshold) {
                    newAnimationState = this.IMAGE_IDLE_LONG; // Wechsel zu langer Idle-Animation
                } else {
                    newAnimationState = this.IMAGE_IDLE; // Normale Idle-Animation
                    this.idleDuration += 155; // Zeit erhöhen (Intervallzeit)
                }
            }

            // Überprüfe, ob der Animationszustand gewechselt hat
            if (newAnimationState !== this.currentAnimationState) {
                this.resetAnimation(); // Nur zurücksetzen, wenn der Zustand wechselt
                this.currentAnimationState = newAnimationState; // Aktuellen Zustand speichern
            }

            this.playAnimation(newAnimationState); // Animation abspielen
        }, 155);
    }

    playJumpAnimation() {
        if (this.isJumping) return; // Verhindert die erneute Ausführung, wenn der Sprung läuft
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
    
        // Loop through jump sequence and apply the delay for each frame
        jumpSequence.forEach((frame) => {
            setTimeout(() => {
                if (!this.getDamage) {
                    this.playAnimation(frame.animation);
                } else {
                    // Wenn Schaden auftritt, stoppe sofort die Animation und gehe zum 'Hurt'-Zustand
                  // Setze den Sprungstatus sofort zurück
                  
                }
            }, frame.delay);
        });
        // Reset jumping state after the animation
        setTimeout(() => {
            this.isJumping = false;
            // this.resetAnimation();
        }, 800); 
    }
    

    playDeadAnimation() {
        if (this.noLife) return; // Prevent re-execution
        this.noLife = true;
        
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
}