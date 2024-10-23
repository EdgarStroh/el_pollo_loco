class Level {
    enemies;
    coins;
    clouds;
    backgroundObjects;
    level_end_x = 3200;

    constructor(enemies, coins, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;  // Richtig: jetzt ist es "coins"
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}