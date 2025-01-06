window.AnimationManager = {
    animations: [], // Speichert animierte Objekte
    intervals: [],  // Speichert alle setInterval-Timer
    timeouts: [],   // Speichert alle setTimeout-Timer

    register(animation) {
        this.animations.push(animation);
    },

    addInterval(interval) {
        this.intervals.push(interval);
    },

    addTimeout(timeout) {
        this.timeouts.push(timeout);
    },

    pauseAll() {
        // Stoppe alle Timer
        this.intervals.forEach(clearInterval);
        this.intervals = [];
        this.timeouts.forEach(clearTimeout);
        this.timeouts = [];

        // Pausiere alle animierten Objekte
        this.animations.forEach(animation => {
            if (animation.pause) animation.pause();
        });
    },

    resumeAll() {
        // Setze alle animierten Objekte fort
        this.animations.forEach(animation => {
            if (animation.resume) animation.resume();
        });
    }
};
