window.AnimationManager = {
    animations: [],
    
    register(animation) {
        this.animations.push(animation);
    },
    pauseAll() {
        this.animations.forEach(animation => animation.pause());
    },
    resumeAll() {
        this.animations.forEach(animation => animation.resume());
    }

    
};
