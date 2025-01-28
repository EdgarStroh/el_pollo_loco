/**
 * @namespace
 * @description A manager for handling animations, intervals, and timeouts.
 */
window.AnimationManager = {
    /**
     * List of registered animations.
     * @type {Array}
     */
    animations: [], 

    /**
     * List of active intervals.
     * @type {Array}
     */
    intervals: [],  

    /**
     * List of active timeouts.
     * @type {Array}
     */
    timeouts: [],   

    /**
     * Registers an animation to be managed by the AnimationManager.
     * @param {Object} animation - The animation object to register.
     * @param {function} animation.pause - Function to pause the animation.
     * @param {function} animation.resume - Function to resume the animation.
     * @returns {void}
     */
    register(animation) {
        this.animations.push(animation);
    },

    /**
     * Adds an interval to be managed by the AnimationManager.
     * @param {number} interval - The interval ID to add.
     * @returns {void}
     */
    addInterval(interval) {
        this.intervals.push(interval);
    },

    /**
     * Adds a timeout to be managed by the AnimationManager.
     * @param {number} timeout - The timeout ID to add.
     * @returns {void}
     */
    addTimeout(timeout) {
        this.timeouts.push(timeout);
    },

    /**
     * Pauses all animations, intervals, and timeouts.
     * @returns {void}
     */
    pauseAll() {
        this.intervals.forEach(clearInterval);
        this.intervals = [];
        this.timeouts.forEach(clearTimeout);
        this.timeouts = [];

        this.animations.forEach(animation => {
            if (animation.pause) animation.pause();
        });
    },

    /**
     * Resumes all animations that support the resume method.
     * @returns {void}
     */
    resumeAll() {
        this.animations.forEach(animation => {
            if (animation.resume) animation.resume();
        });
    },

    /**
     * Resets the AnimationManager by clearing all animations, intervals, and timeouts.
     * @returns {void}
     */
    reset() {
        this.animations = [];
        this.intervals.forEach(clearInterval);
        this.intervals = [];
        this.timeouts.forEach(clearTimeout);
        this.timeouts = [];
    }
};
