import 'phaser';
import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';
import PlayerGameObject from './PlayerGameObject';

const WALKDELAY = 100;

export default class EnemyGameObject extends Phaser.GameObjects.Container
{
    private enemy: Phaser.GameObjects.Sprite;
    private player: PlayerGameObject;
    private lastWalk = 0;

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
    }

    preUpdate() {
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
        } else this.enemy.play(AnimationKeys.EnemyIdle, true);
        this.lastWalk++;
    }
}