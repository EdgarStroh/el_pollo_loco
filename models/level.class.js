/**
 * Represents a level in the game, containing all the objects and elements that exist within the level.
 * This includes enemies, coins, bottles, clouds, and background objects.
 */
class Level {
    enemies;
    coins;
    bottles;
    clouds;
    backgroundObjects;
    level_end_x = 4800;

    /**
     * Creates an instance of the Level class.
     * 
     * @param {Array<Enemy>} enemies - The list of enemies in the level.
     * @param {Array<Coin>} coins - The list of coins in the level.
     * @param {Array<Bottle>} bottles - The list of bottles in the level.
     * @param {Array<Cloud>} clouds - The list of clouds in the level.
     * @param {Array<BackgroundObject>} backgroundObjects - The list of background objects in the level.
     */
    constructor(enemies, coins, bottles, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;  
        this.bottles = bottles; 
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
