window.AnimationManager = {
    animations: [], // Speichert animierte Objekte
    intervals: [],  // Speichert alle setInterval-Timer

    register(animation) {
        this.animations.push(animation);
    },

    addInterval(interval) {
        this.intervals.push(interval);
    },

    pauseAll() {
        // Stoppe alle Timer
        this.intervals.forEach(clearInterval);
        this.intervals = [];
    },

    resumeAll() {
        this.animations.forEach(animation => animation.resume());
    }
};
