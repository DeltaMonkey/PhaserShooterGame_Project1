import 'phaser';
import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';
import PlayerGameObject from './PlayerGameObject';

const WALKDELAY = 100;
const FIRERATE = 2000; // Time between shots in milliseconds

export default class EnemyGameObject extends Phaser.GameObjects.Container
{
    private enemy: Phaser.GameObjects.Sprite;
    private player: PlayerGameObject;
    private enemyBullets: Phaser.Physics.Arcade.Group;
    private lastWalk: number = 0;
    private lastFired: number = new Date().getTime() + FIRERATE;

    constructor(scene: Phaser.Scene, x: number, y: number, player: PlayerGameObject) {
        super(scene, x, y);

        this.player = player;

        this.enemy = scene.add.sprite(0, 0, TextureKeys.EnemyWalk1)
            .setOrigin(0.5, 0.5)
            .play(AnimationKeys.EnemyIdle);
        
        this.add(this.enemy);
        scene.physics.add.existing(this);

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setOffset(-this.enemy.width / 2 ,  -this.enemy.height / 2);
        body.setSize(this.enemy.width,  this.enemy.height);

        this.enemyBullets = this.scene.physics.add.group();

        this.scene.physics.add.collider(this.player.getBullets(), this, this.hitByPlayer, undefined, this);
        this.scene.physics.add.collider(this.enemyBullets, this.player, this.hitThePlayer, undefined, this);
    }

    preUpdate() {
        this.cleanBullets();

        if(this.lastWalk > WALKDELAY) {
            this.enemy.play(AnimationKeys.EnemyWalk, true);
            this.scene.physics.moveToObject(this, { x: this.player.x, y: this.player.y }, 10);

            var distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

            if(distanceToPlayer <= 15 || this.lastWalk == WALKDELAY + WALKDELAY)
            {
                this.lastWalk = 0;
                const body = this.body as Phaser.Physics.Arcade.Body;
                body.setVelocity(0, 0)
            }
        } else { 
            this.enemy.play(AnimationKeys.EnemyIdle, true);

            // Fire bullet towards player position when stop
            if (new Date().getTime() - this.lastFired > FIRERATE) {
                this.fireBullet(this.player.x, this.player.y);
                this.lastFired = new Date().getTime();
            }
        }
        this.lastWalk++;
    }

    private fireBullet(x: number, y: number) {
        const bullet = this.enemyBullets.create(
            (this.body?.position.x as number) + this.enemy.width / 2, 
            (this.body?.position.y as number) + this.enemy.width / 2, 
            TextureKeys.EnemyBullet); // Create a bullet at (0,0)
        bullet.setOrigin(0.5, 0.5); // Set the origin to the center of the bullet
        this.scene.physics.moveToObject(bullet, { x: x, y: y }, 100); // Move bullet towards mouse position
    }

    private cleanBullets() {
        this.enemyBullets.getChildren().forEach((bullet: Phaser.GameObjects.GameObject) => {
            if (bullet.body!.position.x > this.scene.scale.width) {
                bullet.destroy();
            }
            if (bullet.body && bullet.body!.position.x < 0) {
                bullet.destroy();
            }
            if (bullet.body && bullet.body!.position.y > this.scene.scale.height) {
                bullet.destroy();
            }
            if (bullet.body && bullet.body!.position.y < 0) {
                bullet.destroy();
            }
        });
    }

    // Define a function to handle what happens when a bullet hits an enemy
    private hitByPlayer(
        playerBullet: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
        enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
    ): void {
        playerBullet.destroy(); // Destroy the bullet
        enemy.destroy(); // Destroy the enemy (you might want to add some other behavior here)
    }

    private hitThePlayer(
        enemyBullet: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
        player: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
    ): void {
        enemyBullet.destroy(); // Destroy the bullet
        player.destroy(); // Destroy the enemy (you might want to add some other behavior here)
    }
}