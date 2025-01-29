class Character extends MovableObject {
    height = 300;
    y = 130;
    speed = 10;
    isJumping = false;
    noLife = false;
    gameOverSoundPlayed = false;
    pepeReallyDead = false;
    offsetX = 10;
    offsetY = 125;
    offsetWidth = 35;
    offsetHeight = 140;
    idleDuration = 0;
    idleSwitchThreshold = 15000;
    currentAnimationState = null;
    world;
    pepeSnoring_sound = AudioManager.pepeSnoring_sound;
    walking_sound = AudioManager.walking_sound;
    jump_sound = AudioManager.jump_sound;
    pepeDead_sound = AudioManager.pepeDead_sound;
    gameOver_sound = AudioManager.gameOver_sound;
    inGameMusic_sound = AudioManager.inGameMusic_sound;
    IMAGE_HURT = [
        '/img/2_character_pepe/4_hurt/H-41.png',
        '/img/2_character_pepe/4_hurt/H-42.png',
        '/img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGE_IDLE = [
        '/img/2_character_pepe/1_idle/idle/I-1.png',
        '/img/2_character_pepe/1_idle/idle/I-2.png',
        '/img/2_character_pepe/1_idle/idle/I-3.png',
        '/img/2_character_pepe/1_idle/idle/I-4.png',
        '/img/2_character_pepe/1_idle/idle/I-5.png',
        '/img/2_character_pepe/1_idle/idle/I-6.png',
        '/img/2_character_pepe/1_idle/idle/I-7.png',
        '/img/2_character_pepe/1_idle/idle/I-8.png',
        '/img/2_character_pepe/1_idle/idle/I-9.png',
        '/img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGE_IDLE_LONG = [
        '/img/2_character_pepe/1_idle/long_idle/I-11.png',
        '/img/2_character_pepe/1_idle/long_idle/I-12.png',
        '/img/2_character_pepe/1_idle/long_idle/I-13.png',
        '/img/2_character_pepe/1_idle/long_idle/I-14.png',
        '/img/2_character_pepe/1_idle/long_idle/I-15.png',
        '/img/2_character_pepe/1_idle/long_idle/I-16.png',
        '/img/2_character_pepe/1_idle/long_idle/I-17.png',
        '/img/2_character_pepe/1_idle/long_idle/I-18.png',
        '/img/2_character_pepe/1_idle/long_idle/I-19.png',
        '/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    IMAGE_WALKING = [
        '/img/2_character_pepe/2_walk/W-21.png',
        '/img/2_character_pepe/2_walk/W-22.png',
        '/img/2_character_pepe/2_walk/W-23.png',
        '/img/2_character_pepe/2_walk/W-24.png',
        '/img/2_character_pepe/2_walk/W-25.png',
        '/img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGE_JUMP_START_1 = ['/img/2_character_pepe/3_jump/J-31.png'];
    IMAGE_JUMP_START_2 = ['/img/2_character_pepe/3_jump/J-32.png'];
    IMAGE_JUMP_START_3 = ['/img/2_character_pepe/3_jump/J-33.png'];
    IMAGE_JUMP_UP = ['/img/2_character_pepe/3_jump/J-34.png'];
    IMAGE_JUMP_DOWN_1 = ['/img/2_character_pepe/3_jump/J-35.png'];
    IMAGE_JUMP_DOWN_2 = ['/img/2_character_pepe/3_jump/J-36.png'];
    IMAGE_LANDING_1 = ['/img/2_character_pepe/3_jump/J-37.png'];
    IMAGE_LANDING_2 = ['/img/2_character_pepe/3_jump/J-38.png'];
    IMAGE_LANDING_3 = ['/img/2_character_pepe/3_jump/J-39.png'];

    IMAGE_DEAD_1 = ['/img/2_character_pepe/5_dead/D-51.png'];
    IMAGE_DEAD_2 = ['/img/2_character_pepe/5_dead/D-52.png'];
    IMAGE_DEAD_3 = ['/img/2_character_pepe/5_dead/D-53.png'];
    IMAGE_DEAD_4 = ['/img/2_character_pepe/5_dead/D-54.png'];
    IMAGE_DEAD_5 = ['/img/2_character_pepe/5_dead/D-55.png'];
    IMAGE_DEAD_6 = ['/img/2_character_pepe/5_dead/D-56.png'];
    IMAGE_DEAD_7 = ['/img/2_character_pepe/5_dead/D-57.png'];

    /**
 * Loads all the images used for different character states.
 * This method periodically loads all image arrays that represent various character actions like idle, walking, jumping, landing, dead, etc.
 * It uses a `setInterval` to load the images every 100 milliseconds.
 */
    loadAllImages() {
        setInterval(() => {
            this.loadImages(this.IMAGE_IDLE);
            this.loadImages(this.IMAGE_IDLE_LONG);
            this.loadImages(this.IMAGE_WALKING);
            this.loadImages(this.IMAGE_JUMP_START_1);
            this.loadImages(this.IMAGE_JUMP_START_2);
            this.loadImages(this.IMAGE_JUMP_START_3);
            this.loadImages(this.IMAGE_JUMP_UP);
            this.loadImages(this.IMAGE_JUMP_DOWN_1);
            this.loadImages(this.IMAGE_JUMP_DOWN_2);
            this.loadImages(this.IMAGE_LANDING_1);
            this.loadImages(this.IMAGE_LANDING_2);
            this.loadImages(this.IMAGE_LANDING_3);
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

    /**
     * Initializes a new character.
     * This constructor sets up the character's initial state, applies gravity, animates the character, and registers it with the animation manager.
     * 
     * @param {Object} world - The world object that contains the environment and level data.
     */
    constructor(world) {
        super().loadImage('/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadAllImages();
        this.applyGravity();
        this.animate();
        this.world = world;
        AnimationManager.register(this);
        this.noLife = false;
        this.gameOverSoundPlayed = false;
        this.pepeReallyDead = false;
        this.isJumping = false;
    }

    /**
     * Moves the character to the right if the RIGHT key is pressed and the character is not at the end of the level.
     * Plays the walking sound if the character is on the ground and not jumping.
     */
    moveRightLogic() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.noLife) {
            this.moveRight();
            this.otherDirection = false;

            if (!this.isAboveGround() && !this.isJumping) {
                this.walking_sound.play();
            }
        }
    }

    /**
     * Moves the character to the left if the LEFT key is pressed and the character is not at the start of the level.
     * Plays or pauses the walking sound based on the character's position.
     */
    moveLeftLogic() {
        if (this.world.keyboard.LEFT && this.x > 0 && !this.noLife) {
            this.moveLeft();
            this.otherDirection = true;

            if (!this.isAboveGround() && !this.isJumping) {
                this.walking_sound.play();
            } else {
                this.walking_sound.pause();
            }
        }
    }

    /**
     * Makes the character jump if the SPACE or UP key is pressed and the character is on the ground.
     * Plays the jump animation and jump sound.
     */
    jumpLogic() {
        if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround() && !this.isHurt() && !this.isJumping && !this.noLife) {
            this.jump();
            this.playJumpAnimation();
            this.jump_sound.play();
        }
    }

    /**
     * Handles the hurt state of the character.
     * If the character is hurt, it updates the animation to the hurt state and pauses the snoring sound.
     * Resets the jump state and returns true if the character is hurt, otherwise returns false.
     * 
     * @returns {boolean} - Returns true if the character is hurt, otherwise false.
     */
    handleHurtState() {
        if (this.isHurt()) {
            if (this.currentAnimationState !== this.IMAGE_HURT) {
                this.setNewAnimationState(this.IMAGE_HURT);
            }
            this.playAnimation(this.IMAGE_HURT);
            this.idleDuration = 0;
            this.pepeSnoring_sound.pause();
            this.isJumping = false;
            return true;
        }
        return false;
    }

    /**
     * Sets a new animation state for the character and plays the corresponding animation.
     * If the new state is different from the current state, it resets the current animation before updating to the new one.
     * 
     * @param {Array} newState - The new animation state to set.
     */
    setNewAnimationState(newState) {
        if (newState !== this.currentAnimationState) {
            this.resetAnimation();
            this.currentAnimationState = newState;
            this.playAnimation(newState);
        }
    }

    /**
 * Handles the dead state by displaying the game over screen, playing the dead animation,
 * and resetting the idle duration.
 * 
 * @returns {boolean} Returns `true` if the character is dead, otherwise `false`.
 */
    handleDeadState() {
        if (this.isDead()) {
            this.showGameOverScreen();
            this.playDeadAnimation();
            this.idleDuration = 0;
            return true;
        }
        return false;
    }

    /**
     * Starts the animation process, handling movement and animation states such as idle, walking, 
     * jumping, or hurt.
     */
    animate() {
        const moveInterval = setInterval(() => this.handleMovement(), 1000 / 60);
        AnimationManager.addInterval(moveInterval);

        const animationInterval = setInterval(() => {
            let newAnimationState;
            if (this.handleDeadState()) { return; }
            if (this.handleHurtState()) { return; }
            if (this.handleJumpState()) { return; }
            newAnimationState = this.determineIdleOrWalkingState();
            this.playAnimation(newAnimationState);
        }, 155);
        AnimationManager.addInterval(animationInterval);
    }

    /**
     * Handles the movement logic, including walking, jumping, and adjusting the camera.
     */
    handleMovement() {
        this.walking_sound.pause();
        this.moveRightLogic();
        this.moveLeftLogic();
        this.jumpLogic();
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Determines if the character is in a jumping state.
     * 
     * @returns {boolean} Returns `true` if the character is jumping, otherwise `false`.
     */
    handleJumpState() {
        if (this.isJumping) {
            this.idleDuration = 0;
            return true;
        }
        return false;
    }

    /**
     * Determines the current animation state, either idle or walking, based on various conditions.
     * 
     * @returns {string} The animation state for idle or walking.
     */
    determineIdleOrWalkingState() {
        if (this.handleWalkingState()) { return this.IMAGE_WALKING; }
        if (this.handleKeyPressState()) { return this.IMAGE_IDLE; }
        if (this.handleIdleLongState()) { return this.IMAGE_IDLE_LONG; }
        return this.handleIdleState();
    }

    /**
     * Checks if the character is walking based on keyboard input.
     * 
     * @returns {boolean} Returns `true` if the character is walking, otherwise `false`.
     */
    handleWalkingState() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.idleDuration = 0;
            return true;
        }
        return false;
    }

    /**
     * Checks if the character is pressing a key (Q or B) to trigger idle state.
     * 
     * @returns {boolean} Returns `true` if a key is pressed, otherwise `false`.
     */
    handleKeyPressState() {
        if (this.world.keyboard.Q || this.world.keyboard.B) {
            this.idleDuration = 0;
            return true;
        }
        return false;
    }

    /**
     * Handles the scenario where the character is idle for a prolonged period and plays a sound.
     * 
     * @returns {boolean} Returns `true` if the idle duration exceeds the threshold, otherwise `false`.
     */
    handleIdleLongState() {
        if (this.idleDuration >= this.idleSwitchThreshold) {
            this.pepeSnoring_sound.play();
            return true;
        }
        return false;
    }

    /**
     * Increments the idle duration and pauses the snoring sound.
     * 
     * @returns {string} Returns the idle animation state.
     */
    handleIdleState() {
        this.idleDuration += 155;
        this.pepeSnoring_sound.pause();
        return this.IMAGE_IDLE;
    }

    /**
     * Plays the jump animation sequence.
     */
    playJumpAnimation() {
        if (this.isJumping) return;
        this.isJumping = true;
        const jumpSequence = this.createJumpSequence();
        this.playJumpSequence(jumpSequence);
        this.resetJumpStatusAfterDelay(800);
    }

    /**
     * Creates the jump animation sequence.
     * 
     * @returns {Array} An array of frames for the jump sequence, with animations and delays.
     */
    createJumpSequence() {
        return [
            { animation: this.IMAGE_JUMP_START_1, delay: 0 },
            { animation: this.IMAGE_JUMP_START_2, delay: 3 },
            { animation: this.IMAGE_JUMP_START_3, delay: 8 },
            { animation: this.IMAGE_JUMP_UP, delay: 10 },
            { animation: this.IMAGE_JUMP_DOWN_1, delay: 240 },
            { animation: this.IMAGE_JUMP_DOWN_2, delay: 420 },
            { animation: this.IMAGE_LANDING_1, delay: 700 },
            { animation: this.IMAGE_LANDING_2, delay: 740 },
            { animation: this.IMAGE_LANDING_3, delay: 750 }
        ];
    }

    /**
     * Plays the jump sequence based on the provided frame data.
     * 
     * @param {Array} jumpSequence The jump sequence with animation frames and delays.
     */
    playJumpSequence(jumpSequence) {
        jumpSequence.forEach((frame) => {
            const jumpSequenceTimeout = setTimeout(() => {
                if (!this.world.gamePaused && this.isJumping) {
                    this.playAnimation(frame.animation);
                }
            }, frame.delay);
            AnimationManager.addTimeout(jumpSequenceTimeout);
        });
    }

    /**
     * Resets the jump status after a delay.
     * 
     * @param {number} delay The delay in milliseconds before resetting the jump status.
     */
    resetJumpStatusAfterDelay(delay) {
        setTimeout(() => {
            this.isJumping = false;
        }, delay);
    }

    /**
     * Resumes the animation after it is paused.
     */
    resume() {
        this.animate();
    }

    /**
     * Plays the game over sound if it has not been played before.
     */
    playGameOverSound() {
        if (!this.gameOverSoundPlayed) {
            this.gameOver_sound.play();
            this.gameOverSoundPlayed = true;
        }
    }

    /**
     * Displays the game over image by removing the 'hidden' class from it.
     */
    displayGameOverImage() {
        const gameOverImage = document.getElementById('gameover');
        gameOverImage.classList.remove('hidden');
    }

    /**
     * Finalizes the game over sequence by clearing intervals and displaying the main menu button.
     * 
     * @param {number} delay The delay in milliseconds before finalizing the game over sequence.
     */
    finalizeGameOver(delay) {
        const gameOverTimeout = setTimeout(() => {
            this.clearAllIntervals();
            this.world.gameOver = true;
            const mainMenuBtn = document.getElementById('mainMenuBtn');
            mainMenuBtn.classList.remove('hidden');
        }, delay);
        AnimationManager.addTimeout(gameOverTimeout);
    }

    /**
     * Shows the game over screen by playing the game over sound and displaying the game over image.
     */
    showGameOverScreen() {
        this.playGameOverSound();
        this.displayGameOverImage();
        this.finalizeGameOver(2000);
    }

    /**
     * Clears all intervals from the window.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
     * Plays the dead sound.
     */
    playDeadSound() {
        this.pepeDead_sound.play();
    }

    /**
     * Sets the dead state of the character and returns whether the character is dead.
     * 
     * @returns {boolean} Returns `true` if the character is dead, otherwise `false`.
     */
    setDeadState() {
        if (this.noLife) return true;
        this.noLife = true;
        return false;
    }

    /**
     * Runs the dead animation sequence by playing the corresponding frames.
     * 
     * @param {Array} sequence The sequence of dead animation frames and delays.
     */
    runDeadSequence(sequence) {
        sequence.forEach((frame) => {
            const deadAnimationTimeout = setTimeout(() => {
                this.playAnimation(frame.animation);
            }, frame.delay);
            AnimationManager.addTimeout(deadAnimationTimeout);
        });
    }

    /**
     * Returns the images for the dead state, including animation frames and delays.
     * 
     * @returns {Array} An array of dead state images with animation frames and delays.
     */
    isDeadImages() {
        return [
            { animation: this.IMAGE_DEAD_1, delay: 0 },
            { animation: this.IMAGE_DEAD_2, delay: 3 },
            { animation: this.IMAGE_DEAD_3, delay: 8 },
            { animation: this.IMAGE_DEAD_4, delay: 10 },
            { animation: this.IMAGE_DEAD_5, delay: 240 },
            { animation: this.IMAGE_DEAD_6, delay: 420 },
            { animation: this.IMAGE_DEAD_7, delay: 640 }
        ];
    }
    /**
  * Plays the animation for when the character is dead.
  * It checks the dead state, plays the corresponding dead sound, 
  * and runs the dead animation sequence if the character is not already dead.
  * 
  * @function
  * @returns {void}
  */
    playDeadAnimation() {
        if (this.setDeadState()) return;
        this.playDeadSound();

        const deadSequence = this.isDeadImages();
        this.runDeadSequence(deadSequence);
    }

    /**
     * Initiates the character's jump by applying an upward speed.
     * The jump speed is set to a value of 25.
     * 
     * @function
     * @returns {void}
     */
    jump() {
        this.speedY = 25;
    }
}