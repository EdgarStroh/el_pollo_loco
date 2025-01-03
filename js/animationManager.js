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
        // this.timeouts.forEach(clearTimeout); // Stoppe auch alle setTimeouts
    
        this.intervals = [];
        // this.timeouts = [];
    },

    resumeAll() {
        this.animations.forEach(animation => animation.resume());
    }
};