import 'phaser';
import EnemyGameObject from './EnemyGameObject';
import PlayerGameObject from './PlayerGameObject';

const SPAWNDELAY = 500;

export default class EnemySpawner extends Phaser.GameObjects.Container
{
    private player: PlayerGameObject;
    private enemyGameObjects: Phaser.Physics.Arcade.Group;
    private lastSpawn: number = 0;
    private spawnPointX = 0;
    private spawnPointY = 0;


    constructor(scene: Phaser.Scene, x: number, y: number, player: PlayerGameObject) {
        super(scene, x, y);

        this.spawnPointX = x;
        this.spawnPointY = y;

        this.player = player;

        this.enemyGameObjects = scene.physics.add.group();
    }

    preUpdate() {
        if(this.enemyGameObjects.getChildren().length == 0 && new Date().getTime() - this.lastSpawn > SPAWNDELAY)
        {
            this.enemyGameObjects = this.scene.physics.add.group();
            const enemy1 = new EnemyGameObject(this.scene, this.spawnPointX, this.spawnPointY, this.player);
            this.scene.add.existing(enemy1);
            this.enemyGameObjects.add(enemy1);
            this.lastSpawn = new Date().getTime();
        }
    }
}