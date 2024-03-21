import 'phaser';
import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';

export default class EnemyGameObject extends Phaser.GameObjects.Container
{
    private enemy: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.enemy = scene.add.sprite(0, 0, TextureKeys.EnemyWalk1)
            .setOrigin(0.5, 0.5)
            .play(AnimationKeys.EnemyIdle);
        
        this.add(this.enemy);
        scene.physics.add.existing(this);

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setOffset(-this.enemy.width / 2 ,  -this.enemy.height / 2);
        body.setSize(this.enemy.width,  this.enemy.height);
    }
}